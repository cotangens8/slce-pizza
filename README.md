# SLCE Pizza

Pizza by the slice — a Storyblok + Next.js + Vercel demo.

## Quick start

1. Copy `.env.local.example` to `.env.local`
2. Add your Storyblok preview token
3. Run `npm install`
4. Run `npm run dev`
5. Open http://localhost:3000

## Architecture

- Next.js 14 (App Router)
- Storyblok (headless CMS)
- TypeScript

Content blocks live in `src/components/blocks/` and are registered in `src/components/StoryblokProvider.tsx`.
