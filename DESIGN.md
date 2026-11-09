---
name: Alpha Locksmith & Garage
description: A dark, flat, one-accent site built so the phone number is always one tap away.
colors:
  night-bg: "#151515"
  night-bg-alt: "#202020"
  surface: "#202020"
  surface-raised: "#2a2a2a"
  hairline: "#333333"
  text: "#f4f4f2"
  text-muted: "#a8a8a3"
  dispatch-orange: "#ff6700"
  dispatch-orange-hover: "#ff8533"
  topbar-black: "#000000"
  orange-ink: "#000000"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.5rem, 5.4vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 3rem)"
    fontWeight: 700
    lineHeight: 1
  sub:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1
  lead:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.14em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  section: "56px"
  card: "20px"
components:
  button-primary:
    backgroundColor: "{colors.dispatch-orange}"
    textColor: "{colors.orange-ink}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  button-primary-hover:
    backgroundColor: "{colors.dispatch-orange-hover}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "20px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "6px 13px"
  field:
    backgroundColor: "{colors.night-bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "10px 11px"
---

# Design System: Alpha Locksmith & Garage

## Overview

**Creative North Star: "The Night Dispatch"**

A dark, high-contrast board for an emergency call. The page does one job: get an urgent visitor to the phone number, or the quote form, without anything in the way. Surfaces are flat and sturdy, headings are condensed and stamped in capitals, and a single hot orange marks every action.

The mood is urgent, sturdy and no-nonsense. It must read fast on a phone in a stressful moment. Trust comes from exact credentials (license and certification numbers) shown early and plainly, not from decoration.

**Key Characteristics:**
- Dark base with one orange accent that always means "act" or "this is a fact that matters".
- Condensed uppercase display type over a plain, readable sans body.
- Flat surfaces separated by tone and hairlines, never shadows.
- A fixed orange call bar on every page.

## Colors

A near-black palette with one saturated orange.

### Primary
- **Dispatch Orange** (#ff6700): Every primary button, the sticky call bar, eyebrow labels, icons, check marks, stars and the orange "area" section. Hover lifts to #ff8533.

### Neutral
- **Night Black** (#151515): Page background and field fill.
- **Shop Floor** (#202020): Alternating section background.
- **Steel Surface** (#202020) and **Raised Steel** (#2a2a2a): Cards and form panels; the step up from the page.
- **Hairline** (#333333): All borders and dividers.
- **Chalk** (#f4f4f2): Primary text. **Dim Chalk** (#a8a8a3): Secondary text and captions.
- **Topbar Black** (#000000): The "Open 24/7 / license" strip.

### Named Rules
**The One Voice Rule.** Orange is the only accent. If something is not an action, a credential or a label that must be seen, it is not orange.

**The Black-on-Orange Rule.** Text on orange is pure black (#000000), never white or near-black.

## Typography

**Display Font:** Barlow Condensed (Arial Narrow fallback)
**Body Font:** Barlow (system-ui fallback)

**Character:** A stamped, workshop-sign headline over a calm, legible body.

### Hierarchy
One size per role, defined as tokens in globals.css (`text-label`, `text-small`, `text-body`, `text-lead`, `text-title`, `text-sub`). No other literal font sizes.
- **Display** (800, clamp(2.5rem to 4.25rem), 1.0): The one H1 per page, uppercase, key phrase in orange.
- **Headline** (700, clamp(2rem to 3rem), 1.0): Every section title, uppercase (`.h-section`).
- **Sub** (700, 1.5rem): Form title, price line, large call buttons.
- **Title** (700, 1.25rem): Card titles, FAQ questions, stat values.
- **Lead** (600, 1.25rem): The hero intro line.
- **Body** (400, 1rem, 1.6): All prose, buttons, inputs, list items; keep lines near 65 characters.
- **Small** (400, 0.9375rem): Captions, attributions, footer links, breadcrumbs.
- **Label** (600, 0.875rem, 0.14em tracking, uppercase): Eyebrows, badges, filter chips, stat captions. Only for short tracked-caps labels.

### Named Rules
**The Readable-Copy Rule.** Anything a person reads as a sentence is 16px. 15px is for captions and meta, and 14px only for tracked uppercase labels.
**The One-Size-Per-Role Rule.** The same role is the same size on every page and state. Do not add a new literal size; use a token or change the token.

## Layout

A centered container whose content is 1120px wide on large screens, with a fluid gutter of 16px to 40px added on either side; content only narrows once the viewport is smaller than 1120px plus both gutters. Sections stack with about 56px of vertical padding and alternate between the page black and the slightly lighter Shop Floor. The hero is two columns (copy and a 340px quote form) from 1024px and a single column below. The service cards run 4, 2 then 1 across. The main nav appears from 1280px; below that a menu button replaces it, and the header phone button shows from 1024px. A fixed call bar sits at the bottom of every page, with matching bottom padding on the body.

## Elevation & Depth

Flat. There are no shadows anywhere. Depth is conveyed by stepping tone (page, then surface, then raised surface) and thin hairline borders. The call bar is separated by a 2px black top border instead of a shadow.

### Named Rules
**The Flat-By-Default Rule.** Do not add box-shadows. If something needs to stand out, change its tone or use the orange.

## Shapes

Soft but sturdy: inputs 6px, buttons 8px, cards 10px, chips and badges fully pill-shaped. Borders are 1px hairlines; the service-area section uses 2px black borders on orange.

## Components

### Buttons
Solid orange with pure black condensed uppercase text. Hover (on pointer devices only) lightens to #ff8533; pressing scales to 0.97 in 160ms with a strong ease-out. The sticky bar variant is solid black with white text.

### Cards
Steel Surface fill, 1px hairline, 10px radius, 20px padding. Used for services, the quote form, steps, reviews, FAQ items and pricing.

### Chips
Pill with a hairline border and condensed semi-bold text. Filter chips toggle with an orange border and a faint orange fill; link chips gain an orange border on hover.

### Inputs
Night Black fill, hairline border, 6px radius. Focus shows a 2px orange outline. Labels sit above in small semi-bold text.

### FAQ
Native details/summary with an orange triangle that rotates 90 degrees when opened.

### Motion
Content rises 10px and fades in over 500ms once on load. All motion is removed under reduced-motion.

## Do's and Don'ts

### Do
- Keep the phone number reachable in the header, hero, and sticky bar.
- Show license CCB#248737 and certification 62990CLS exactly as written.
- Keep placeholder copy in square brackets until real content exists.
- Use Dispatch Orange sparingly and always for action or fact.

### Don't
- Don't add shadows, gradients on surfaces, or glass effects.
- Don't put white text on orange.
- Don't invent reviews, prices or years in business.
- Don't use type below 14px, and don't set prose below 16px.
