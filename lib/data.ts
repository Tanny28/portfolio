// ─── Single source of truth for all portfolio content ──────────────────────
// From PORTFOLIO_MASTER brief · 2026-07

export const PROFILE = {
  name: "Tanmay Shinde",
  title: "AI / GenAI Engineer",
  tagline: "I build AI systems that actually ship.",
  subtext:
    "Final-year AI & ML engineer building production-grade GenAI systems — RAG pipelines, LLM agents, and ML models — with a builder's bias for shipping.",
  email: "shindetanmay282@gmail.com",
  phone: "+91-8459931044",
  location: "Pune, Maharashtra, India",
  github: "https://github.com/Tanny28",
  githubHandle: "Tanny28",
  linkedin: "https://linkedin.com/in/tanmay-shinde-840a05340",
  resume: "/Tanmay_Shinde_Resume.pdf",
  graduation: "May 2027",
} as const;

export type Project = {
  slug: string;
  title: string;
  role: string; // what kind of system it is, in recruiter terms
  category: string; // short label shown on project cards
  tagline: string;
  stack: string[];
  problem?: string;
  solution?: string;
  impact?: string;
  recognition?: string; // award / benchmark line shown on the card
  year: number;
  highlight?: boolean;
  github?: string;
  demo?: string;
  embed?: string;
};

export const projects: Project[] = [
  {
    slug: "pixa-agent",
    category: "Agents",
    title: "Pixa Agent",
    role: "Open-source AI coding agent for VS Code",
    tagline:
      "An agent that plans multi-step coding tasks, reads the codebase, and edits files — staging every change as an approvable diff.",
    stack: [
      "TypeScript",
      "VS Code Extension API",
      "Agentic tool-calling",
      "Vector search",
      "Vitest",
      "GitHub Actions",
    ],
    problem:
      "Coding agents either lock you into one vendor's API or edit your files with no review step. Both are non-starters for real work on a real repo.",
    solution:
      "An agent loop that plans, reads the codebase, and edits multiple files — but stages every change as an approvable diff before it touches disk. The core is provider-agnostic behind a single ModelProvider interface, so any OpenAI-compatible endpoint works (Ollama, vLLM, NVIDIA NIM, Groq) including fully offline. Added semantic code search with a custom chunker, embedding index, and vector store, plus a security layer with sandboxed commands, secret redaction, and audit logging.",
    impact:
      "181 automated tests across 26 suites, CI-gated on every push · ~7,800 lines of TypeScript · MIT licensed and open source.",
    recognition: "181 tests · 26 suites · MIT",
    year: 2026,
    highlight: true,
    github: "https://github.com/WisdomBoost-LLC/PixaAgent",
  },
  {
    slug: "acadflip-diggen",
    category: "LLM pipeline",
    title: "Acadflip DigGen",
    role: "Document-to-courseware pipeline",
    tagline:
      "Turns PDFs and slide decks into fact-checked study modules, decks, and grounded Q&A.",
    stack: [
      "Multi-provider LLM routing",
      "Groq",
      "OpenAI",
      "Gemini",
      "Structured output",
      "FastAPI",
    ],
    problem:
      "Generating courseware from source documents is easy; generating courseware you can trust is not. Ungrounded summaries quietly invent facts that end up in front of students.",
    solution:
      "A pipeline with adversarial per-slide validation — each generated slide is checked back against its source before it survives — and multi-provider LLM routing across Groq, OpenAI, and Gemini so the pipeline degrades gracefully instead of failing when one provider does.",
    recognition: "In development · Pixaflip",
    year: 2026,
  },
  {
    slug: "smart-lecture-analyzer",
    category: "LLM pipeline",
    title: "Smart Lecture Analyzer",
    role: "LLM study-tool pipeline",
    tagline:
      "Turns YouTube lecture URLs into structured chapters, transcripts, MCQ quizzes, and PDF study guides.",
    stack: [
      "Groq Llama-4 Scout",
      "faster-whisper",
      "OpenCV",
      "FastAPI",
      "Docker",
      "Pydantic",
    ],
    problem:
      "Hours-long lecture videos are unsearchable and unstudyable. Students need chapters, notes, and self-testing material — not raw video.",
    solution:
      "A staged pipeline: faster-whisper transcription → OpenCV scene segmentation → Groq Llama-4 Scout for chaptering, summarization, and MCQ generation — with validated JSON contracts between every stage, so a malformed LLM output can never corrupt downstream steps. Packaged with FastAPI + Docker.",
    impact:
      "Built in a 3-day challenge after cold-emailing Pixaflip — converted directly into a Software Development Internship offer.",
    recognition: "3-day build → internship offer",
    year: 2026,
    highlight: true,
    github: "https://github.com/Tanny28/smart-lecture-analyzer",
  },
  {
    slug: "tradexa",
    category: "Optimization",
    title: "TRADEXA",
    role: "Real-time supply-chain disruption simulator",
    tagline:
      "Detects supply-chain disruptions and reroutes shipments in real time over a live network graph.",
    stack: [
      "FastAPI",
      "PostgreSQL",
      "React + TypeScript",
      "deck.gl",
      "PuLP (MILP)",
      "Dijkstra",
      "Groq LLM",
    ],
    problem:
      "When a port closes or a route fails, supply chains cascade — operators need rerouting decisions in seconds, not post-mortems.",
    solution:
      "BFS cascade propagation models how disruptions spread through the network; Dijkstra + MILP optimization (PuLP) computes least-cost reroutes; deck.gl renders the live graph; a Groq LLM turns raw solver state into operator-readable situation briefs.",
    impact:
      "Top 25 of 600+ teams at the DP World × BITS Pilani National Hackathon, Hyderabad — April 2026.",
    recognition: "Top 25 / 600+ teams · national hackathon",
    year: 2026,
    highlight: true,
    // TODO [ADD]: GitHub/demo link for TRADEXA
  },
  {
    slug: "drone-security-analyst",
    category: "Vision + agents",
    title: "Drone Security Analyst Agent",
    role: "Video-intelligence agent",
    tagline:
      "Answers natural-language questions about drone security footage across frames.",
    stack: [
      "CLIP",
      "Moondream2 VLM",
      "ChromaDB",
      "LangChain",
      "NetworkX",
      "Python",
    ],
    problem:
      "Drone footage produces more frames than any operator can watch. Pure-LLM alerting either misses threats or hallucinates them.",
    solution:
      "CLIP visual embeddings in ChromaDB give the agent retrievable frame memory; Moondream2 VLM handles perception; NetworkX tracks entities across frames; a LangChain conversational agent routes operator queries. Alerts are rule-fired, never LLM-decided — zero hallucinated security events.",
    impact:
      "Scored 5/5 on the FlytBase selection-round challenge benchmark · 8/8 pytest suite passing.",
    recognition: "5/5 challenge benchmark · FlytBase",
    year: 2025,
    highlight: true,
    // TODO [ADD]: GitHub link for the drone agent
  },
  {
    slug: "review-intelligence",
    category: "NLP",
    title: "Enterprise Review Intelligence",
    role: "Multi-model NLP system",
    tagline:
      "Turns raw customer reviews into structured, queryable business insights across 4 industries.",
    stack: ["distilBERT", "spaCy", "Gemini API", "VADER", "Flask", "Streamlit"],
    problem:
      "Enterprise review data is noisy, multi-aspect, and domain-specific — single-model sentiment misses the nuance between banking, FMCG, pharma, and fragrance.",
    solution:
      "A 3-layer ensemble sentiment engine (VADER + TextBlob + distilBERT), spaCy NER + TF-IDF aspect extraction with per-industry keyword sets, and Gemini for auto-generated executive summaries — exposed as a Flask REST API with competitor comparison mode.",
    impact: "Live on Streamlit Cloud across 4 industry verticals.",
    recognition: "Live demo · 4 industries",
    year: 2025,
    demo: "https://review-intelligence.streamlit.app/",
    embed: "https://review-intelligence.streamlit.app/?embed=true",
  },
  {
    slug: "alzheimers-mri",
    category: "Research",
    title: "Alzheimer's Detection from Brain MRI",
    role: "Deep-learning research · IEEE EMBS",
    tagline:
      "CNN-ensemble detection pipeline with Grad-CAM explainability and leakage-free evaluation.",
    stack: [
      "PyTorch",
      "EfficientNet",
      "ResNet",
      "DenseNet",
      "Grad-CAM",
      "OASIS-1 + ADNI",
    ],
    problem:
      "Most published MRI classifiers leak subject data between train and test splits, inflating accuracy to numbers that collapse on external data.",
    solution:
      "A 4-stage PyTorch pipeline: heterogeneous CNN ensemble (EfficientNet/ResNet/DenseNet), optimization-based ensemble weight tuning, Grad-CAM explainability, and rigorous evaluation — subject-wise splits, honest per-class precision/recall on imbalanced data, external validation on ADNI.",
    impact:
      "Delivered as IEEE-formatted research with presentation under faculty mentorship — IEEE EMBS Pune Chapter research internship.",
    recognition: "IEEE EMBS research internship",
    year: 2026,
  },
];

export type BuildingProject = {
  name: string;
  line: string;
  github?: string;
};

export const currentlyBuilding: BuildingProject[] = [
  {
    name: "Scout",
    line: "100k-profile candidate ranking engine — FAISS + 5-signal scorer. India.RUNS Hackathon.",
  },
  {
    name: "AUTONOMA",
    line: "Self-healing MLOps platform — LangGraph + Groq agent with drift detection.",
    github: "https://github.com/Tanny28/autonoma",
  },
  {
    name: "Sentinel",
    line: "Self-evolving multimodal compliance agent — NVIDIA Nemotron + NeMo Agent Toolkit.",
  },
  {
    name: "FinPilot",
    line: "Personal finance management app — early concept.",
  },
];

export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "GenAI / LLM / Agents",
    skills: [
      "LLM agents",
      "Agentic tool-calling",
      "RAG",
      "Model Context Protocol (MCP)",
      "LangChain",
      "LangGraph",
      "Prompt engineering",
      "Structured / JSON output",
      "Guardrails & grounding",
      "Groq API",
      "OpenAI API",
      "Gemini API",
      "HuggingFace Transformers",
      "Fine-tuning (LoRA/PEFT)",
    ],
  },
  {
    category: "Vector / Retrieval",
    skills: ["FAISS", "ChromaDB", "Embeddings", "Semantic search"],
  },
  {
    category: "Machine Learning",
    skills: [
      "Deep learning",
      "CNNs",
      "Ensemble learning",
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "XGBoost",
      "Model evaluation",
      "Grad-CAM explainability",
    ],
  },
  {
    category: "NLP",
    skills: ["spaCy", "distilBERT", "Whisper (faster-whisper)"],
  },
  {
    category: "Backend / Infrastructure",
    skills: [
      "FastAPI",
      "Flask",
      "Pydantic",
      "Node.js",
      "Next.js",
      "REST APIs",
      "PostgreSQL",
      "SQLAlchemy",
      "Redis",
      "Docker",
      "GitHub Actions (CI/CD)",
      "Linux",
    ],
  },
  {
    category: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    category: "Testing & Tools",
    skills: [
      "pytest",
      "Vitest",
      "Git",
      "GitHub",
      "VS Code Extension API",
      "Vercel",
      "OpenCV",
    ],
  },
];

export type Experience = {
  period: string;
  title: string;
  org: string;
  location: string;
  points: string[];
  tags: string[];
  current?: boolean;
};

export const experience: Experience[] = [
  {
    period: "Jun 2026 — Present",
    title: "Software Development Intern",
    org: "Pixaflip Technologies Pvt. Ltd.",
    location: "Pune, India",
    points: [
      "Built Pixa Agent, an open-source AI coding agent for VS Code, as a core deliverable — owning its architecture, test suite, and security design.",
      "Engineering Acadflip DigGen, a document-to-courseware pipeline using adversarial per-slide validation and multi-provider LLM routing across Groq, OpenAI, and Gemini.",
      "Landed the role via self-initiated outreach — built the Smart Lecture Analyzer in a 3-day challenge and converted it into an offer.",
      "Conducted and formally documented a technical interview for an AI/ML candidate, delivering a scored evaluation report used in the hiring decision.",
    ],
    tags: ["Agents", "TypeScript", "LLM routing", "Testing", "Production"],
    current: true,
  },
  {
    period: "Jun 2026 — Jul 2026",
    title: "Research Intern · Deep Learning",
    org: "IEEE EMBS Pune Chapter",
    location: "Pune, India",
    points: [
      "Built a 4-stage PyTorch pipeline for Alzheimer's detection from brain MRI: heterogeneous CNN ensemble, optimization-based weight tuning, Grad-CAM explainability.",
      "Enforced evaluation rigor — subject-wise splits to prevent data leakage, honest per-class precision/recall on imbalanced data, external validation on ADNI.",
      "Delivered IEEE-formatted reports and a research presentation under faculty mentorship.",
    ],
    tags: ["PyTorch", "CNN ensembles", "Grad-CAM", "Medical imaging"],
  },
];

export const education = {
  degree: "B.Tech, Artificial Intelligence & Machine Learning",
  school: "Pimpri Chinchwad University, Pune",
  graduation: "Expected May 2027",
  cgpa: "8.24 / 10",
  coursework:
    "Machine Learning · Deep Learning · DBMS/SQL · Data Structures · Statistics",
} as const;

export type Achievement = {
  metric: string;
  label: string;
  detail: string;
};

export const achievements: Achievement[] = [
  {
    metric: "Best Paper",
    label: "ICCTVB-25",
    detail: "First-author research — ML-based renewable energy forecasting.",
  },
  {
    metric: "Top 25 / 600+",
    label: "DP World × BITS Pilani",
    detail: "National hackathon, Hyderabad — TRADEXA supply-chain simulator.",
  },
  {
    metric: "5 / 5",
    label: "FlytBase benchmark",
    detail: "Perfect score on the drone-agent selection challenge.",
  },
  {
    metric: "3 days",
    label: "Cold email → offer",
    detail: "Built Smart Lecture Analyzer as a challenge; converted to internship.",
  },
  {
    metric: "NVIDIA",
    label: "Fundamentals of NLP",
    detail: "Also competed in the gnani.ai × NVIDIA Agentic AI Hackathon.",
  },
];

export const bio = {
  short:
    "I'm Tanmay, a final-year AI & ML engineering student and Software Development Intern at Pixaflip Technologies, where I built Pixa Agent — an open-source AI coding agent for VS Code with 181 automated tests. I build LLM applications and autonomous agents end-to-end, with a test-and-review mindset.",
  long: [
    "I'm Tanmay Shinde, a final-year B.Tech student in Artificial Intelligence & Machine Learning at Pimpri Chinchwad University, Pune (graduating May 2027). I work as a Software Development Intern at Pixaflip Technologies — a role I landed by cold-emailing and building a purpose-made project in three days.",
    "There I built Pixa Agent, an open-source AI coding agent for VS Code: an agent loop that plans multi-step tasks and edits files, staged behind approvable diffs, running on any OpenAI-compatible endpoint. 181 automated tests across 26 suites, CI-gated on every push.",
    "My focus is applied GenAI — agents, RAG, structured output and guardrails — backed by solid Python and TypeScript engineering. I've placed Top 25 of 600+ teams at the DP World × BITS Pilani national hackathon, won a Best Research Paper award for ML-based forecasting, and completed a deep-learning research internship with IEEE EMBS on medical imaging.",
    "I build things that ship, not demos that die in notebooks.",
  ],
} as const;

// ─── Portfolio-page content (Lumora-style layout) ───────────────────────────

// Display order for the work grid (best evidence first).
export const workOrder = [
  "pixa-agent",
  "tradexa",
  "drone-security-analyst",
  "smart-lecture-analyzer",
  "alzheimers-mri",
  "review-intelligence",
  "acadflip-diggen",
];

export const heroCards = [
  { caption: "Agents", title: "Reviewable by design." },
  { caption: "RAG & LLM apps", title: "Grounded, not guessed." },
  { caption: "ML research", title: "Evaluated honestly." },
];

// Real affiliations only — shown under "Experience · recognition".
export const affiliations = [
  "Pixaflip",
  "IEEE EMBS",
  "FlytBase",
  "DP World",
  "BITS Pilani",
  "ICCTVB-25",
  "NVIDIA",
];

export const expertise = [
  {
    title: "GenAI & LLM applications",
    text: "RAG, structured output, and guardrails that hold up in production.",
  },
  {
    title: "Autonomous agents",
    text: "Tool-calling agents with approval flows, memory, and audit trails.",
  },
  {
    title: "Machine-learning research",
    text: "Leakage-free evaluation, external validation, and explainability.",
  },
  {
    title: "Backend & MLOps",
    text: "FastAPI services, Docker, and CI-gated test suites.",
  },
];

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 181, label: "Automated tests, CI-gated on every push, in Pixa Agent" },
  {
    value: 25,
    prefix: "Top ",
    label: "Finish among 600+ teams at the DP World × BITS Pilani hackathon",
  },
  { value: 5, suffix: "/5", label: "Score on the FlytBase drone-agent benchmark" },
  { value: 2, label: "Internships: Pixaflip (software) and IEEE EMBS (research)" },
];
