import { cityServicePath, getServiceBySlug, type ServicePageConfig } from "./services";

/**
 * Draft service pages: planned in the client's copy doc (docs/SEO_COPY_V1.md) and waiting on
 * budget approval. They render with the same template as the live pages (components/ServicePage.tsx)
 * but only at /drafts/locations/[city]/service/[slug], with a "Draft" banner, noindex, and no
 * sitemap entry. Nothing on the live site links here. Index of all drafts: /drafts.
 *
 * Copy is verbatim from the doc, minus the "| Alpha" title suffix and the "Button" lines.
 * Hero photos are placeholders from the existing job photos until the client sends their own.
 *
 * Common change requests:
 * - Edit text: change the field. H1 = hero.title + hero.accent; intro = hero.lead;
 *   H2 sections = info, then moreInfo.
 * - Add photos: put the files in public/work/drafts/<slug>/ and list them in `gallery`
 *   ({ src, alt, caption? }). Swap the main photo in hero.image.
 * - Add a section the live pages have (faqs, steps, signs, brands, warning, hero.checks,
 *   hero.badge): same fields and shapes as in services.ts.
 *
 * - Client-facing summary and open questions (on /drafts and in each page's banner): `draftNotes`.
 *
 * To publish a page once approved:
 * 1. Move its object to services.ts and add it to `servicePages` (that adds the live route and
 *    the sitemap entry; the live route builds it for every city in lib/cities.ts).
 * 2. Add its slug to the matching plain-text label in the parent page's `related` list.
 * 3. Remove it from `draftPages` and `draftNotes` here.
 */

/** Cities the drafts are built for. */
export const draftCities = ["portland"];

export const draftPath = (citySlug: string, slug: string) => `/drafts/locations/${citySlug}/service/${slug}`;

const emergencyLockout: ServicePageConfig = {
  slug: "emergency-lockout",
  parent: "locksmith",
  // PENDING CLIENT DECISION: "24/7" in the title and H1 is not covered by the after-hours swap
  // in lib/hours.ts; the intro's "estimated arrival time" differs from the Locksmith page's 20-35 minutes.
  meta: {
    title: "24/7 Emergency Lockout Services in Portland, OR",
    description: "Locked out of your car, home, or business in Portland? Call 503-505-8560 for 24/7 mobile lockout assistance",
  },
  crumbs: { category: "Locksmith services", label: "Emergency Lockouts" },
  schema: {
    name: "Emergency lockout service",
    description: "Locked out of your car, home, or business in Portland? Call 503-505-8560 for 24/7 mobile lockout assistance",
  },
  hero: {
    title: "24/7 Car, Home, and Business Lockout Service in",
    accent: "Portland",
    lead: "Keys locked inside your car? Unable to get into your home or open your business? Alpha Locksmith & Garage answers emergency calls 24/7. Tell us where you are and what you’re locked out of so we can confirm technician availability and give you an estimated arrival time.",
    image: { src: "/work/car-lockout.jpg", alt: "Alpha technician helping with a car lockout" },
  },
  info: {
    title: "Tell us what happened",
    body: "A key left inside, a lost key, and a broken key can each call for a different service. For a vehicle lockout, have the year, make, and model ready. For a home or business, tell us which door is affected and whether the lock was already sticking or damaged.",
  },
  moreInfo: [
    {
      title: "Help us find you",
      body: "Give us the street address or nearest intersection. If you’re in a parking garage, apartment complex, or shopping center, include the level, building number, or storefront name. Have your ID and any proof of authorized access available. We’ll explain the options and quote the work before starting.",
    },
  ],
  related: [{ label: "Replacement Car Keys", slug: "car-key-replacement" }],
};

const lockRekeying: ServicePageConfig = {
  slug: "lock-rekeying",
  parent: "locksmith",
  meta: {
    title: "Lock Rekeying in Portland, OR | Home & Business",
    description: "Rekey your home, rental, or business locks in Portland. Keep compatible hardware and change which keys open your doors.",
  },
  crumbs: { category: "Locksmith services", label: "Lock Rekeying" },
  schema: {
    name: "Lock rekeying",
    description: "Rekey your home, rental, or business locks in Portland. Keep compatible hardware and change which keys open your doors.",
  },
  hero: {
    title: "Lock Rekeying for Homes and Businesses in",
    accent: "Portland",
    lead: "Rekeying lets you keep compatible locks and change which keys open them. It’s a practical option after moving into a home, taking over a commercial space, or changing who should have access to a rental or business.",
    image: { src: "/work/gallery/locksmith-3.jpg", alt: "Key cutting" },
  },
  info: {
    title: "Rekey after a move, lost key, or tenant turnover",
    body: "If you don’t know who still has a copy of your keys, we can check whether your existing locks can be rekeyed. Property managers can schedule service between tenants, and businesses can specify which entrances need new keys after an employee leaves or a key goes missing.",
  },
  moreInfo: [
    {
      title: "Can one key open multiple doors?",
      body: "If the locks are compatible, we may be able to set up several doors to work with one key. Include side entrances, back doors, and detached garages when you make your list. Tell us which doors should share a key and which should stay separate.",
    },
    {
      title: "What affects the cost?",
      body: "The quote depends on how many locks you need rekeyed, the hardware, and how many new keys you want. If a lock is worn or incompatible, we’ll explain your options before you approve the work.",
    },
  ],
  related: [{ label: "Lock Repair & Replacement", slug: "lock-repair" }],
};

const lockRepair: ServicePageConfig = {
  slug: "lock-repair",
  parent: "locksmith",
  meta: {
    title: "Lock Repair & Replacement in Portland, OR",
    description: "Get help with sticking locks, damaged deadbolts, and doors that won’t latch. Alpha repairs and replaces locks in the Portland metro area.",
  },
  crumbs: { category: "Locksmith services", label: "Lock Repair & Replacement" },
  schema: {
    name: "Lock repair and replacement",
    description: "Get help with sticking locks, damaged deadbolts, and doors that won’t latch. Alpha repairs and replaces locks in the Portland metro area.",
  },
  hero: {
    title: "Lock Repair and Replacement in",
    accent: "Portland, OR",
    lead: "A key that takes extra force to turn, a deadbolt that binds, or a latch that won’t catch can make a door hard to use or secure. We inspect the lock, door, and frame together to find where the problem starts.",
    image: { src: "/work/lock-installation.jpg", alt: "Technician repairing the lock on a front door" },
  },
  info: {
    title: "Why a lock may jam when the door closes",
    body: "If the deadbolt turns freely while the door is open but binds when it’s closed, the bolt may be catching against the strike in the frame. A shifted door, loose hinge, worn lock cylinder, or damaged latch can cause similar symptoms. We’ll check the hardware before recommending the repair.",
  },
  moreInfo: [
    {
      title: "When to replace a lock",
      body: "Replacement may make sense when the lock is damaged, keeps jamming, or no longer meets your needs. For a commercial entrance, we also consider how the door is used during business hours and how staff need to enter after hours.",
    },
  ],
  related: [
    { label: "Lock Rekeying", slug: "lock-rekeying" },
    { label: "Storefront & Commercial Doors", slug: "storefront-door-repair" },
  ],
};

const carKeyReplacement: ServicePageConfig = {
  slug: "car-key-replacement",
  parent: "locksmith",
  meta: {
    title: "Mobile Car Key Replacement in Portland, OR",
    description: "Lost your car key or need a spare in Portland? Call Alpha with your vehicle’s year, make, and model to confirm mobile replacement options.",
  },
  crumbs: { category: "Locksmith services", label: "Replacement Car Keys" },
  schema: {
    name: "Mobile car key replacement",
    description: "Lost your car key or need a spare in Portland? Call Alpha with your vehicle’s year, make, and model to confirm mobile replacement options.",
  },
  hero: {
    title: "Mobile Car Key Replacement in",
    accent: "Portland, OR",
    lead: "If you’ve lost your only car key, damaged a key, or want a spare, Alpha Locksmith & Garage can help with supported vehicles. We’ll confirm whether your replacement needs to be cut, programmed, or both before scheduling.",
    image: { src: "/work/gallery/locksmith-2.jpg", alt: "Car lockout service" },
  },
  info: {
    title: "Lost keys, spare keys, and damaged keys",
    body: "Tell us whether you still have a working key. Making a spare and replacing a key when all copies are missing can require different equipment. If the remote stopped responding but the physical key still works, let us know so we can identify the service you need.",
  },
  moreInfo: [
    {
      title: "What to have ready",
      body: "Have your vehicle’s year, make, and model handy. Tell us whether it uses a standard ignition or push-button start. We’ll confirm what we can provide for your vehicle and what proof of ownership to have available.",
    },
  ],
  related: [{ label: "Emergency Lockouts", slug: "emergency-lockout" }],
};

const commercialOverheadDoors: ServicePageConfig = {
  slug: "commercial-overhead-doors",
  parent: "garage-doors",
  meta: {
    title: "Commercial Overhead & Rolling Door Repair in Portland",
    description: "Commercial overhead and rolling door repair for Portland warehouses, retail stores, and loading areas. Service for manual and motorized doors.",
  },
  crumbs: { category: "Garage door services", label: "Commercial Overhead & Rolling Doors" },
  schema: {
    name: "Commercial overhead and rolling door repair",
    description: "Commercial overhead and rolling door repair for Portland warehouses, retail stores, and loading areas. Service for manual and motorized doors.",
  },
  hero: {
    title: "Commercial Overhead and Rolling Door Repair in",
    accent: "Portland",
    lead: "An overhead door that won’t open can interrupt deliveries. One that won’t close can leave a facility unsecured. We service commercial overhead and rolling doors at warehouses, retail locations, receiving areas, and other facilities throughout the Portland metro area.",
    image: { src: "/work/gallery/garage-doors-3.jpg", alt: "Commercial roll-up door" },
  },
  info: {
    title: "Service for manual and motorized doors",
    body: "We assess doors that bind, stop partway, or stay stuck open or closed. We inspect the door hardware and, on motorized doors, the operator to find what’s preventing normal operation.",
  },
  moreInfo: [
    {
      title: "What to include in your work order",
      body: "Send the site address, door number or location, and whether the opening is secure. Photos of the door and its manufacturer or operator label help us identify the equipment. Include delivery windows, site access instructions, and the name of the person who can approve the work.",
    },
  ],
  related: [{ label: "Storefront & Commercial Doors", slug: "storefront-door-repair" }],
};

const storefrontDoorRepair: ServicePageConfig = {
  slug: "storefront-door-repair",
  // PENDING CLIENT DECISION: the copy doc groups this page under garage and overhead doors, but
  // its label sits on the Access control page and the content is mostly locks and door hardware.
  parent: "garage-doors",
  meta: {
    title: "Commercial Storefront Door Repair in Portland, OR",
    description: "Portland storefront door repair for closers, hinges, locks, and panic bars. Get help with commercial doors that drag, slam, or won’t latch.",
  },
  crumbs: { category: "Garage door services", label: "Storefront & Commercial Doors" },
  schema: {
    name: "Storefront and commercial door repair",
    description: "Portland storefront door repair for closers, hinges, locks, and panic bars. Get help with commercial doors that drag, slam, or won’t latch.",
  },
  hero: {
    title: "Storefront and Commercial Door Repair in",
    accent: "Portland, OR",
    lead: "A storefront door that drags, slams, or fails to latch affects customers and staff all day. Alpha Locksmith & Garage repairs commercial entrances and back doors for retailers, offices, and property managers in the Portland metro area.",
    image: { src: "/work/job-door-hardware.jpg", alt: "Installing new door hardware" },
  },
  info: {
    title: "Door closers, hinges, locks, and panic bars",
    body: "We work on closers, hinges, pivots, locks, latches, and panic bars, also called exit devices. We check how the door swings, closes, and secures before recommending an adjustment, repair, or replacement. For example, when a door closes most of the way but won’t latch, we check how the latch lines up with the frame.",
  },
  moreInfo: [
    {
      title: "Service for property managers and facility teams",
      body: "Identify the opening when you submit a work order. Tell us whether it serves customers, employees, deliveries, or exit traffic and whether the door can close, latch, and lock. If the opening also needs glass work, include photos so we can confirm the scope.",
    },
  ],
  related: [
    { label: "Commercial Overhead & Rolling Doors", slug: "commercial-overhead-doors" },
    { label: "Access Control", slug: "access-control" },
  ],
};

const commercialGateMaintenance: ServicePageConfig = {
  slug: "commercial-gate-maintenance",
  parent: "automatic-gates",
  meta: {
    title: "Quarterly Commercial Gate Maintenance in Portland",
    description: "Schedule quarterly preventive maintenance for manual and automatic gates in Portland. Alpha checks operation, lubricates parts, and makes routine adjustments.",
  },
  crumbs: { category: "Automatic gates", label: "Commercial Gate Maintenance" },
  schema: {
    name: "Commercial gate maintenance",
    description: "Schedule quarterly preventive maintenance for manual and automatic gates in Portland. Alpha checks operation, lubricates parts, and makes routine adjustments.",
  },
  hero: {
    title: "Preventive Maintenance for Commercial Gates in",
    accent: "Portland",
    lead: "Gates at apartment communities, retail properties, and managed facilities may open and close throughout the day. Quarterly service gives your team a regular opportunity to address wear and recurring problems before they interrupt access.",
    image: { src: "/work/job-slat-gate.jpg", alt: "Black steel slat driveway gate installed by Alpha" },
  },
  info: {
    title: "What a maintenance visit includes",
    body: "We check how the gate opens and closes, lubricate applicable parts, and make routine adjustments. Tell us if staff have noticed unusual sounds, slower movement, or a gate that sometimes fails to close. If we find that a gate needs a repair or replacement part, we explain what we found and quote the work separately.",
  },
  moreInfo: [
    {
      title: "Get a quote for your property",
      body: "Send the property address, the number of gates, and whether each one operates manually or automatically. Let us know how often the gates are used and whether any have recurring issues.",
    },
  ],
  related: [{ label: "Automatic Gate Installation & Repair", slug: "automatic-gates" }],
};

/** Listed on /drafts in this order. */
export const draftPages: ServicePageConfig[] = [
  emergencyLockout,
  lockRekeying,
  lockRepair,
  carKeyReplacement,
  commercialOverheadDoors,
  storefrontDoorRepair,
  commercialGateMaintenance,
];

export const getDraft = (slug: string) => draftPages.find((p) => p.slug === slug);

/**
 * Pages the live site already names (plain-text related labels) but the client's copy doc has
 * no section for. Listed on /drafts under "Copy needed". Once copy arrives, build the page as a
 * draft above and remove it from here.
 */
export const copyNeeded: { label: string; parent: string; namedOn: string }[] = [
  {
    label: "Garage Door Opener Repair",
    parent: "garage-doors",
    namedOn: "Named on the Garage door spring repair page (“Garage door opener repair”) and the Garage doors page (“Opener repair”).",
  },
  {
    label: "Broken Cable Repair",
    parent: "garage-doors",
    namedOn: "Named on the Garage door spring repair page (“Broken cable repair”).",
  },
];

/**
 * Shown to the client on /drafts and in each page's draft banner: what the page covers and the
 * questions we need them to answer. Remove a question once the client has answered it.
 */
export const draftNotes: Record<string, { summary: string; questions?: string[] }> = {
  "emergency-lockout": {
    summary: "Mobile lockout help for cars, homes and businesses. Explains what to tell us and how to give your location.",
    questions: [
      "The title and main heading say “24/7”. Elsewhere the site hides 24/7 claims between 10pm and 6am. Should this page say 24/7 at all hours?",
      "This page promises “an estimated arrival time” when the customer calls, while the Locksmith page says “We’ll arrive between 20-35 minutes”. Which should both pages say?",
    ],
  },
  "lock-rekeying": {
    summary: "Changing which keys open existing locks after a move, a lost key or a tenant change. Also covers one key for several doors and what affects the cost.",
  },
  "lock-repair": {
    summary: "Sticking locks, binding deadbolts and latches that won’t catch. Explains why locks jam when the door is closed and when to replace a lock.",
  },
  "car-key-replacement": {
    summary: "Mobile car key cutting and programming for lost, spare or damaged keys. Lists the vehicle details to have ready.",
  },
  "commercial-overhead-doors": {
    summary: "Repair of manual and motorized overhead and rolling doors at warehouses and retail sites. Lists what to include in a work order.",
  },
  "storefront-door-repair": {
    summary: "Closers, hinges, locks and panic bars on storefront and back doors. Includes guidance for property managers and facility teams.",
    questions: [
      "Which service should this page sit under: Garage doors (as in the copy document), Access control, or Locksmith?",
    ],
  },
  "commercial-gate-maintenance": {
    summary: "Quarterly preventive maintenance for manual and automatic gates at apartments, retail and managed properties. Says what a visit includes and how to get a quote.",
  },
};

/** Links from a draft go to another draft if there is one, otherwise to the live page. */
export function draftLinkFor(citySlug: string, slug: string) {
  if (getDraft(slug)) return draftCities.includes(citySlug) ? draftPath(citySlug, slug) : undefined;
  return getServiceBySlug(slug) ? cityServicePath(citySlug, slug) : undefined;
}
