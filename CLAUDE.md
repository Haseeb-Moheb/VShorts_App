# VShorts

Short-form video social platform. Live: https://vshorts.vercel.app/

## Stack
- Next.js (file-based routing, SSR + static generation), React, TypeScript
- Zustand for global state
- Sanity as the content backend (videos, users, comments, likes)
- Google OAuth for login/registration
- Tailwind CSS for styling

## Conventions
- TypeScript strict; no `any` without a comment explaining why
- Function components + hooks only
- Keep Sanity writes server-side (API routes); never expose write tokens to the client
- Tailwind utility classes; avoid custom CSS unless necessary
- Mobile-first, responsive

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build (must pass before any PR)
- `npm run lint` — lint

## Priorities
1. Feed performance (lazy-load, autoplay only in-view video, pagination)
2. Security (server-side token verification, rate limits, upload validation)
3. Personalization signals (watch time, likes, shares, skips)
4. UX polish (loading/empty/error states, accessibility)
