# Portfolio

Personal portfolio site.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS with custom theme
- shadcn/ui (default config)
- framer-motion, gsap
- @react-three/fiber, @react-three/drei, three
- lucide-react, clsx, tailwind-merge
- Geist Sans + Geist Mono via `next/font`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/                  # layout, page, globals
components/
  ui/                 # shadcn components
  sections/           # Hero, About, Projects, Skills, Experience, Contact
  effects/            # NeuralNet, GridBackground, NoiseOverlay, Cursor
lib/                  # utils, data, constants
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm start` — run production build
- `npm run lint` — lint
