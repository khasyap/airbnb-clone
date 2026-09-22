# AI Prompt Sequence

Documented meaningful prompts used during development.

## 1. Reference Analysis

> Analyze the provided screenshots of the Airbnb listing page. Extract page structure, approximate measurements (header height, gallery layout, spacing, typography, colors), and interaction inventory. Produce a structured reference-analysis.md.

## 2. Architecture

> Design a production-scale vacation-rental marketplace architecture (CDN, API gateway, microservices for auth/listing/search/booking/payment/media, data layer with Postgres/Redis/OpenSearch/S3, event streaming). Keep it understandable in under two minutes.

## 3. Initial Implementation

> Scaffold a Vite + React + TypeScript project. Create a typed Listing data model and separate content from UI. Implement Header, PropertyHeader, PhotoGallery (1 large + 4 thumbs + Show all photos), and sticky BookingCard matching the screenshots.

## 4. Gallery & Photo Tour

> Implement PhotoGallery that opens a full-viewport PhotoTour overlay on “Show all photos” or image click. PhotoTour shows a scrollable grid of all images. Body scroll must be locked. Escape closes. Focus moves to close button.

## 5. Lightbox

> Clicking an image inside PhotoTour opens Lightbox. Support previous/next buttons, image counter, Escape, Left/Right arrows, focus trap, and restore focus on close. Nested overlay state must be correct.

## 6. Accessibility

> Add semantic HTML, aria-labels, visible focus rings, keyboard navigation, modal focus management, and prefers-reduced-motion support across Header, Gallery, PhotoTour, and Lightbox.

## 7. Visual QA

> Compare the implementation against the provided screenshots. Prioritize layout, gallery composition, booking card dimensions, typography, spacing, and sticky behavior. Fix largest differences first.

## 8. Final Packaging

> Create README, architecture diagram (markdown), AI prompt log, agent configs under .agents/, and ensure the project installs and runs with npm install && npm run dev.
