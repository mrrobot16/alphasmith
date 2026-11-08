export const site = {
  name: "Alpha Locksmith & Garage",
  phone: "503-505-8560",
  phoneHref: "tel:+15035058560",
  license: "CCB#248737",
  certification: "62990CLS",
  bbb: "A+",
  mapUrl: "https://www.google.com/maps?cid=2033016683438900625",
  mapEmbed: "https://www.google.com/maps?cid=2033016683438900625&output=embed",
};

export const nav = [
  { label: "Locksmith", href: "#services" },
  { label: "Garage Doors", href: "/garage-door-services/spring-repair" },
  { label: "Automatic Gates", href: "#services" },
  { label: "Fencing", href: "#services" },
  { label: "Access Control", href: "#services" },
  { label: "Locations", href: "/locations/beaverton" },
  { label: "Reviews", href: "#reviews" },
  { label: "About Us", href: "/#about" },
];

export const services = [
  {
    icon: "key",
    title: "Locksmith services",
    body: "Emergency lockout service, lock change, lock rekey, lock repairs, storefront doors and auto keys.",
    cta: "Locksmith services",
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
  },
  {
    icon: "access",
    title: "Access control systems",
    body: "Keycard and fob entry, keypad and intercom systems, gate access control and panic hardware.",
    cta: "Access control services",
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

/** Set `src` (e.g. "/work/spring.jpg", file in /public/work) to show a real photo. */
export const work: WorkItem[] = [
  { cat: "Locksmith", caption: "Lock installation and repair", src: "/our-work-4.jpg" },
  { cat: "Garage doors", caption: "Spring and track repair", src: "/our-work-3.jpg" },
  { cat: "Automatic gates", caption: "Gate panel repair", src: "/our-work-1.jpg" },
  { cat: "Fencing", caption: "Metal fence installation", src: "/our-work-2.jpg" },
  { cat: "Access control", caption: "Keycard and keypad entry" },
  { cat: "Locksmith", caption: "Car lockout service" },
  { cat: "Garage doors", caption: "Commercial overhead door service", src: "/our-work-6.jpg" },
  { cat: "Automatic gates", caption: "Wood driveway gate" },
  { cat: "Fencing", caption: "Chain-link fence" },
  { cat: "Access control", caption: "Video intercom at gate" },
  { cat: "Locksmith", caption: "Key cutting and duplication", src: "/our-work-5.jpg" },
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
