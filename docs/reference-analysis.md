# Reference Analysis — Airbnb Listing Page Clone

**Source of truth:** Screenshots of https://airbnb-clone-umber-two.vercel.app (desktop)

**Analysis date:** 2026-09-22

**Viewport target:** ~1440–1920px desktop (screenshots show full browser chrome + page)

---

## 1. Page Structure (Actual)

```
Header (fixed/sticky top)
├── Logo (Airbnb)
├── Search pill (Anywhere | Anytime | Add guests + search button)
└── Right controls (Become a host | Globe | Menu)

Main content area (max-width ~1120–1280px, centered, horizontal padding)
├── Property title row
│   ├── H1 title
│   └── Share + Save actions
├── Photo Gallery (5 images visible)
│   ├── Large hero (left, ~2/3 width)
│   └── 2×2 thumbnail grid (right)
│   └── "Show all photos" button (bottom-right of gallery)
├── Sticky secondary nav / price bar (appears on scroll?)
│   ├── Tabs: Photos | Amenities | Reviews | Location
│   └── Right: price summary + Reserve button
├── Two-column layout
│   ├── Left column (main info)
│   │   ├── Property type + location
│   │   ├── Capacity (guests · bedrooms · beds · baths)
│   │   ├── Guest favourite badge + rating + reviews
│   │   ├── Hosted by section
│   │   ├── Highlights (3 feature cards)
│   │   ├── Description (expandable)
│   │   ├── Where you'll sleep
│   │   ├── What this place offers (amenities grid)
│   │   ├── Calendar / date selection
│   │   ├── Reviews summary + category scores + review cards
│   │   ├── Location map + neighbourhood
│   │   ├── Meet your host
│   │   ├── Things to know (3 columns)
│   │   └── More stays nearby (carousel)
│   └── Right column (BookingCard – sticky)
│       ├── Promo banner
│       ├── Price for X nights
│       ├── Date picker (CHECK-IN / CHECKOUT)
│       ├── Guests selector
│       ├── Cancellation note
│       ├── Reserve button
│       ├── "You won't be charged yet"
│       └── Report listing link
└── Footer (not fully visible in provided screenshots)
```

---

## 2. Visual Measurements (Approximate from screenshots)

| Element                    | Approx. value                  | Notes |
|---------------------------|--------------------------------|-------|
| Header height             | ~80px                          | White bg, bottom border subtle |
| Main content max-width    | ~1120–1280px                   | Centered |
| Horizontal padding        | ~40–80px                       | Larger on wide screens |
| Gallery height            | ~480–520px                     | Aspect ratio ~ 2:1 overall |
| Large image (hero)        | ~65–70% width of gallery       | Rounded corners ~12–16px |
| Thumbnail images          | ~30–32% width, 2×2             | Gap ~8px |
| Image border-radius       | 12–16px                        | Consistent |
| Image gap                 | 8px                            | |
| Title font size           | ~26–28px, bold                 | |
| Body text                 | 14–16px                        | |
| Section headings          | 22–26px, semi-bold             | |
| Booking card width        | ~350–380px                     | Sticky |
| Booking card border-radius| 12px                           | Soft shadow |
| Reserve button height     | ~48px                          | Pill / rounded full, pink/magenta |
| Tabs underline            | 2–3px black                    | Active tab |
| Card shadows              | Soft, low elevation            | `0 6px 16px rgba(0,0,0,0.12)` style |
| Spacing system            | 8 / 16 / 24 / 32 / 48px        | Consistent vertical rhythm |

**Colors (observed):**
- Primary pink/magenta (logo, Reserve, search btn): `#FF385C` or close
- Text primary: near-black `#222`
- Text secondary / muted: `#717171`
- Borders: `#DDDDDD` / light gray
- Background: pure white
- Guest favourite laurel: dark gray/black
- Crossed-out amenities: muted + strikethrough

---

## 3. Interaction Inventory

### Listing Page
- **Share** button → likely opens share menu/modal
- **Save** (heart) → toggles favorite state
- **Gallery images** → open Photo Tour (or Lightbox)
- **Show all photos** → opens full Photo Tour
- **Tabs** (Photos / Amenities / Reviews / Location) → scroll to section or switch view
- **Show more / Show less** on description
- **Show all 50 amenities** → expands or opens modal
- **Date cells** on calendar → select check-in/out
- **Clear dates**
- **Guests dropdown** → guest selector
- **Reserve** → primary CTA (no real booking needed)
- **Claim** promo
- **Report this listing**
- **Message host**
- **Show all 19 reviews**
- **Show more** on individual reviews
- **Map zoom +/-**
- **More stays nearby** carousel arrows

### Photo Tour (expected – not fully captured in screenshots)
- Opens full-viewport overlay
- Grid or masonry of all photos
- Close button
- Click individual photo → Lightbox
- Escape closes
- Body scroll locked

### Lightbox (expected)
- Full-screen single image
- Prev / Next arrows
- Counter (e.g. 3 / 24)
- Close
- Keyboard: ← → Esc
- Focus trap

### Keyboard / Accessibility expectations
- All interactive elements focusable
- Visible focus rings
- Modal focus trap + restore
- Escape closes topmost overlay
- Tab order logical (header → gallery → content → booking card)

### Scroll behavior
- Header stays visible
- Booking card becomes sticky
- Secondary nav/tabs may stick
- Background does not scroll when Photo Tour / Lightbox open

---

## 4. Content Model (from screenshots)

```ts
{
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  location: "Candolim, India" / "Candolim, Goa, India",
  type: "Entire serviced apartment",
  guests: 3,
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  rating: 4.95,
  reviewCount: 19,
  isGuestFavourite: true,
  host: {
    name: "Mirashya Homes",
    yearsHosting: 2,
    reviews: 1463,
    rating: 4.68,
    responseRate: "100%",
    responseTime: "Responds within an hour",
    // co-hosts list, bio bits
  },
  pricePerNight: /* calculated */,
  totalForNights: 28499, // INR for 5 nights
  nights: 5,
  checkIn: "2026-10-18",
  checkOut: "2026-10-23",
  cancellation: "Free cancellation before 17 October",
  highlights: [
    { icon: "outdoor", title: "Outdoor entertainment", desc: "..." },
    { icon: "cool", title: "Designed for staying cool", desc: "..." },
    { icon: "self-checkin", title: "Self check-in", desc: "..." }
  ],
  description: "Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ...",
  sleepingArrangements: [
    { name: "Bedroom", detail: "1 double bed", image: "..." },
    { name: "Living room", detail: "1 sofa", image: "..." }
  ],
  amenities: [ /* long list including Kitchen, Wifi, Pool, Hot tub, etc. Some unavailable */ ],
  reviews: [ /* individual reviews with author, date, text, rating */ ],
  categoryRatings: {
    overall: 4.95,
    cleanliness: 5.0,
    accuracy: 5.0,
    checkin: 5.0,
    communication: 5.0,
    location: 4.8,
    value: 4.8
  },
  locationNotes: "Exact location will be provided after booking.",
  neighbourhood: "...",
  houseRules: { checkIn: "after 2:00 pm", checkOut: "before 11:00 am", maxGuests: 3 },
  safety: [ "Carbon monoxide alarm not reported", "Smoke alarm not reported", "Exterior security cameras on property" ]
}
```

---

## 5. Priority Implementation Order (from screenshots)

1. Header + Property title + Share/Save
2. Photo Gallery (exact 1 + 4 layout + Show all photos)
3. BookingCard (sticky right)
4. Main left column sections in order
5. Tabs / secondary nav
6. Photo Tour overlay
7. Lightbox
8. Reviews, map placeholder, host card, things to know, nearby carousel
9. Keyboard + focus management + reduced motion
10. Polish spacing, radii, shadows, typography to match

---

## 6. Assumptions & Gaps

- Exact Photo Tour and Lightbox layouts are not in the provided screenshots → will implement standard high-fidelity Airbnb-style full-screen gallery + single-image viewer with keyboard support.
- Footer not fully visible → implement a minimal realistic Airbnb-style footer.
- Exact image assets will be replaced with high-quality placeholders or independently sourced images that match the visual theme (modern Indian apartment / jacuzzi / outdoor seating).
- No real backend / booking flow required.
- Desktop only (as specified).

---

## 7. Next Steps

1. Create project scaffolding (Vite + React + TypeScript)
2. Define data model in `src/data/listing.ts`
3. Implement Header, PropertyHeader, PhotoGallery, BookingCard
4. Build remaining sections
5. Add PhotoTour + Lightbox with proper a11y
6. Visual QA against these screenshots
7. Architecture diagram + AI prompt log + submission package
