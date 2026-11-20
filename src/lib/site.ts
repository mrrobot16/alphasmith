export const site = {
  name: "Alpha Locksmith & Garage",
  phone: "503-505-8560",
  phoneHref: "tel:+15035058560",
  license: "CCB#248737",
  certification: "62990CLS",
  bbb: "A+",
  bbbUrl: "https://www.bbb.org/us/or/wilsonville/profile/car-locksmith/alpha-locksmith-garage-llc-1296-1000175373",
  email: "alphalocksmithor11@gmail.com",
  social: [
    { label: "Instagram", handle: "@alphalocksmithor", href: "https://www.instagram.com/alphalocksmithor/" },
    { label: "Facebook", handle: "Alpha Locksmith & Garage", href: "https://www.facebook.com/profile.php?id=61573086032419" },
    { label: "Yelp", handle: "Alpha Locksmith & Garage", href: "https://yelp.to/p7p67ZjmUW" },
  ],
  mapUrl: "https://www.google.com/maps?cid=2033016683438900625",
  /** Opens the Google Maps listing on its reviews tab. Every review card on the site links here. */
  reviewsUrl:
    "https://www.google.com/maps/place/Alpha+Locksmith+%26+Garage/@45.3076513,-125.0672226,8z/data=!4m8!3m7!1s0x23d3c51193888b2d:0x66afb91c9fa7a49f!8m2!3d45.3329604!4d-122.5687369!9m1!1b1!16s%2Fg%2F11y9zjm5lg?entry=ttu&g_ep=EgoyMDI2MTEwOC4wIKXMDSoASAFQAw%3D%3D",
  mapEmbed: "https://www.google.com/maps?cid=2033016683438900625&output=embed",
  /**
   * The home page "Do you serve my area?" map. Center is the middle of the Portland metro and zoom 9
   * shows roughly a 30-mile radius: Vancouver WA to the north, Salem and Newberg to the south and
   * west, Sandy and Estacada to the east. Zoom in (10, 11) to tighten it, out (8) to widen it.
   */
  serviceAreaMap: { center: { lat: 45.45, lng: -122.6 }, zoom: 9 },
};

export const nav = [
  { label: "Locksmith", href: "/locations/portland/service/locksmith" },
  { label: "Garage Doors", href: "/locations/portland/service/garage-doors" },
  { label: "Automatic Gates", href: "/locations/portland/service/automatic-gates" },
  { label: "Fencing", href: "/locations/portland/service/fencing" },
  { label: "Access Control", href: "/locations/portland/service/access-control" },
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
    href: "/locations/portland/service/locksmith",
  },
  {
    icon: "garage",
    title: "Garage / overhead door services",
    body: "Spring, cable, panel and motor operator replacement, plus door installation services.",
    cta: "Garage door services",
    href: "/locations/portland/service/garage-doors",
  },
  {
    icon: "gate",
    title: "Automatic gates",
    body: "Driveway and commercial gate repair, gate repair, and fence repair and installation services.",
    cta: "Automatic gate services",
    href: "/locations/portland/service/automatic-gates",
  },
  {
    icon: "access",
    title: "Access control systems",
    body: "Keycard and fob entry, keypad and intercom systems, gate access control and panic hardware.",
    cta: "Access control services",
    href: "/locations/portland/service/access-control",
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

export type WorkItem = { cat: string; caption: string; src: string; /** Shown under the "All" filter. */ featured?: boolean };

/**
 * Our work gallery. Each service filter shows its 4 photos, in this order. "All" shows the items marked
 * `featured` (the first two of every service, interleaved). Photos live in /public/work/gallery,
 * resized from the originals in top_photos. The array order is the display order.
 */
export const work: WorkItem[] = [
  { cat: "Locksmith", caption: "Lock installation and repair", src: "/work/gallery/locksmith-1.jpg", featured: true },
  { cat: "Garage doors", caption: "Spring and track repair", src: "/work/gallery/garage-doors-1.jpg", featured: true },
  { cat: "Automatic gates", caption: "Gate panel repair", src: "/work/gallery/automatic-gates-1.jpg", featured: true },
  { cat: "Fencing", caption: "Metal fence installation", src: "/work/gallery/fencing-1.jpg", featured: true },
  { cat: "Access control", caption: "Keycard and keypad entry", src: "/work/gallery/access-control-1.jpg", featured: true },
  { cat: "Locksmith", caption: "Car lockout service", src: "/work/gallery/locksmith-2.jpg", featured: true },
  { cat: "Garage doors", caption: "Commercial overhead door service", src: "/work/gallery/garage-doors-2.jpg", featured: true },
  { cat: "Automatic gates", caption: "Wood driveway gate", src: "/work/gallery/automatic-gates-2.jpg", featured: true },
  { cat: "Fencing", caption: "Chain-link fence", src: "/work/gallery/fencing-2.jpg", featured: true },
  { cat: "Access control", caption: "Video intercom at gate", src: "/work/gallery/access-control-2.jpg", featured: true },
  { cat: "Locksmith", caption: "Key cutting", src: "/work/gallery/locksmith-3.jpg" },
  { cat: "Locksmith", caption: "Smart lock installation", src: "/work/gallery/locksmith-4.jpg" },
  { cat: "Garage doors", caption: "Commercial roll-up door", src: "/work/gallery/garage-doors-3.jpg" },
  { cat: "Garage doors", caption: "Commercial door operator install", src: "/work/gallery/garage-doors-4.jpg" },
  { cat: "Automatic gates", caption: "Steel slat driveway gate", src: "/work/gallery/automatic-gates-3.jpg" },
  { cat: "Automatic gates", caption: "Wood double driveway gate", src: "/work/gallery/automatic-gates-4.jpg" },
  { cat: "Fencing", caption: "Commercial chain-link with rolling gate", src: "/work/gallery/fencing-3.jpg" },
  { cat: "Fencing", caption: "Security fence with barbed wire", src: "/work/gallery/fencing-4.jpg" },
  { cat: "Access control", caption: "Delayed egress exit device", src: "/work/gallery/access-control-3.jpg" },
  { cat: "Access control", caption: "Key switch control", src: "/work/gallery/access-control-4.jpg" },
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

/** Other places we travel to. Shown behind the "+22 more" button; they do not have their own pages yet. */
export const moreCities = [
  "Aloha",
  "Aurora",
  "Beavercreek",
  "Estacada",
  "Forest Grove",
  "Government Camp",
  "Hood Village",
  "Keizer",
  "McMinnville",
  "Molalla",
  "Newberg",
  "Oregon City",
  "Rhododendron",
  "Salem",
  "Sandy",
  "Scappoose",
  "Sherwood",
  "Silverton",
  "St. Helens",
  "Troutdale",
  "Vancouver metro area",
  "Woodburn",
];

/** Home page FAQ, as approved by the client. */
export const homeFaqs = [
  {
    q: "Do you offer 24/7 emergency service in Portland?",
    a: `Yes. We answer emergency calls 24/7 for lockouts and urgent problems with garage doors, commercial doors, automatic gates, fences or access control. Call ${site.phone} with your location and what’s happening so we can confirm technician availability and give you an estimated arrival time.`,
  },
  {
    q: "Can you help if I’m locked out of my car, home, or business?",
    a: "Yes. Our mobile locksmith team will help with car, house, and business lockouts throughout the Portland metro and surrounding areas. Tell us what you’re locked out of and where you are. We’ll be there as soon as we can.",
  },
  {
    q: "What areas do you serve around Portland?",
    a: "We serve Portland metro and nearby communities, including Beaverton, Hillsboro, Tigard, Tualatin, Lake Oswego, Gresham, and Wilsonville. If you’re outside those areas, call with your ZIP code and the service you need so we can confirm coverage. Most likely we can help.",
  },
  {
    q: "What services do you offer for homes and businesses?",
    a: "Alpha Locksmith & Garage provides locksmith services, garage and overhead door services, automatic gate installation and repair, fence installation and repair, and access control. We also repair commercial storefront and back doors, including locks, hinges, door closers, and panic bars.",
  },
  {
    q: "Do you provide a quote before starting work?",
    a: "Yes. We explain the recommended work and provide a quote before getting started. When requesting service, describe the issue and share photos or a model number if you have them.",
  },
];

/** Real Google reviews, word for word as customers wrote them. Add new ones at the end. Every card on the site opens `site.reviewsUrl`. */
export const homeReviews = [
  { name: "Diane Anderson", text: "The locksmith who serviced my home was excellent. Joseph was efficient, and his fees were reasonable. Joseph was also clear in explaining what he had done, and I felt safe. As he was leaving, he had parked his truck infront of my garage, he saw the loose doorframe, found a nail and pounded it in. Voila !" },
  { name: "Colby Gillen", text: "Alpha Locksmith and the owner Andres were super helpful. Very fast and affordable. 100% recommend their services." },
  { name: "Hector Garcia", text: "While traveling to Portland I got lockout out of my vehicle, I called Alpha Locksmith & Garage and Andres was very friendly and explained the process. The price was the best one in the market and he helped me very fast. Thank you Andres for such a great work and quick response." },
  { name: "Rodny Rodriguez", text: "I called Alpha Locksmith & Garage and the technician arrived in about 15-20 minutes. They opened my vehicle fast and at affordable price. Andres did a great job at explaining the whole process. Recommended 100%" },
  { name: "Vanessa Enahoro", text: "Alpha Locksmith & Garage was amazing. They came to my house in less than 20 minutes. Opened the door very quickly and the technician was very friendly. Andres did a great job! I recommend them" },
  { name: "Dean Manley", text: "Speedy arrival, great prices, quick to unlock my door" },
  { name: "Aidia Dobbels", text: "These guys are the best! I was in portland from out of town and didn’t know what else to do, so i called and they responded right away. He was super quick and and got there fast aswell!" },
  { name: "TJ Pound", text: "I got locked out of my Andres showed up in a very timely manner and got the job done quick and efficiently at a great price!!!" },
  { name: "John Pyle", text: "I locked myself out of my vehicle. Andres the technician was friendly, quick and affordable. Thanks" },
  { name: "Drew Kaatz", text: "Great business. Did an amazing job on my house. Thank you!" },
  { name: "Michael Keskin", text: "On time quick friendly and very knowledgeable\nWould definitely use again\nHopefully we don’t though" },
  { name: "Cordero", text: "Quick, fast and reliable service. Answered right away. Would recommend if youre in need of help right away." },
  { name: "Lamonte", text: "Came very quickly, opened our door within a few seconds and was very efficient. Very good experience" },
  { name: "jose ramirez", text: "Alpha locksmith came out and replaced my door locks great service thank you" },
  { name: "Sherry Vote", text: "From start to finish Andres was fast and reliable with helping fix my front door lock and he was even able to re-key all my locks so I only have 1 key. I highly recommend this company and will keep them in mind for future locksmith services." },
].map((r) => ({ text: r.text, by: `${r.name} · Google review` }));
