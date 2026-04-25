# Tanmay Shinde · Portfolio

Personal portfolio — AI Engineer, B.Tech AI-ML @ PCU Pune.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS with custom dark theme (accent: `#00d4ff`)
- GSAP ScrollTrigger — cinematic 4-frame hero
- Groq SDK + Llama 3.3 — streaming AI chat agent
- framer-motion, gsap, @react-three/fiber, three
- lucide-react, Geist Sans + Geist Mono

## Getting started

```bash
npm install
cp .env.example .env.local   # then add your GROQ_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | Yes | Get at [console.groq.com](https://console.groq.com) — free tier is enough |

## Deploy to Vercel

1. Push to GitHub
2. Import repo in [vercel.com/new](https://vercel.com/new)
3. Add `GROQ_API_KEY` in **Settings → Environment Variables**
4. Deploy — Vercel auto-detects Next.js

Without `GROQ_API_KEY` the AI chat widget will return errors; everything else works.

## Structure

```
app/
  layout.tsx            # metadata, global mounts (Cursor, ScrollReveal, Konami, AgentChat)
  page.tsx              # section order
  opengraph-image.tsx   # OG image (next/og)
  icon.tsx              # favicon (next/og)
  api/chat/route.ts     # Groq streaming endpoint
components/
  sections/             # Hero (cinematic), About, Projects, Skills, Experience, Research, Contact
  chat/                 # AgentChat floating panel
  effects/              # Cursor, ScrollReveal, KonamiEgg, NeuralNet
  projects/             # DroneArchitecture SVG diagram
  about/                # GitHubTicker async server component
lib/
  data.ts               # Projects, Skills, Timeline data
  agent-context.ts      # LLM system prompt for AI chat
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run build:check` — build + start (smoke test)
- `npm start` — run production build
- `npm run lint` — lint

## Features

- **Cinematic hero** — 4-frame GSAP ScrollTrigger intro (400vh), skip button, mobile fallback
- **AI chat agent** — Groq Llama 3.3 streaming, session persistence, rate limiting
- **Drone architecture** — animated SVG data-flow diagram inside project modal
- **Magnetic cursor** — spring-physics dot + ring, hover expand, desktop only
- **3D card tilt** — perspective tilt + cursor glow on project cards
- **Section reveal** — intersection observer fade-up animations
- **GitHub ticker** — live last-commit widget in About (cached 1h)
- **OG image + favicon** — generated via `next/og`
- **Konami code** — ↑↑↓↓←→←→BA → matrix rain easter egg
