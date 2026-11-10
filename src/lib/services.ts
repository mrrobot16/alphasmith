import { site } from "./site";

/**
 * Content for every service page. All of them render through
 * components/ServicePage.tsx, so the structure is identical and only the copy
 * changes. Text in [square brackets] is placeholder copy that still needs real
 * information from the business (prices, warranty, arrival times, reviews).
 * Use **double asterisks** for bold inside `info.body`.
 */
export type ServicePageConfig = {
  path: string;
  meta: { title: string; description: string };
  crumbs: { category: string; label: string };
  schema: { name: string; description: string };
  hero: {
    badge: string;
    title: string;
    accent: string;
    lead: string;
    checks: string[];
    /** Large photo beside the hero text (file in /public). */
    image: { src: string; alt: string };
  };
  warning: { bold: string; text: string };
  signs: { title: string; items: string[] };
  info: { title: string; body: string; priceLabel: string; priceNote: string };
  steps: { title: string; items: [string, string, string][] };
  brands: { title: string; items: string[] };
  reviews: { text: string; by: string }[];
  faqs: { q: string; a: string }[];
  near: { title: string; intro: string };
  related: { label: string; href?: string }[];
};

const REVIEW_BY = "[First name L.] · [Town] · Google · [Month Year]";
const review = (job: string) => ({
  text: `[Real Google review about ${job}, in the customer's words.]`,
  by: REVIEW_BY,
});

const licensed = `Licensed and certified, ${site.license}`;
const quote = "Written quote before any work starts";

export const serviceAreas = [
  "Portland",
  "Wilsonville",
  "Beaverton",
  "Hillsboro",
  "Tigard",
  "Lake Oswego",
  "Gresham",
  "Oregon City",
  "Salem",
  "Vancouver metro area",
];

export const springRepair: ServicePageConfig = {
  path: "/garage-door-services/spring-repair",
  meta: {
    title: "Garage Door Spring Repair in Portland, OR",
    description:
      "Same-day garage door spring repair and replacement across the Portland metro. Written quote before work starts. Call 503-505-8560.",
  },
  crumbs: { category: "Garage door services", label: "Spring repair" },
  schema: {
    name: "Garage door spring repair",
    description: "Same-day garage door spring repair and replacement across the Portland metro.",
  },
  hero: {
    badge: "Same-day service · Open 24/7",
    title: "Garage door spring repair in",
    accent: "Portland, OR",
    lead: "Broken torsion or extension spring? We replace springs on residential and commercial garage doors across the Portland metro, usually the same day you call.",
    checks: [quote, licensed, "[Warranty: e.g. X-year warranty on springs and labor]"],
    image: { src: "/our-work-3.jpg", alt: "Alpha technician repairing a garage door spring and track" },
  },
  warning: {
    bold: "Spring broke? Don't force the door.",
    text: "Garage door springs hold hundreds of pounds of tension. Leave the door where it is, unplug the opener, and call us.",
  },
  signs: {
    title: "Signs your spring is broken",
    items: [
      "A loud bang from the garage, like a firecracker",
      "The door won't open, or the opener strains and stops",
      "A visible gap in the spring above the door",
      "The door feels very heavy when lifted by hand",
      "The door opens crooked or slams shut",
    ],
  },
  info: {
    title: "Torsion or extension?",
    body: "**Torsion springs** sit on a bar above the door. **Extension springs** run along the side tracks. We repair both, and we'll tell you which you have when you call.",
    priceLabel: "Spring replacement from [$XXX]",
    priceNote: "[What the price includes, e.g. parts, labor, tune-up. Final price confirmed in writing on site.]",
  },
  steps: {
    title: "How a spring repair works",
    items: [
      ["01", "Inspect", "We check the springs, cables, drums and rollers to find everything that's worn, not just the broken part."],
      ["02", "Written quote", "You get the price in writing before any work starts. No surprises."],
      ["03", "Replace", "Springs sized to your door's weight, installed and wound to spec. Cables replaced if frayed."],
      ["04", "Balance and test", "We balance the door, tune the opener, and test it with you before we leave."],
    ],
  },
  brands: {
    title: "Brands we work on",
    items: ["LiftMaster", "Chamberlain", "Genie", "Clopay", "Amarr", "Wayne Dalton", "Overhead Door", "[Other brands you service]"],
  },
  reviews: [
    review("a garage door spring replacement"),
    review("a same-day spring repair"),
    review("a commercial overhead door spring"),
  ],
  faqs: [
    { q: "How much does garage door spring repair cost?", a: "[Price range and what affects it: spring type, door size, parts and labor. Final price confirmed in writing before work starts.]" },
    { q: "Can you come today?", a: "[Same-day availability and typical arrival window.]" },
    { q: "Should I replace both springs?", a: "[Explain why springs are usually replaced in pairs.]" },
    { q: "Is it safe to open the door with a broken spring?", a: "No. Leave the door where it is, unplug the opener, and call us." },
    { q: "Do you offer a warranty?", a: "[Warranty terms for springs and labor.]" },
  ],
  near: {
    title: "Spring repair near you",
    intro: "Same-day garage door spring repair in these areas and more:",
  },
  related: [
    { label: "Garage door opener repair" },
    { label: "Broken cable repair" },
    { label: "Commercial overhead doors" },
  ],
};

export const locksmith: ServicePageConfig = {
  path: "/locksmith-services",
  meta: {
    title: "Locksmith Services in Portland, OR",
    description:
      "Licensed Portland locksmith for lockouts, rekeying, lock changes and car keys, day or night. Written quote before work starts. Call 503-505-8560.",
  },
  crumbs: { category: "Services", label: "Locksmith" },
  schema: {
    name: "Locksmith services",
    description: "Lockouts, lock changes, rekeying, lock repair, storefront doors and auto keys across the Portland metro.",
  },
  hero: {
    badge: "Open 24/7 · Licensed locksmith",
    title: "Locksmith services in",
    accent: "Portland, OR",
    lead: "Locked out, lost your keys, or need your locks changed? Our licensed locksmiths handle homes, businesses and vehicles across the Portland metro, day or night.",
    checks: [quote, licensed, "[Typical arrival time, e.g. 30 to 45 minutes]"],
    image: { src: "/our-work-4.jpg", alt: "Locksmith installing a lock on a front door" },
  },
  warning: {
    bold: "Locked out? Don't force the lock.",
    text: "Prying or drilling a lock that can still be saved only makes the repair bigger. Call us and we'll get you in with as little damage as possible.",
  },
  signs: {
    title: "Signs you need a locksmith",
    items: [
      "You're locked out of your home, car or business",
      "A key is stuck, broken off, or won't turn",
      "The lock feels loose, sticky or keeps jamming",
      "You've lost keys, or someone you don't trust has a copy",
      "You just moved in and don't know who else has keys",
      "A break-in damaged your door or lock",
    ],
  },
  info: {
    title: "Rekey or replace?",
    body: "**Rekeying** changes the lock so old keys stop working, and you keep the hardware you already have. **Replacing** is the right call when a lock is damaged, worn out, or you want a higher-security model. Not sure? Call us and we'll recommend the simpler option.",
    priceLabel: "Lockout service from [$XXX]",
    priceNote: "[What the price includes, e.g. service call, labor, parts. Final price confirmed in writing before work starts.]",
  },
  steps: {
    title: "How a locksmith call works",
    items: [
      ["01", "Call", "Tell us where you are and what's going on, and we'll confirm what we can do and when we can get there."],
      ["02", "Written quote", "You get the price in writing before any work starts. No surprises."],
      ["03", "Open or fix", "We get you in, or rekey, repair or replace the lock with hardware that suits your door."],
      ["04", "Test and cut keys", "We test every lock with you and cut new keys before we leave."],
    ],
  },
  brands: {
    title: "Lock brands we work on",
    items: ["Schlage", "Kwikset", "Yale", "Medeco", "Baldwin", "[Other brands you service]"],
  },
  reviews: [
    review("an emergency home lockout"),
    review("rekeying locks after a move"),
    review("a car key replacement"),
  ],
  faqs: [
    { q: "How much does a locksmith cost?", a: "[Price range and what affects it: time of day, lock type, parts and labor. Final price confirmed in writing before work starts.]" },
    { q: "How fast can you get here?", a: "[Typical arrival window and 24/7 availability.]" },
    { q: "Will you damage my lock to get me in?", a: "We open locks without damaging them whenever we can. If a lock has to be drilled or replaced, we tell you first and quote the price in writing." },
    { q: "Can you make keys for my car?", a: "[Which vehicles and key types you cover, including fobs and transponder keys.]" },
    { q: "Do you offer a warranty?", a: "[Warranty terms for locks and labor.]" },
  ],
  near: {
    title: "Locksmith service near you",
    intro: "Locksmith service in these areas and more:",
  },
  related: [
    { label: "Access control systems", href: "/access-control-services" },
    { label: "Automatic gates", href: "/automatic-gate-services" },
    { label: "Car lockout service" },
    { label: "Key cutting" },
  ],
};

export const automaticGates: ServicePageConfig = {
  path: "/automatic-gate-services",
  meta: {
    title: "Automatic Gate Repair in Portland, OR",
    description:
      "Automatic driveway and commercial gate repair and installation across the Portland metro. Written quote before work starts. Call 503-505-8560.",
  },
  crumbs: { category: "Services", label: "Automatic gates" },
  schema: {
    name: "Automatic gate repair and installation",
    description: "Driveway and commercial automatic gate repair and installation across the Portland metro.",
  },
  hero: {
    badge: "Open 24/7 · Gate repair",
    title: "Automatic gate repair in",
    accent: "Portland, OR",
    lead: "Gate stuck, opener dead, or ready for a new driveway gate? We repair and install automatic gates for homes and businesses across the Portland metro.",
    checks: [quote, licensed, "[Warranty: e.g. X-year warranty on gate openers and labor]"],
    image: { src: "/work/wood-driveway-gate.jpg", alt: "Wood automatic driveway gate installed by Alpha" },
  },
  warning: {
    bold: "Gate stuck or not closing? Keep people and pets clear.",
    text: "Automatic gates can move with a lot of force. Don't push or pry a jammed gate. Call us, and use the manual release only if you know how.",
  },
  signs: {
    title: "Signs your gate needs repair",
    items: [
      "The gate stops, stalls or reverses partway",
      "It opens or closes slowly, or makes grinding noises",
      "The remote or keypad works some days and not others",
      "The gate sags, drags on the ground or won't latch",
      "It won't respond after a power outage or storm",
    ],
  },
  info: {
    title: "Swing or slide?",
    body: "**Swing gates** open like a door on hinges and suit driveways with room in front of the gate. **Slide gates** roll along the fence line and suit tight or sloped driveways. We repair and install both, and we'll help you choose the right type.",
    priceLabel: "Gate repair from [$XXX]",
    priceNote: "[What the price includes, e.g. diagnosis, parts, labor. Final price confirmed in writing before work starts.]",
  },
  steps: {
    title: "How a gate repair works",
    items: [
      ["01", "Inspect", "We check the opener, motor, sensors, hinges or track, and wiring to find the real cause."],
      ["02", "Written quote", "You get the price in writing before any work starts. No surprises."],
      ["03", "Repair", "We repair or replace worn parts, then reset the limits and safety sensors."],
      ["04", "Test", "We run the gate through full cycles and test the remotes and keypad with you."],
    ],
  },
  brands: {
    title: "Gate opener brands we work on",
    items: ["LiftMaster", "Chamberlain", "Viking Access", "FAAC", "Nice", "[Other brands you service]"],
  },
  reviews: [
    review("a driveway gate repair"),
    review("a gate opener replacement"),
    review("a new automatic gate install"),
  ],
  faqs: [
    { q: "How much does automatic gate repair cost?", a: "[Price range and what affects it: opener type, gate size, parts and labor. Final price confirmed in writing before work starts.]" },
    { q: "Can you come today?", a: "[Same-day availability and typical arrival window.]" },
    { q: "My gate won't move after a power outage. What do I do?", a: "Many gates have a manual release for outages. Check your owner's manual, and call us if the gate still won't move once power is back." },
    { q: "Can you install a new automatic gate?", a: "[Gate types, materials and openers you install, and how long a typical install takes.]" },
    { q: "Do you offer a warranty?", a: "[Warranty terms for gate openers and labor.]" },
  ],
  near: {
    title: "Gate repair near you",
    intro: "Automatic gate repair and installation in these areas and more:",
  },
  related: [
    { label: "Fence repair and installation", href: "/fence-services" },
    { label: "Access control systems", href: "/access-control-services" },
    { label: "Locksmith services", href: "/locksmith-services" },
    { label: "Gate opener replacement" },
    { label: "Keypad and intercom" },
  ],
};

export const accessControl: ServicePageConfig = {
  path: "/access-control-services",
  meta: {
    title: "Access Control Systems in Portland, OR",
    description:
      "Keycard, fob, keypad and intercom access control installed and repaired for Portland businesses and properties. Call 503-505-8560.",
  },
  crumbs: { category: "Services", label: "Access control" },
  schema: {
    name: "Access control systems",
    description: "Keycard and fob entry, keypad and intercom systems, gate access control and panic hardware across the Portland metro.",
  },
  hero: {
    badge: "Open 24/7 · Commercial & residential",
    title: "Access control systems in",
    accent: "Portland, OR",
    lead: "Keycards, fobs, keypads and intercoms that decide who gets in and when. We install, repair and rekey access control for businesses, offices, gated properties and multi-unit buildings.",
    checks: [quote, licensed, "[Warranty: e.g. X-year warranty on equipment and labor]"],
    image: { src: "/work/gate-video-intercom.jpg", alt: "Video intercom and keypad entry at a gate" },
  },
  warning: {
    bold: "Locked out or system down? Call us any time.",
    text: "A failed reader or a lost admin code shouldn't keep your people out. We handle urgent access control problems day or night.",
  },
  signs: {
    title: "Signs your access system needs work",
    items: [
      "Keycards or fobs read slowly or not at all",
      "A door doesn't latch or release when it should",
      "Former employees or tenants still have working access",
      "The keypad code hasn't changed in years, or is shared too widely",
      "The intercom doesn't connect or has lost audio",
      "The system is old and can't add or remove users easily",
    ],
  },
  info: {
    title: "Which system fits?",
    body: "**Keypad and keycard** systems suit offices and small buildings. **Fob and proximity readers** suit larger sites with many users. **Intercom and video entry** suit gates and multi-unit buildings. We install and service them all, and we'll help you choose.",
    priceLabel: "System installation from [$XXX per door]",
    priceNote: "[What the price includes, e.g. reader, lock hardware, programming. Final price confirmed in writing before work starts.]",
  },
  steps: {
    title: "How an access control job works",
    items: [
      ["01", "Assess", "We look at your doors, gates and how people use them, then recommend a system that fits."],
      ["02", "Written quote", "You get the price in writing before any work starts. No surprises."],
      ["03", "Install", "We mount the readers, locks and controllers, and connect them to power and your doors."],
      ["04", "Set up and train", "We program users and schedules, and show you how to add or remove access yourself."],
    ],
  },
  brands: {
    title: "Equipment we install and service",
    items: ["Keypads", "Keycard readers", "Key fobs", "Intercoms", "Video entry", "Panic hardware", "Electric strikes", "[Other equipment you service]"],
  },
  reviews: [
    review("a keycard entry system install"),
    review("a gate keypad and intercom repair"),
    review("an access control system for an office"),
  ],
  faqs: [
    { q: "How much does an access control system cost?", a: "[Price range and what affects it: number of doors, reader type, wiring and programming. Final price confirmed in writing before work starts.]" },
    { q: "Can you add access control to our existing doors?", a: "[Which doors and locks you can retrofit, and what to expect.]" },
    { q: "Can we manage who has access ourselves?", a: "[Explain how users are added, removed and scheduled after setup.]" },
    { q: "Can you repair a system someone else installed?", a: "[Which systems and brands you can service.]" },
    { q: "Do you offer a warranty?", a: "[Warranty terms for equipment and labor.]" },
  ],
  near: {
    title: "Access control near you",
    intro: "Access control installation and repair in these areas and more:",
  },
  related: [
    { label: "Locksmith services", href: "/locksmith-services" },
    { label: "Automatic gates", href: "/automatic-gate-services" },
    { label: "Commercial rekeying" },
    { label: "Panic bars" },
  ],
};

export const fencing: ServicePageConfig = {
  path: "/fence-services",
  meta: {
    title: "Fence Repair & Installation, Portland OR",
    description:
      "Fence repair and installation for Portland homes and businesses: chain-link, wood and metal. Written quote before work starts. Call 503-505-8560.",
  },
  crumbs: { category: "Services", label: "Fencing" },
  schema: {
    name: "Fence repair and installation",
    description: "Fence repair and installation for homes and businesses across the Portland metro.",
  },
  hero: {
    badge: "Repair & installation · Open 24/7",
    title: "Fence repair & installation in",
    accent: "Portland, OR",
    lead: "Storm damage, leaning posts or a brand-new fence line? We repair and install fences and gates for homes and businesses across the Portland metro.",
    checks: [quote, licensed, "[Warranty: e.g. X-year warranty on materials and labor]"],
    image: { src: "/our-work-2.jpg", alt: "Alpha technician installing a metal fence" },
  },
  warning: {
    bold: "Fence down after a storm? Secure the area first.",
    text: "Keep kids and pets away from broken panels, exposed nails and wire, then call us. We can make it safe and quote the repair.",
  },
  signs: {
    title: "Signs your fence needs repair",
    items: [
      "Posts lean, wobble or have rotted at the base",
      "Panels or boards are missing, loose or split",
      "Chain-link is cut, sagging or pulling away from the posts",
      "A gate drags, sags or won't latch",
      "A storm or a vehicle damaged a section",
      "Rust or rot is spreading along the fence line",
    ],
  },
  info: {
    title: "Which fence fits?",
    body: "**Chain-link** is durable and budget friendly, and works for yards and commercial lots. **Wood** gives privacy and a classic look. **Metal and ornamental** fencing suits security and curb appeal. Tell us what you need and we'll recommend what holds up in Portland's wet weather.",
    priceLabel: "Fence repair from [$XXX]",
    priceNote: "[What the price includes, e.g. materials, labor, haul-away. Final price confirmed in writing before work starts.]",
  },
  steps: {
    title: "How a fence job works",
    items: [
      ["01", "Inspect", "We walk the fence line, check the posts, panels and gates, and measure what needs to be repaired or built."],
      ["02", "Written quote", "You get the price in writing before any work starts. No surprises."],
      ["03", "Repair or install", "We replace damaged sections or build the new fence, set straight and secure."],
      ["04", "Walk-through", "We check the finished work with you and clean up before we leave."],
    ],
  },
  brands: {
    title: "Fence types we work with",
    items: ["Chain-link", "Wood", "Metal and ornamental", "Privacy fencing", "Fence gates", "[Other types you install]"],
  },
  reviews: [
    review("a fence repair after a storm"),
    review("a new chain-link fence"),
    review("a metal fence installation"),
  ],
  faqs: [
    { q: "How much does fence repair cost?", a: "[Price range and what affects it: fence type, length, materials and labor. Final price confirmed in writing before work starts.]" },
    { q: "Can you come out to give a quote?", a: "[How quotes work: on-site visit, photos, and typical timing.]" },
    { q: "Can you repair just one section?", a: "[Explain when a repair makes sense and when a full replacement is better.]" },
    { q: "Do you install fence gates?", a: "[Gate types you install, including automatic gates.]" },
    { q: "Do you offer a warranty?", a: "[Warranty terms for materials and labor.]" },
  ],
  near: {
    title: "Fence service near you",
    intro: "Fence repair and installation in these areas and more:",
  },
  related: [
    { label: "Automatic gates", href: "/automatic-gate-services" },
    { label: "Access control systems", href: "/access-control-services" },
    { label: "Chain-link fence" },
    { label: "Metal fence installation" },
  ],
};

export const servicePages = [springRepair, locksmith, automaticGates, accessControl, fencing];
