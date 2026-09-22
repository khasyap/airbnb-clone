# CLAUDE.md — Project instructions for Claude

## Goal

Pixel-faithful **desktop** clone of an Airbnb listing page (reference: screenshots + video). Original implementation only — do not copy reference source code.

## Stack

- Vite, React, TypeScript
- CSS Modules; design tokens in `src/styles/`
- Path: listing UI only (no auth, payments, or real booking API)

## Must-have views

1. Listing page (gallery, sticky booking card, amenities, reviews, location, host)
2. Photo Tour (categorized full-screen gallery)
3. Lightbox (single photo, counter, keyboard)

## Conventions

- Components under `src/components/`
- Page orchestration in `src/pages/ListingPage.tsx`
- Mock data in `src/data/listing.ts`
- Prefer accessibility: roles on tabs, Esc/arrows in lightbox, scroll-margin for sticky chrome
- Desktop-first; light responsive rules OK

## Do not

- Commit `node_modules`
- Add real API keys or live Airbnb scraping
- Expand scope to search/browse or multi-page marketplace

## Docs to keep in sync

- `docs/reference-analysis.md`
- `docs/architecture.md` + `docs/architecture.png` / `.svg`
- `docs/ai-prompts.md`
- `README.md`
