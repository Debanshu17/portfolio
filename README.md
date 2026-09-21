# Debanshu Panda — 3D Portfolio

**Live URL:** [https://debanshu17.github.io/portfolio/](https://debanshu17.github.io/portfolio/)

This is the source code for my interactive 3D portfolio.

## Tech Stack
- React 19.2
- TypeScript
- Vite
- Tailwind CSS v4
- React Three Fiber
- Framer Motion

## How to Edit Content
Want to update the text, resume, or profile picture? You don't need to touch any design code. 
Check out [EDITING.md](./EDITING.md) for simple instructions on how to update your site.

## Local Development
```bash
npm install
npm run dev
npm run build
```

## Notes
- React is pinned to 19.2.x because @react-three/fiber does not yet support 19.3.
- The 3D scene (`src/scene/HeroScene.tsx`) is code-split, lazy-loaded, paused off-screen, lighter on phones, and static under prefers-reduced-motion.
