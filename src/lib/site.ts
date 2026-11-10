export const site = {
  name: "Alpha Locksmith & Garage",
  phone: "503-505-8560",
  phoneHref: "tel:+15035058560",
  license: "CCB#248737",
  certification: "62990CLS",
  bbb: "A+",
  email: "alphalocksmithor11@gmail.com",
  mapUrl: "https://www.google.com/maps?cid=2033016683438900625",
  mapEmbed: "https://www.google.com/maps?cid=2033016683438900625&output=embed",
};

export const nav = [
  { label: "Locksmith", href: "/locksmith-services" },
  { label: "Garage Doors", href: "/garage-door-services/spring-repair" },
  { label: "Automatic Gates", href: "/automatic-gate-services" },
  { label: "Fencing", href: "/fence-services" },
  { label: "Access Control", href: "/access-control-services" },
  { label: "Locations", href: "/#service-area" },
  { label: "Reviews", href: "#reviews" },
  { label: "About Us", href: "/#about" },
];

export const services = [
  {
    icon: "key",
    title: "Locksmith services",
    body: "Emergency lockout service, lock change, lock rekey, lock repairs, storefront doors and auto keys.",
    cta: "Locksmith services",
    href: "/locksmith-services",
  },
  {
    icon: "garage",
    title: "Garage / overhead door services",
    body: "Spring, cable, panel and motor operator replacement, plus door installation services.",
    cta: "Garage door services",
    href: "/garage-door-services/spring-repair",
  },
  {
    icon: "gate",
    title: "Automatic gates",
    body: "Driveway and commercial gate repair, gate repair, and fence repair and installation services.",
    cta: "Automatic gate services",
    href: "/automatic-gate-services",
  },
  {
    icon: "access",
    title: "Access control systems",
    body: "Keycard and fob entry, keypad and intercom systems, gate access control and panic hardware.",
    cta: "Access control services",
    href: "/access-control-services",
  },
] as const;

export const workFilters = [
  "All",
  "Locksmith",
  "Garage doors",
  "Automatic gates",
  "Fencing",
  "Access control",
];

export type WorkItem = { cat: string; caption: string; src?: string };

/** All 10 show on every screen size, in this order (it matches the design). Set `src` (e.g. "/work/spring.jpg", file in /public/work) to show a real photo. */
export const work: WorkItem[] = [
  { cat: "Locksmith", caption: "Lock installation and repair", src: "/work/lock-installation.jpg" },
  { cat: "Garage doors", caption: "Spring and track repair", src: "/our-work-3.jpg" },
  { cat: "Automatic gates", caption: "Gate panel repair", src: "/our-work-1.jpg" },
  { cat: "Fencing", caption: "Metal fence installation", src: "/our-work-2.jpg" },
  { cat: "Access control", caption: "Keycard and keypad entry", src: "/work/keycard-entry.jpg" },
  { cat: "Locksmith", caption: "Car lockout service", src: "/work/car-lockout.jpg" },
  { cat: "Garage doors", caption: "Commercial overhead door service", src: "/our-work-6.jpg" },
  { cat: "Automatic gates", caption: "Wood driveway gate", src: "/work/wood-driveway-gate.jpg" },
  { cat: "Fencing", caption: "Chain-link fence", src: "/work/chain-link-fence-2.jpg" },
  { cat: "Access control", caption: "Video intercom at gate", src: "/work/gate-video-intercom.jpg" },
];

export const cities = [
  "Portland",
  "Hillsboro",
  "Beaverton",
  "Tigard",
  "Tualatin",
  "Lake Oswego",
  "Milwaukie",
  "Happy Valley",
  "Gresham",
  "West Linn",
  "Wilsonville",
];

/** Placeholder reviews for the homepage carousel. Replace with real Google reviews. */
export const homeReviews = [
  "an emergency home lockout",
  "a garage door spring replacement",
  "car key or fob replacement",
  "a driveway gate repair",
  "rekeying locks after a move",
  "a new garage door opener",
  "a storefront lockout",
  "keycard and keypad entry",
  "a fence repair",
  "a broken key extraction",
  "a garage door off its track",
  "a gate intercom install",
  "a new deadbolt install",
  "a roll-up door repair",
  "a gate opener replacement",
].map((job) => ({
  text: `[Real Google review about ${job}, in the customer's words.]`,
  by: "[First name L.] · [Town] · Google · [Month Year]",
}));
