import { site } from "./site";
import type { City } from "./cities";

/**
 * Content for every service page. All of them render through
 * components/ServicePage.tsx, so the structure is identical and only the copy
 * changes. Business facts we do not have yet (prices, warranty terms, arrival times)
 * are not stated as numbers: the copy points to the written quote instead.
 * Use **double asterisks** for bold inside `info.body`.
 */
export type ServicePageConfig = {
  /** Last part of /locations/[city]/service/[service]. */
  slug: string;
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
  info: { title: string; body: string };
  steps: { title: string; items: [string, string, string][] };
  brands: { title: string; items: string[] };
  faqs: { q: string; a: string }[];
  near: { title: string; intro: string };
  /** slug links to another service page in the same city. */
  related: { label: string; slug?: string }[];
};

const licensed = `Licensed and certified, ${site.license}`;
const quote = "Written quote before any work starts";


export const springRepair: ServicePageConfig = {
  slug: "garage-door-spring-repair",
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
    checks: [quote, licensed, "Residential and commercial doors"],
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
    items: ["LiftMaster", "Chamberlain", "Genie", "Clopay", "Amarr", "Wayne Dalton", "Overhead Door"],
  },
  faqs: [
    { q: "How much does garage door spring repair cost?", a: "The price depends on the type of spring (torsion or extension), the size and weight of your door, and whether one or both springs and the cables need replacing. You get the price in writing before any work starts." },
    { q: "Can you come today?", a: "Call us any time, day or night. We answer 24/7 and give you an arrival time when you call, based on where our team is and what the job needs." },
    { q: "Should I replace both springs?", a: "Springs wear at about the same rate, so when one breaks the other is usually close behind. Replacing both keeps the door balanced and saves a second visit. We'll show you the condition of the second spring and let you decide." },
    { q: "Is it safe to open the door with a broken spring?", a: "No. Leave the door where it is, unplug the opener, and call us." },
    { q: "Do you offer a warranty?", a: "Ask us about warranty coverage when you call. We'll explain what applies to the parts and labor on your job before work starts." },
  ],
  near: {
    title: "Spring repair near you",
    intro: "Same-day garage door spring repair in these areas and more:",
  },
  related: [
    { label: "All garage door services", slug: "garage-doors" },
    { label: "Garage door opener repair" },
    { label: "Broken cable repair" },
    { label: "Commercial overhead doors" },
  ],
};

export const garageDoors: ServicePageConfig = {
  slug: "garage-doors",
  meta: {
    title: "Garage Door Repair & Installation in Portland, OR",
    description:
      "Garage door repair, springs, cables, openers, panels and new door installation across the Portland metro. Written quote before work starts. Call 503-505-8560.",
  },
  crumbs: { category: "Services", label: "Garage doors" },
  schema: {
    name: "Garage door repair and installation",
    description: "Garage door repair, spring and cable replacement, opener service, panel replacement and new door installation across the Portland metro.",
  },
  hero: {
    badge: "Open 24/7 · Residential & commercial",
    title: "Garage door repair & installation in",
    accent: "Portland, OR",
    lead: "Door off track, opener dead, or ready for a new door? We repair and install residential and commercial garage doors across the Portland metro, day or night.",
    checks: [quote, licensed, "Residential and commercial doors"],
    image: { src: "/work/job-overhead-door.jpg", alt: "Alpha technician working on an overhead garage door" },
  },
  warning: {
    bold: "Door stuck or off track? Don't force it.",
    text: "Garage doors are heavy and the springs are under tension. Leave the door where it is, unplug the opener, and call us.",
  },
  signs: {
    title: "Signs your garage door needs service",
    items: [
      "The door won't open or close, or stops partway",
      "A loud bang, grinding or scraping when it moves",
      "The door is crooked, sagging or off its track",
      "The opener hums but the door doesn't move",
      "A dented or cracked panel after an impact",
      "The door reverses for no reason or won't stay closed",
    ],
  },
  info: {
    title: "Repair or replace?",
    body: "Most problems, such as **springs, cables, rollers and openers**, can be repaired in one visit. A **new door** makes sense when several panels are damaged, the door is very old, or you want better insulation, security or curb appeal. We'll tell you which makes sense before you spend anything.",
  },
  steps: {
    title: "How a garage door call works",
    items: [
      ["01", "Inspect", "We check the springs, cables, tracks, rollers and opener to find everything that's worn, not just what's broken."],
      ["02", "Written quote", "You get the price in writing before any work starts. No surprises."],
      ["03", "Repair or install", "We repair or replace the parts, or install the new door, with hardware sized to your door."],
      ["04", "Balance and test", "We balance the door, tune the opener and safety sensors, and test it with you before we leave."],
    ],
  },
  brands: {
    title: "Brands we work on",
    items: ["LiftMaster", "Chamberlain", "Genie", "Clopay", "Amarr", "Wayne Dalton", "Overhead Door"],
  },
  faqs: [
    { q: "How much does garage door repair cost?", a: "It depends on what failed. A roller, sensor or remote is a small repair, while springs, cables, a motor or a damaged panel cost more, and a new door costs more again. Door size and parts matter too. You get the price in writing before work starts." },
    { q: "Can you come today?", a: "Call us any time, day or night. We answer 24/7 and give you an arrival time when you call, based on where our team is and what the job needs." },
    { q: "Should I repair or replace my garage door?", a: "Repair is usually the better value when the problem is one part, such as a spring, cable, roller or opener. Replacement makes sense when several panels are damaged, the door is badly worn or no longer closes square, or you want better insulation or security. We'll look at the door and tell you which is the better value." },
    { q: "Do you install new garage doors?", a: "Yes. We install new residential and commercial garage doors. Tell us the size of the opening and the style you like, and we'll quote it in writing before work starts." },
    { q: "Do you offer a warranty?", a: "Ask us about warranty coverage when you call. We'll explain what applies to the parts and labor on your job before work starts." },
  ],
  near: {
    title: "Garage door service near you",
    intro: "Garage door repair and installation in these areas and more:",
  },
  related: [
    { label: "Spring repair", slug: "garage-door-spring-repair" },
    { label: "Automatic gates", slug: "automatic-gates" },
    { label: "Locksmith services", slug: "locksmith" },
    { label: "Opener repair" },
    { label: "Commercial overhead doors" },
  ],
};

export const locksmith: ServicePageConfig = {
  slug: "locksmith",
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
    checks: [quote, licensed, "Homes, businesses and vehicles"],
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
    items: ["Schlage", "Kwikset", "Yale", "Medeco", "Baldwin"],
  },
  faqs: [
    { q: "Should I rekey or replace my locks after moving in?", a: "Rekeying is a good option when your locks work properly and you want old keys to stop working. You keep the existing hardware and get new keys. Replacement makes sense when the lock is damaged, worn out, or you want to upgrade to different hardware." },
    { q: "How much does it cost to rekey a house in Portland?", a: "The price depends on the number and type of locks and how many new keys you need. If you want one key to open several doors, tell us when you call so we can check whether your locks are compatible and quote the job." },
    { q: "Can you make a replacement car key if I lost my only key?", a: "Yes. We offer mobile car key replacement for supported vehicles, including some cases where all keys are lost. Call with your vehicle’s year, make, and model so we can confirm whether we can cut or program a replacement." },
    { q: "Can you repair a lock that sticks or won’t turn?", a: "Yes. A sticking lock may come from a worn key, a problem inside the lock cylinder, or a door that no longer lines up properly. We check the lock and door together and explain whether an adjustment, repair, or replacement makes sense." },
    { q: "Can you rekey my business after an employee leaves or a tenant moves out?", a: "Yes. We rekey commercial locks for businesses and property managers. Tell us which doors need new keys and which entrances should share a key so we can plan the work around your property’s access needs." },
  ],
  near: {
    title: "Locksmith service near you",
    intro: "Locksmith service in these areas and more:",
  },
  related: [
    { label: "Access control systems", slug: "access-control" },
    { label: "Automatic gates", slug: "automatic-gates" },
    { label: "Car lockout service" },
    { label: "Key cutting" },
  ],
};

export const automaticGates: ServicePageConfig = {
  slug: "automatic-gates",
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
    checks: [quote, licensed, "Driveway and commercial gates"],
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
    items: ["LiftMaster", "Chamberlain", "Viking Access", "FAAC", "Nice"],
  },
  faqs: [
    { q: "How much does automatic gate repair cost?", a: "The price depends on the type of gate (swing or slide), the opener, the size of the gate, and which parts are worn. A sensor or remote is a small repair, while a motor or a new gate costs more. You get the price in writing before work starts." },
    { q: "Can you come today?", a: "Call us any time, day or night. We answer 24/7 and give you an arrival time when you call, based on where our team is and what the job needs." },
    { q: "My gate won't move after a power outage. What do I do?", a: "Many gates have a manual release for outages. Check your owner's manual, and call us if the gate still won't move once power is back." },
    { q: "Can you install a new automatic gate?", a: "Yes. We install automatic gates and openers for homes and businesses. Tell us the width of the opening and the style you want, and we'll quote it in writing before work starts." },
    { q: "Do you offer a warranty?", a: "Ask us about warranty coverage when you call. We'll explain what applies to the parts and labor on your job before work starts." },
  ],
  near: {
    title: "Gate repair near you",
    intro: "Automatic gate repair and installation in these areas and more:",
  },
  related: [
    { label: "Fence repair and installation", slug: "fencing" },
    { label: "Access control systems", slug: "access-control" },
    { label: "Locksmith services", slug: "locksmith" },
    { label: "Gate opener replacement" },
    { label: "Keypad and intercom" },
  ],
};

export const accessControl: ServicePageConfig = {
  slug: "access-control",
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
    checks: [quote, licensed, "Businesses, offices and gated properties"],
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
    items: ["Keypads", "Keycard readers", "Key fobs", "Intercoms", "Video entry", "Panic hardware", "Electric strikes"],
  },
  faqs: [
    { q: "How much does an access control system cost?", a: "The price depends on the number of doors, the type of reader (keypad, card, fob or intercom), the wiring and the programming. We look at your doors first, then give you the price in writing before work starts." },
    { q: "Can you add access control to our existing doors?", a: "Often, yes. A reader and electric lock can usually be added to an existing door, depending on the door, the frame and the lock that's already there. We check the door first and tell you what's possible before we quote." },
    { q: "Can we manage who has access ourselves?", a: "Yes. After setup we show you how to add or remove users and change schedules yourself, so you don't need a service call every time someone joins or leaves." },
    { q: "Can you repair a system someone else installed?", a: "Tell us the brand and model when you call and we'll say whether we can service it. If it's too old or locked to one vendor, we'll tell you and suggest your options." },
    { q: "Do you offer a warranty?", a: "Ask us about warranty coverage when you call. We'll explain what applies to the parts and labor on your job before work starts." },
  ],
  near: {
    title: "Access control near you",
    intro: "Access control installation and repair in these areas and more:",
  },
  related: [
    { label: "Locksmith services", slug: "locksmith" },
    { label: "Automatic gates", slug: "automatic-gates" },
    { label: "Commercial rekeying" },
    { label: "Panic bars" },
  ],
};

export const fencing: ServicePageConfig = {
  slug: "fencing",
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
    checks: [quote, licensed, "Chain-link, wood and metal fences"],
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
    items: ["Chain-link", "Wood", "Metal and ornamental", "Privacy fencing", "Fence gates"],
  },
  faqs: [
    { q: "How much does fence repair cost?", a: "The price depends on the fence type (chain-link, wood or metal), the length and height, the condition of the posts, and whether it's a repair or a new installation. You get the price in writing before work starts." },
    { q: "Can you come out to give a quote?", a: "Call us and describe the fence or the damage. We'll tell you whether we need to see it in person, and give you the price in writing before work starts." },
    { q: "Can you repair just one section?", a: "Often, yes. A few damaged boards, a panel or a single post can usually be fixed on their own. If the posts are rotted or leaning along a long run, replacing that stretch is usually the better value, and we'll tell you which applies." },
    { q: "Do you install fence gates?", a: "Yes. We install and repair fence gates, including automatic gates. See our automatic gate services for opener options." },
    { q: "Do you offer a warranty?", a: "Ask us about warranty coverage when you call. We'll explain what applies to the parts and labor on your job before work starts." },
  ],
  near: {
    title: "Fence service near you",
    intro: "Fence repair and installation in these areas and more:",
  },
  related: [
    { label: "Automatic gates", slug: "automatic-gates" },
    { label: "Access control systems", slug: "access-control" },
    { label: "Chain-link fence" },
    { label: "Metal fence installation" },
  ],
};

export const servicePages = [locksmith, garageDoors, springRepair, automaticGates, accessControl, fencing];

/** Card shown on city pages: one per service page. */
export const serviceCards = [
  { slug: "locksmith", icon: "key", title: "Locksmith services", cta: "Locksmith", body: "Emergency lockout service, lock change, lock rekey, lock repairs, storefront doors and auto keys." },
  { slug: "garage-doors", icon: "garage", title: "Garage door services", cta: "Garage door", body: "Door repair, cables, panels and motor operators, plus new door installation." },
  { slug: "garage-door-spring-repair", icon: "garage", title: "Garage door spring repair", cta: "Spring repair", body: "Broken torsion or extension springs replaced, usually the same day." },
  { slug: "automatic-gates", icon: "gate", title: "Automatic gates", cta: "Automatic gate", body: "Driveway and commercial gate repair and installation." },
  { slug: "fencing", icon: "gate", title: "Fence repair and installation", cta: "Fence", body: "Chain-link, wood and metal fence repair and installation for homes and businesses." },
  { slug: "access-control", icon: "access", title: "Access control systems", cta: "Access control", body: "Keycard and fob entry, keypad and intercom systems, and panic hardware." },
] as const;

export const getServiceBySlug = (slug: string) => servicePages.find((s) => s.slug === slug);

/** /locations/[city]/service/[service] */
export const cityServicePath = (citySlug: string, serviceSlug: string) => `/locations/${citySlug}/service/${serviceSlug}`;

/** The same page with the Portland wording swapped for the given city. */
export function localizeService(c: ServicePageConfig, city: City): ServicePageConfig {
  const place = `${city.name}, ${city.state}`;
  const fix = (t: string) =>
    t
      .replaceAll("Portland, OR", place)
      .replaceAll("Portland OR", `${city.name} ${city.state}`)
      .replaceAll("across the Portland metro", `in ${city.name} and nearby areas`)
      .replaceAll("the Portland metro", `${city.name} and nearby areas`)
      .replaceAll("Portland", city.name);
  const SKIP = new Set(["slug", "path", "href", "src"]);
  const walk = (v: unknown): unknown =>
    typeof v === "string"
      ? fix(v)
      : Array.isArray(v)
        ? v.map(walk)
        : v && typeof v === "object"
          ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, SKIP.has(k) ? x : walk(x)]))
          : v;
  return walk(c) as ServicePageConfig;
}
