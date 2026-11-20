# Alpha Locksmith & Garage

Marketing site for Alpha Locksmith & Garage (Portland, OR). It is built to get a visitor to the phone number or the quote form as fast as possible.

- **Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4.
- **Pages:** homepage, 5 service pages, 11 city pages, all generated from data files.
- **Forms:** the quote form emails each lead through [Resend](https://resend.com). Nothing is stored in a database.
- **Tracking:** optional Google Analytics 4, Google Ads and Microsoft Clarity, switched on by environment variables.

Design and product context live in [`DESIGN.md`](DESIGN.md) and [`PRODUCT.md`](PRODUCT.md).

## 1. Requirements

- **Node.js 22.** Tailwind v4 does not run on Node 18. The repo pins it in `.nvmrc`.
- npm (comes with Node).

```bash
nvm install 22   # first time only
nvm use          # reads .nvmrc
```

## 2. Set up

```bash
npm install
cp .env.example .env.local   # then fill in the values (section 3)
npm run dev                  # http://localhost:3000
```

`.env.local` is git-ignored, so keys never get committed. Restart the dev server after changing it.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (all 27 pages are pre-rendered) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |

## 3. Environment variables

Every variable is optional for local development. The site runs with none of them set. Set them all before going live.

### Site

| Variable | Needed for | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical links, sitemap, share image, structured data | The real production domain, e.g. `https://alphalocksmithngarage.com`. Defaults to that value if blank. |

### Quote form email (Resend)

The form validates, then emails the lead. If sending fails, the visitor sees "please call us" and the cause is logged on the server.

| Variable | Notes |
|---|---|
| `RESEND_API_KEY` | From resend.com, starts with `re_`. |
| `LEADS_TO_EMAIL` | Who receives leads. Comma-separate several addresses. |
| `LEADS_FROM_EMAIL` | e.g. `Alpha Website <leads@alphalocksmithngarage.com>`. **The domain must be verified in Resend** (Domains, then add the SPF and DKIM records). Until then use `Alpha Website <onboarding@resend.dev>`, which only delivers to the email you signed up to Resend with. |

With no keys in development, the form just logs the lead in the terminal. With no keys in production, it shows the "please call us" message.

### Analytics and heatmaps

Setting a key turns the matching tracking on. Leaving all of them blank loads no scripts and attaches no listeners.

| Variable | What it enables |
|---|---|
| `NEXT_PUBLIC_GA_ID` | GA4, e.g. `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads tag, e.g. `AW-123456789` |
| `NEXT_PUBLIC_ADS_CALL_CONVERSION` | Ads conversion for a phone tap, e.g. `AW-123456789/AbCdEf` |
| `NEXT_PUBLIC_ADS_LEAD_CONVERSION` | Ads conversion for a quote form lead, e.g. `AW-123456789/GhIjKl` |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity: visual click and scroll heatmaps and session recordings (free) |
| `NEXT_PUBLIC_ANALYTICS_DEBUG` | Set to `true` to log every tracked event in the browser console |

Variables starting with `NEXT_PUBLIC_` are baked in when the site is built, so rebuild (or restart `npm run dev`) after changing them.

**Events sent automatically** (see `src/components/Analytics.tsx`): `phone_click`, `email_click`, `cta_click`, `nav_click`, `service_click`, `city_click`, `outbound_click`, `gallery_filter`, `reviews_nav`, `menu_toggle`, `section_view`, `scroll_depth`, `faq_open`, `form_start` and `generate_lead`. Each carries the page section it happened in and a rough click position. To see those in GA4 reports, register `section`, `label`, `x_pct` and `y_pct` as custom dimensions.

To track something new, add `data-section="name"` to a section or `data-track="event_name"` to an element. No other code is needed.

The site has no cookie consent banner. GA4 and Clarity set cookies, so check whether your audience needs one.

### Display ads (Google AdSense)

> **Currently disabled.** The ad script, every `<AdSlot />` and `/ads.txt` are commented out, so the variables below do nothing. The steps to turn ads back on are at the top of `src/lib/ads.ts`.

Six places on the site can show a Google display ad. They are built in but **off by default**: with the variables below blank, no ad script loads, no request is made and the slots take up no space. This is separate from the Google Ads *conversion tracking* above, which measures your ad campaigns.

| Variable | What it does |
|---|---|
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Your publisher ID, e.g. `ca-pub-1234567890123456`. Also serves `/ads.txt`, which AdSense asks for. |
| `NEXT_PUBLIC_ADSENSE_ENABLED` | `true` turns the ads on. Needs the client ID and a slot ID. |
| `NEXT_PUBLIC_ADSENSE_PREVIEW` | `true` shows dashed boxes where the ads will go, with no ad requests. Use it to review positions. |
| `NEXT_PUBLIC_ADSENSE_SLOT_*` | One ad unit ID per placement (create them in AdSense under Ads, then By ad unit). |

| Placement | Slot variable | Where it appears |
|---|---|---|
| `home_mid` | `NEXT_PUBLIC_ADSENSE_SLOT_HOME_MID` | Home page, after services |
| `home_bottom` | `NEXT_PUBLIC_ADSENSE_SLOT_HOME_BOTTOM` | Home page, after reviews |
| `service_mid` | `NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_MID` | Service pages, after the signs section |
| `service_bottom` | `NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_BOTTOM` | Service pages, after the FAQ |
| `city_mid` | `NEXT_PUBLIC_ADSENSE_SLOT_CITY_MID` | City pages, after recent jobs |
| `city_bottom` | `NEXT_PUBLIC_ADSENSE_SLOT_CITY_BOTTOM` | City pages, after the FAQ |

A placement shows a real ad only when ads are enabled **and** that placement has its own slot ID, so you can switch them on one at a time. To move or add a placement, edit `src/lib/ads.ts` and drop `<AdSlot placement="..." />` where you want it. The code lives in `src/components/AdSlot.tsx` and `AdSenseScript.tsx`.

Before turning ads on: the site has no cookie consent banner, and AdSense requires consent handling for visitors in the EU and UK. Ads also sit next to your call-to-action, so check they do not push the phone number or quote form out of view.

## 4. Where to edit things

Almost all copy lives in data files, so you rarely touch components.

| To change | Edit |
|---|---|
| Phone, license numbers, email, nav, homepage service cards, gallery items, the list of cities | `src/lib/site.ts` |
| Any service page's text (spring repair, locksmith, gates, access control, fencing) | `src/lib/services.ts` |
| Add a service page | Add a config in `services.ts`, add it to `servicePages`, and add `src/app/<url>/page.tsx` (copy an existing one) |
| A city page's ZIP codes and nearby areas | `src/lib/cities.ts` |
| Add a city | Add its name to `cities` in `site.ts` and its data in `cities.ts`. The page and sitemap entry appear automatically. |
| Page layout of service or city pages | `src/components/ServicePage.tsx`, `src/components/CityPage.tsx` |
| Colors, type sizes, buttons | `src/app/globals.css` (tokens at the top), documented in `DESIGN.md` |
| Logo | Replace `public/logo.png`. If its shape changes, update the two size numbers at the top of `src/components/Logo.tsx`. |
| Gallery and job photos | `public/work/`, then reference them in `site.ts` |
| Favicon and app icons | `src/app/favicon.ico`, `icon.png`, `apple-icon.png` |
| Social share image | `src/app/opengraph-image.tsx` |
| Page titles and descriptions | `pageMeta(...)` in each page, or `meta` in `services.ts` |

Text in **[square brackets]** is placeholder copy that still needs real information: prices, warranties, arrival times, local intros and neighborhoods. It lives in `services.ts`, `CityPage.tsx` and `page.tsx`.

The "What customers say" carousel (home, service and city pages) shows real Google reviews from `homeReviews` in `site.ts`. Add new ones to that list word for word, with the reviewer's name. Every card opens the Google listing at `site.reviewsUrl` in a new tab.

## 5. Before launch checklist

1. Fill in the bracketed placeholders, and check the ZIP codes in `cities.ts` and the brand lists in `services.ts`.
2. Confirm every review in `homeReviews` really is the 5-star review it is shown as (the cards always show five stars).
3. Set the environment variables above in your hosting provider (not just `.env.local`).
4. Verify the sending domain in Resend and send a real test lead.
5. Add the Google Business Profile link and street address (if public) to the footer and `src/lib/seo.ts`.
6. Set up redirects from the old site's URLs to the new ones.
7. Verify the site in Google Search Console and submit `/sitemap.xml`.
8. Decide whether to add `noindex` to pages that still contain placeholder text, so they stay out of search results until they are filled in.

## 6. Deploying

Any host that runs Next.js works. [Vercel](https://vercel.com) is the simplest: import the repo, add the environment variables from section 3, and deploy. Use Node 22.

## 7. Project structure

```
src/
  app/
    page.tsx                      Homepage
    locations/[city]/page.tsx     One route that renders every city page
    <service>/page.tsx            One small file per service page
    actions.ts                    Quote form server action (validation + Resend)
    layout.tsx                    Fonts, metadata, header, footer, analytics
    sitemap.ts, robots.ts         Generated from the data files
    opengraph-image.tsx           Social share image
  components/
    ServicePage.tsx, CityPage.tsx Page templates
    Analytics.tsx                 Tracking (GA4, Ads, Clarity)
    QuoteForm.tsx, SiteHeader.tsx, SiteFooter.tsx, ...
  lib/
    site.ts, services.ts, cities.ts   Content
    seo.ts                            Metadata and structured data helpers
public/                         Logo and photos
```

## 8. Security note

Never commit real keys. `.env.local` is git-ignored and only `.env.example` (with blank values) is tracked. Do not store logins or passwords in this repository.
