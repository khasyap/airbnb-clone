# AI Prompt Log — Airbnb Listing Page Clone

This file is the **prompt history** used to complete the assignment.  
Format: chronological sequence of meaningful user prompts / agent tasks and outcomes.

---

## Phase 1 — Reference & constraints

**Prompt:**  
> MASTER PROMPT — PIXEL-PERFECT AIRBNB LISTING PAGE CLONE. Build a desktop clone of the listing at the reference URL / screenshots. Three views: Listing Page, Photo Tour, Lightbox. Match layout, spacing, typography, colors, gallery, sticky booking, keyboard/a11y. Do not copy source code. Phases: analysis → implement → visual QA → architecture → package ZIP.

**Outcome:** Established scope (desktop-only, original implementation), priority order (listing fidelity → gallery → photo tour → lightbox → a11y).

---

## Phase 2 — Access / visual source of truth

**Prompt:**  
> Explore Vercel bot mitigation bypass techniques  

**Outcome:** Declined (no security bypass). Switched to user-provided **screenshots + video** as the visual source of truth.

**Prompt:**  
> [Uploaded multiple listing screenshots + amenities list + screen-recording video of the Candolim / Mirashya listing]

**Outcome:** Reference analysis driven from screenshots/video (gallery, booking card ₹28,499, amenities, reviews 4.95, host/co-hosts, calendar dates, Things to know).

---

## Phase 3 — Core implementation

**Prompt:**  
> Scaffold Vite + React + TypeScript. Implement header, photo gallery, sticky booking card, amenities, reviews, location, host from the screenshots.

**Outcome:** App scaffolded; `ListingPage`, `PhotoGallery`, `BookingCard`, mock `listing.ts` data.

**Prompt:**  
> Tighten specific visual details (spacing, typography, gallery ratios). Add a more detailed calendar / guest selector UI. Generate the architecture diagram as an image. Package the final submission ZIP.

**Outcome:** CSS grid gallery ratios, dual-month `Calendar`, `GuestSelector`, `docs/architecture.svg` + `.png`, first submission ZIP.

---

## Phase 4 — Interaction parity with video

**Prompt:**  
> Based on above video you can do all the website with same template images color and changes and actions also add i need the exact same website.

**Outcome:** Upgraded Photo Tour (categories), Lightbox (counter, grid back, arrows), Amenities modal (“Show all 50 amenities”).

**Prompt:**  
> the reserve slot not fix after this calendar we scroll down … add the same like co-host also

**Outcome:** Sticky booking card + sticky tabs Reserve bar; Meet your host card with stats + Co-Hosts grid.

**Prompt:**  
> Add missing co-host avatars

**Outcome:** Photo avatars + letter badges (Shruti / Amisha) matching reference layout.

---

## Phase 5 — Layout & carousel

**Prompt:**  
> after calendar the remaining all must in center and in last more stay nearby also more name with arrows to scroll left or right

**Outcome:** Reviews → Nearby moved to full-width centered column; nearby stays expanded; left/right arrow carousel.

**Prompt:**  
> implement CSS scroll-snap for carousel and add responsive grid for mobile devices

**Outcome:** `scroll-snap-type: x mandatory`, responsive breakpoints for layout/gallery/carousel.

---

## Phase 6 — Tab navigation

**Prompt:**  
> when i click photos it navigate to the photos sections while i click location it will navigate to location section and add the all functionalities if anything is missing

**Outcome:** Tabs scroll to `#photos` / `#amenities` / `#reviews` / `#location`; IntersectionObserver scroll-spy; Reserve scrolls to booking card; scroll-margin for sticky chrome.

---

## Phase 7 — Submission artifacts

**Prompt:**  
> How long did it take, and what took the most time?  
> Describe the steps you followed for implementing the assignment.  
> How did you ensure code quality? What features did you skip, if anything?  
> What to include in zip: project (no node_modules), AI config (AGENTS.md, CLAUDE.md, .claude/), architecture diagram.

**Outcome:** Written answers for the form; `AGENTS.md`, `CLAUDE.md`, `.claude/`, architecture diagram in ZIP.

**Prompt:**  
> Prompt logs (.md or .txt). Live URL of your deployed app.

**Outcome:** This `PROMPT_LOG.md`; deploy instructions for a public live URL (see below).

---

## Prompting style notes (for reviewers)

- **Reference-first:** Screenshots/video treated as source of truth; no lifting of reference app source.
- **Iterative visual QA:** Each feedback turn targeted a concrete gap (sticky card, co-hosts, carousel, tabs).
- **Scoped features:** Desktop listing clone prioritized over backend, auth, or full marketplace.
- **Agent roles:** UI analysis → implement → visual QA → a11y → package (see `AGENTS.md` / `.agents/`).

---

## Related files

| File | Purpose |
|------|---------|
| `docs/PROMPT_LOG.md` | This chronological prompt history |
| `docs/ai-prompts.md` | Condensed prompt sequence by phase |
| `AGENTS.md` / `CLAUDE.md` / `.claude/` | Agent configuration |
| `docs/architecture.png` | Architecture diagram image |

---

## Live URL

Deploy the app (example with Vercel), then paste your URL into the submission form:

```bash
cd airbnb-clone-submission/airbnb-clone
npm install
npm run build
npx vercel --prod
```

Or connect the GitHub repo to Vercel/Netlify and use the production URL they provide (e.g. `https://your-app.vercel.app`).
