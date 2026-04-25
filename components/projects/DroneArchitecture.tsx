"use client";

import { useEffect, useReducer, useRef, useState } from "react";

// ─── Layout constants ──────────────────────────────────────────────────────────
const W = 800;
const H = 480;

type NodeId =
  | "camera"
  | "moondream"
  | "clip"
  | "chromadb"
  | "rules"
  | "groq"
  | "langchain"
  | "streamlit";

type NodeDef = {
  id: NodeId;
  label: string;
  sublabel?: string;
  cx: number;
  cy: number;
  w: number;
  h: number;
  green?: boolean;
  tooltip: string;
};

const NODES: NodeDef[] = [
  {
    id: "camera",
    label: "Drone Camera",
    cx: 80,
    cy: 90,
    w: 128,
    h: 48,
    tooltip: "Captures live surveillance footage",
  },
  {
    id: "moondream",
    label: "Moondream2 VLM",
    cx: 265,
    cy: 90,
    w: 160,
    h: 48,
    tooltip: "Vision-language perception of scene contents",
  },
  {
    id: "clip",
    label: "CLIP Embedder",
    cx: 455,
    cy: 90,
    w: 145,
    h: 48,
    tooltip: "Generates entity embeddings for vector memory",
  },
  {
    id: "chromadb",
    label: "ChromaDB",
    cx: 635,
    cy: 90,
    w: 120,
    h: 48,
    tooltip: "Vector store for recurring entity recall",
  },
  {
    id: "rules",
    label: "Rules Engine",
    sublabel: "DETERMINISTIC · NOT LLM-DECIDED",
    cx: 635,
    cy: 245,
    w: 175,
    h: 62,
    green: true,
    tooltip: "Loitering · after-hours · repeat visitor detection — fires alerts",
  },
  {
    id: "groq",
    label: "Groq Llama 3.3 70B",
    cx: 510,
    cy: 395,
    w: 178,
    h: 48,
    tooltip: "70B reasoning model · 5/5 on benchmarks",
  },
  {
    id: "langchain",
    label: "LangChain Agent",
    cx: 290,
    cy: 395,
    w: 165,
    h: 48,
    tooltip: "Tool-routing agent for natural-language queries",
  },
  {
    id: "streamlit",
    label: "Streamlit UI",
    cx: 82,
    cy: 395,
    w: 128,
    h: 48,
    tooltip: "Operator-facing interface",
  },
];

type EdgeDef = {
  id: string;
  d: string;
  dur: number;
  bidirectional?: boolean;
  green?: boolean;
};

// Path helpers: straight line between two points
function line(x1: number, y1: number, x2: number, y2: number) {
  return `M${x1},${y1} L${x2},${y2}`;
}
function curve(
  x1: number,
  y1: number,
  cx1: number,
  cy1: number,
  cx2: number,
  cy2: number,
  x2: number,
  y2: number
) {
  return `M${x1},${y1} C${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`;
}

const EDGES: EdgeDef[] = [
  { id: "e1", d: line(144, 90, 185, 90), dur: 1.4 },
  { id: "e2", d: line(345, 90, 382, 90), dur: 1.6 },
  { id: "e3", d: line(528, 90, 575, 90), dur: 1.3 },
  { id: "e4", d: line(635, 114, 635, 214), dur: 1.5 },
  { id: "e5", d: curve(635, 276, 635, 340, 510, 345, 510, 371), dur: 1.8, green: true },
  { id: "e6", d: line(510, 395, 373, 395), dur: 1.6, bidirectional: true },
  { id: "e6b", d: line(373, 395, 510, 395), dur: 1.6 },
  { id: "e7", d: line(207, 395, 146, 395), dur: 1.3 },
  {
    id: "e8",
    d: curve(547, 276, 450, 360, 200, 340, 82, 371),
    dur: 2.2,
    green: true,
  },
];

function NodeRect({
  node,
  active,
  hovered,
  onHover,
}: {
  node: NodeDef;
  active: boolean;
  hovered: boolean;
  onHover: (id: NodeId | null) => void;
}) {
  const color = node.green ? "#22c55e" : "#00d4ff";
  const scale = hovered || active ? 1.04 : 1;

  return (
    <g
      transform={`translate(${node.cx},${node.cy}) scale(${scale})`}
      style={{ transformOrigin: `${node.cx}px ${node.cy}px`, transition: "transform 0.2s" }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      className="cursor-default"
    >
      <rect
        x={-node.w / 2}
        y={-node.h / 2}
        width={node.w}
        height={node.h}
        rx={8}
        fill="#111114"
        stroke={color}
        strokeWidth={hovered || active ? 1.5 : 0.8}
        style={{
          filter:
            hovered || active
              ? `drop-shadow(0 0 ${node.green ? "8px #22c55e" : "8px #00d4ff"})`
              : "none",
          transition: "all 0.2s",
        }}
      />
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        y={node.sublabel ? -8 : 0}
        fontFamily="ui-monospace, monospace"
        fontSize={11}
        fill="#e4e4e7"
      >
        {node.label}
      </text>
      {node.sublabel && (
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          y={10}
          fontFamily="ui-monospace, monospace"
          fontSize={8}
          fill={color}
          letterSpacing="0.5"
        >
          {node.sublabel}
        </text>
      )}
    </g>
  );
}

function FlowDot({
  edgeId,
  dur,
  delay,
  green,
}: {
  edgeId: string;
  dur: number;
  delay: number;
  green?: boolean;
}) {
  return (
    <circle r={3} fill={green ? "#22c55e" : "#00d4ff"} opacity={0}>
      <animateMotion
        dur={`${dur}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      >
        <mpath href={`#${edgeId}`} />
      </animateMotion>
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.1;0.85;1"
        dur={`${dur}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

export default function DroneArchitecture() {
  const [hovered, setHovered] = useState<NodeId | null>(null);
  const [activeNode, setActiveNode] = useState<NodeId>(NODES[0].id);
  const [reducedMotion, setReducedMotion] = useState(false);
  const tickRef = useRef(0);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Cycle active node
  useEffect(() => {
    if (reducedMotion) return;
    const sequence: NodeId[] = [
      "camera",
      "moondream",
      "clip",
      "chromadb",
      "rules",
      "groq",
      "langchain",
      "streamlit",
    ];
    const id = setInterval(() => {
      tickRef.current = (tickRef.current + 1) % sequence.length;
      setActiveNode(sequence[tickRef.current]);
    }, 1400);
    return () => clearInterval(id);
  }, [reducedMotion]);

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border bg-background/40 p-2">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full min-w-[540px]"
        style={{ maxHeight: 400 }}
      >
        <defs>
          {EDGES.map((e) => (
            <path key={e.id} id={e.id} d={e.d} />
          ))}
          <marker
            id="arrow"
            viewBox="0 0 6 6"
            refX="5"
            refY="3"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,0 L0,6 L6,3 z" fill="#27272a" />
          </marker>
          <marker
            id="arrow-green"
            viewBox="0 0 6 6"
            refX="5"
            refY="3"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,0 L0,6 L6,3 z" fill="#22c55e66" />
          </marker>
        </defs>

        {/* Connection lines */}
        {EDGES.map((e) => (
          <use
            key={`line-${e.id}`}
            href={`#${e.id}`}
            stroke={e.green ? "#22c55e44" : "#27272a"}
            strokeWidth={e.green ? 1 : 1.5}
            strokeDasharray={e.green ? "4 3" : undefined}
            fill="none"
            markerEnd={e.green ? "url(#arrow-green)" : "url(#arrow)"}
          />
        ))}

        {/* Flowing dots */}
        {!reducedMotion &&
          EDGES.map((e) =>
            [0, e.dur * 0.45].map((delay, di) => (
              <FlowDot
                key={`${e.id}-${di}`}
                edgeId={e.id}
                dur={e.dur}
                delay={delay}
                green={e.green}
              />
            ))
          )}

        {/* Nodes */}
        {NODES.map((n) => (
          <NodeRect
            key={n.id}
            node={n}
            active={activeNode === n.id && !reducedMotion}
            hovered={hovered === n.id}
            onHover={setHovered}
          />
        ))}

        {/* Tooltip */}
        {hovered && (() => {
          const n = NODES.find((x) => x.id === hovered)!;
          const tipW = 200;
          const tx = Math.min(Math.max(n.cx - tipW / 2, 8), W - tipW - 8);
          const ty = n.cy > H / 2 ? n.cy - n.h / 2 - 44 : n.cy + n.h / 2 + 8;
          return (
            <g>
              <rect
                x={tx}
                y={ty}
                width={tipW}
                height={34}
                rx={6}
                fill="#18181b"
                stroke="#00d4ff"
                strokeWidth={0.8}
              />
              <text
                x={tx + tipW / 2}
                y={ty + 12}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontSize={9}
                fill="#a1a1aa"
              >
                {n.label}
              </text>
              <text
                x={tx + tipW / 2}
                y={ty + 24}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontSize={9.5}
                fill="#e4e4e7"
              >
                {n.tooltip.length > 36
                  ? n.tooltip.slice(0, 35) + "…"
                  : n.tooltip}
              </text>
            </g>
          );
        })()}
      </svg>

      <p className="font-mono text-[10px] text-muted-foreground text-center mt-2 px-2">
        Architecture decision: alert logic lives in deterministic rules, not the
        LLM. The agent routes queries; the rules fire alerts. Zero hallucinated
        security events.
      </p>
    </div>
  );
}
