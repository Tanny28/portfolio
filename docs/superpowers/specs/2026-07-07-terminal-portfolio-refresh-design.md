# Terminal-Engineering Portfolio Refresh — Design

Date: 2026-07-07 · Approved by Tanmay (decisions delegated: "do whatever you find best for AI recruiters")

## Goal
Update the existing Next.js portfolio (D:\PORTF) to current content from PORTFOLIO_MASTER brief and redesign UI/UX as a dark, technical, terminal-engineering portfolio that impresses AI/ML recruiters.

## Approach
Rework in place — keep Next.js App Router, `lib/data.ts` as single content source, Vercel deploy. No rebuild.

## Theme
- Dark slate base (~#0a0f14), teal/cyan accent, subtle grid background.
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (labels/chips/section markers like `// 01 — projects`).
- HUD touches: status-dot availability badge, mono annotations, thin 1px borders. No gimmicky fake terminals.

## Content (all from brief)
- Hero: "Tanmay Shinde — AI/GenAI Engineer" · "I build AI systems that actually ship." · CTAs: View Projects / Resume / GitHub.
- About: long bio + photo + quick facts (Pune, final-year B.Tech AI&ML, May 2027, open to roles).
- Skills: 8 brief categories (Languages, GenAI/LLM, Vector/Retrieval, ML, NLP, Backend/MLOps, Tools, Practices).
- Experience: Pixaflip SDE Intern (Jun 2026–Present), IEEE EMBS Research Intern (Jun–Jul 2026). Education entry.
- Projects (BUILT, in order): Smart Lecture Analyzer (featured — earned the internship), TRADEXA (Top 25/600+), Drone Security Analyst Agent (5/5 FlytBase), Enterprise Review Intelligence, Alzheimer's MRI Detection (IEEE EMBS).
- "Currently building" strip: Scout, AUTONOMA, Sentinel, FinPilot — one line each.
- Achievements row: Best Research Paper (ICCTVB-25), Top 25/600+ DP World×BITS, 5/5 FlytBase, cold-email→3-day-build→offer, NVIDIA NLP cert.
- Contact/footer: copy-email, LinkedIn, GitHub, resume download.
- SEO: title "Tanmay Shinde — AI/GenAI Engineer", new meta description, OG image restyled to theme.
- `TODO:` comments at every [ADD] placeholder (TRADEXA/Drone/Review links, resume PDF URL).

## Keep / Drop
- Keep: AgentChat + /api/chat, ScrollReveal, GridBackground (recolored), KonamiEgg, TopNav (restyled).
- Drop: Hero.tsx + HeroCinematic.tsx (unused variants), standalone Research section (content folds into Projects/Experience), NeuralNet + indigo/amber palette if they fight the theme.

## Verification
Browser preview: all sections render with new content, no console errors, mobile layout, contrast, links/copy-email work. Screenshot proof.
