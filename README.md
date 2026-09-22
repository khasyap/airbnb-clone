# Airbnb Listing Page Clone

Pixel-accurate desktop clone of an Airbnb listing page, built from visual reference screenshots.

## Overview

This project reproduces the desktop experience of a vacation-rental listing page, including:

- Listing page layout and content
- Photo gallery
- Full-screen Photo Tour
- Lightbox / single-photo viewer
- Sticky booking card
- Keyboard navigation and accessibility features

The implementation is original React + TypeScript code. It does **not** copy any source code, JavaScript, or CSS from the reference application.

## Features

- Pixel-faithful desktop listing page (header, gallery, property details, booking card, reviews, location, host, nearby stays)
- Photo Tour overlay with scrollable grid
- Lightbox with previous/next navigation
- Keyboard support (Esc, ←, →, Tab, focus trap)
- Body scroll locking when overlays are open
- Focus restoration on close
- `prefers-reduced-motion` support
- Semantic HTML and accessible controls
- Structured data model separated from UI

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS Modules
- Inline SVG icons

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Production Build

```bash
npm run build
npm run preview
```

## Architecture

See [docs/architecture.md](docs/architecture.md) for a production-scale vacation-rental marketplace architecture.

## AI Workflow

See [docs/ai-prompts.md](docs/ai-prompts.md) and `.agents/` for the AI development workflow and agent configurations.

## Accessibility

- Semantic headings and landmarks
- Accessible button labels and ARIA attributes
- Visible focus styles
- Modal focus management (trap + restore)
- Escape closes overlays
- Arrow keys navigate lightbox
- Reduced-motion media query respected

## Testing

Manual testing performed against provided screenshots:

- Visual layout comparison
- Gallery → Photo Tour → Lightbox flow
- Keyboard navigation (Tab, Esc, arrows)
- Favorite toggle
- Description expand/collapse
- Sticky booking card

## License

For evaluation / take-home purposes only.
