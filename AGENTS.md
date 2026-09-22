# AGENTS.md — AI Agent Configuration

This project was built with an AI-assisted workflow. Agents and roles used during development:

## Agent roles

| Role | Responsibility |
|------|----------------|
| **UI Analyst** | Analyze reference screenshots/video; extract layout, spacing, typography, colors, interactions |
| **Frontend Engineer** | Implement React + TypeScript components, state, and interactions |
| **Visual QA** | Compare implementation to reference; flag spacing, sticky, gallery, and tab issues |
| **Accessibility** | Keyboard nav (Esc, arrows), focus, ARIA on tabs/modals, scroll-margin |
| **Final Reviewer** | Build checklist, README, architecture diagram, submission ZIP |

## Project stack

- Vite + React 18 + TypeScript
- CSS Modules + design tokens
- No backend; static listing data in `src/data/listing.ts`

## Key deliverables

- Desktop listing page (gallery, booking card, calendar, guests)
- Photo Tour + Lightbox
- Amenities modal
- Tab navigation (Photos / Amenities / Reviews / Location) with scroll-spy
- Meet your host + co-hosts
- More stays nearby carousel (scroll-snap)
- `docs/architecture.png` / `.svg` marketplace architecture diagram
- `docs/reference-analysis.md`, `docs/ai-prompts.md`

## Run

```bash
npm install
npm run dev
```

## Agent config files

- `AGENTS.md` (this file)
- `CLAUDE.md` — Claude-oriented project instructions
- `.claude/` — Claude Code settings
- `.agents/` — role prompt stubs used during development
