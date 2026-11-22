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
    /** Replaces `badge` from 10pm to 6am Portland time (lib/hours.ts). */
    badgeAfterHours: string;
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
  /** Extra blocks stacked under `info` in the same column. */
  moreInfo?: { title: string; body: string }[];
  /** `intro` is an optional paragraph between the heading and the steps. */
  steps: { title: string; intro?: string; items: [string, string, string][] };
  brands: { title: string; items: string[] };
  /** `afterHours` swaps the answer from 10pm to 6am; `null` hides the question then. */
  faqs: { q: string; a: string; afterHours?: string | null }[];
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
    badgeAfterHours: "Same-day service",
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
    { q: "Can you come today?", a: "Call us any time, day or night. We answer 24/7 and give you an arrival time when you call, based on where our team is and what the job needs.", afterHours: "Call us and we'll give you an arrival time when you call, based on where our team is and what the job needs." },
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
    badgeAfterHours: "Residential & commercial",
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
    { q: "Do you repair residential or commercial garage doors in Portland?", a: "Yes. We repair both residential and commercial garage doors and openers throughout the Portland metro area. Common service calls include broken springs, damaged cables, bent or broken doors/panels, doors that won’t close, and openers that stop responding." },
    { q: "Do you repair commercial overhead and rolling doors?", a: "Yes. We service commercial overhead and rolling doors for retail locations, warehouses, and other facilities. When you call, tell us the door type, whether it operates manually or with a motor, and whether it’s stuck open or closed." },
    { q: "Why does my garage door opener run without moving the door?", a: "The door may be disconnected from the opener, or an opener component may have failed. A spring or cable problem can also affect how the door moves. We inspect the door and opener to identify which part needs attention." },
    { q: "How much does garage door repair cost?", a: "The cost depends on the type and size of the door, the part that needs repair, and the labor involved. A photo of the door and the opener model can help us identify the equipment. We explain the work and quote it before starting." },
    { q: "Can you replace my garage door opener without replacing the door?", a: "Often, yes. If the door is in good condition and compatible with the new opener, we can replace the opener while keeping the existing door. We check how the door operates and identify any repairs it needs before recommending an opener." },
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
    title: "Portland Locksmith Services",
    description:
      "Alpha provides mobile locksmith services in Portland for homes, businesses, and vehicles. Get help with lockouts, rekeying, lock repairs, and lock changes.",
  },
  crumbs: { category: "Services", label: "Locksmith" },
  schema: {
    name: "Locksmith services",
    description: "Lockouts, lock changes, rekeying, lock repair, storefront doors and auto keys across the Portland metro.",
  },
  hero: {
    badge: "Open 24/7 · Licensed locksmith",
    badgeAfterHours: "Licensed locksmith",
    title: "Locksmith services in",
    accent: "Portland, OR",
    lead: "Alpha Locksmith & Garage provides mobile locksmith service for homes, businesses, and vehicles throughout the Portland metro and surrounding areas. Whether you’re moving into a new home, managing keys for a business, or dealing with a lock that keeps jamming, our licensed team comes to your location.",
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
    title: "Locksmith services for homes and businesses",
    body: "We repair, replace, and rekey locks on exterior doors, employee entrances, stockrooms, and rental properties. If several doors need attention, tell us which doors should use the same key and which need separate access. We can check which locks are compatible and which need repair or replacement.",
  },
  // PENDING CLIENT DECISION: "24/7" shows at all hours here; it is not covered by the
  // after-hours swap in lib/hours.ts.
  moreInfo: [
    {
      title: "Help with lockouts and replacement car keys",
      body: "We answer emergency lockout calls 24/7 and offer mobile car key replacement for supported vehicles. Tell us your location and what happened so we can confirm the service you need.",
    },
  ],
  steps: {
    title: "How a locksmith call works",
    // PENDING CLIENT DECISION: the 20-35 minute arrival window is unconfirmed.
    intro: "Tell us what the lock or door is doing. A key that turns with the door open but sticks when it’s closed can help us identify a possible alignment issue. We’ll arrive between 20-35 minutes and inspect the hardware, explain our recommendation, and provide a quote before starting.",
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
    // No pages yet for these four; add a slug to each as its page goes live.
    { label: "Emergency Lockouts" },
    { label: "Lock Rekeying" },
    { label: "Lock Repair & Replacement" },
    { label: "Replacement Car Keys" },
    { label: "Access control systems", slug: "access-control" },
    { label: "Automatic gates", slug: "automatic-gates" },
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
    badgeAfterHours: "Gate repair",
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
    { q: "Do you install and repair automatic gates in the Portland metro and surrounding areas?", a: "Yes. We install and repair automatic driveway gates and commercial gates, including sliding and swing gates. Tell us whether you need service for an existing gate or want a quote for a new installation. We will make an appointment to visit your desired project location, we will take measurements and check the whole area to provide a quote." },
    { q: "Why won’t my automatic gate open or close?", a: "The issue may be with the power supply, gate operator, safety sensors, access controls, or gate hardware. Tell us whether the gate responds to its controls, makes a sound, or stops partway. Those details help us narrow down the problem. We can do a visit to do an assessment and determine the solution." },
    { q: "Can you automate an existing manual driveway gate?", a: "Some manual gates can be fitted with an automatic operator. We assess the gate’s condition, how it moves, and the space and power available before recommending equipment or modifications." },
    { q: "Should I repair or replace my gate operator?", a: "Repair may make sense when the problem is isolated and replacement parts are available. Replacement may be a better option if the operator has repeated failures or parts are difficult to source. We also check the gate itself so a hardware issue doesn’t get mistaken for a bad motor." },
    { q: "Do you offer preventive maintenance for commercial gates?", a: "Yes. We offer quarterly maintenance for manual and automatic gates. We check how the gate operates, lubricate applicable parts, and make routine adjustments. If parts or additional repairs are needed, we quote those separately." },
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
    badgeAfterHours: "Commercial & residential",
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
    { q: "Do you install and repair access control systems in Portland?", a: "Yes. We install and repair access control systems for businesses, apartment communities, and gated properties in the Portland metro and surrounding areas. We work with keypads, key cards, fobs, and intercoms for doors and gates." },
    { q: "Can you add keyless entry to an existing commercial door?", a: "Many commercial doors can be upgraded with a keypad or card reader. We look at the door, frame, lock, and existing wiring to determine what can be reused and which hardware the upgrade requires." },
    { q: "Can you fix a card reader or keypad that works but won’t unlock the door?", a: "Yes. A reader can respond to a card or code even when the door fails to release. We check the reader, power supply, wiring, and locking hardware to find where the problem starts." },
    { q: "Can you connect an automatic gate to a keypad, fob reader, or intercom?", a: "Yes, when the equipment is compatible. We review the gate operator and existing controls, then recommend a setup based on how employees, residents, and visitors need to enter." },
    { q: "Can I remove access when an employee leaves or a tenant moves out?", a: "Many access control systems let you deactivate an individual card, fob, or user code. If everyone uses a shared PIN, you may need to change it for everyone. We can help you understand what your current system supports and recommend options if you need more control." },
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
    badgeAfterHours: "Repair & installation",
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
    { q: "Do you install and repair fences in Portland?", a: "Yes. We install and repair wood, chain-link, and metal fences for homes and businesses in the Portland metro and surrounding areas. We can quote a new fence, replacement of a damaged section, or repairs to existing posts and panels." },
    { q: "Can you repair a leaning fence without replacing the whole fence?", a: "Often, yes. If the damage is limited to a few posts or panels and the rest of the fence is sound, we may be able to repair just the affected section. We inspect the posts and surrounding sections to determine how much work is needed." },
    { q: "What affects the cost of a new fence?", a: "Fence pricing depends on the length, height, material, number of gates, and site conditions. Removing an old fence can also affect the quote. Approximate measurements and photos of the property help us understand the scope." },
    { q: "Which fence material should I choose for privacy or security?", a: "Wood is a common choice for backyard privacy. Chain-link can enclose a yard, commercial property, or equipment area while keeping it visible. Metal fencing is another option when you want a defined perimeter with an open view. We can discuss which material fits your property and how you use it." },
    { q: "Can you install or repair a gate as part of a fencing job?", a: "Yes. We can include a pedestrian or vehicle gate in a fencing quote and assess existing gates that sag, drag, or won’t latch. If you want a powered vehicle gate, we can also discuss automatic gate options." },
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
      // Longer phrasings first, so "the Portland metro" below doesn't leave "areas area" behind.
      .replaceAll("the Portland metro and surrounding areas", `${city.name} and nearby areas`)
      .replaceAll("the Portland metro area", `${city.name} and nearby areas`)
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
