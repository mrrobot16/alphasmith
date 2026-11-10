import { cities, moreCities } from "./site";

export type City = {
  slug: string;
  /** Name used in the page text, e.g. "Vancouver". */
  name: string;
  /** Name as it appears in the home page list of cities, e.g. "Vancouver metro area". */
  label: string;
  /** State used in titles and on the map. Almost everything is Oregon. */
  state: "OR" | "WA";
  /** ZIP codes served. Verify against your real service area. */
  zips: string[];
  /** Nearby areas shown at the bottom of the page. Cities with a page become links. */
  nearby: string[];
};

export const citySlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, "-");

const data: Record<string, Pick<City, "zips" | "nearby">> = {
  Portland: {
    zips: ["97201", "97202", "97203", "97204", "97205", "97206", "97209", "97210", "97211", "97212", "97213", "97214", "97215", "97217", "97218", "97219", "97220", "97221", "97225", "97227", "97229", "97230", "97232", "97233", "97236", "97239"],
    nearby: ["Beaverton", "Gresham", "Milwaukie", "Lake Oswego", "Tigard", "Happy Valley", "Hillsboro"],
  },
  Hillsboro: { zips: ["97123", "97124"], nearby: ["Beaverton", "Aloha", "Cornelius", "Forest Grove", "North Plains", "Portland"] },
  Beaverton: { zips: ["97003", "97005", "97006", "97007", "97008", "97078"], nearby: ["Portland", "Hillsboro", "Aloha", "Tigard", "Tualatin", "Lake Oswego", "Sherwood", "Forest Grove"] },
  Tigard: { zips: ["97223", "97224"], nearby: ["Beaverton", "Portland", "Tualatin", "Lake Oswego", "Sherwood", "King City"] },
  Tualatin: { zips: ["97062"], nearby: ["Tigard", "Lake Oswego", "Wilsonville", "Sherwood", "West Linn", "Beaverton"] },
  "Lake Oswego": { zips: ["97034", "97035"], nearby: ["Portland", "Tigard", "Tualatin", "West Linn", "Milwaukie", "Beaverton"] },
  Milwaukie: { zips: ["97222", "97267"], nearby: ["Portland", "Happy Valley", "Lake Oswego", "Oregon City", "Gladstone", "Clackamas"] },
  "Happy Valley": { zips: ["97086"], nearby: ["Clackamas", "Milwaukie", "Gresham", "Damascus", "Oregon City", "Portland"] },
  Gresham: { zips: ["97030", "97080"], nearby: ["Portland", "Troutdale", "Fairview", "Happy Valley", "Damascus", "Wood Village"] },
  "West Linn": { zips: ["97068"], nearby: ["Lake Oswego", "Oregon City", "Tualatin", "Wilsonville", "Portland", "Milwaukie"] },
  Wilsonville: { zips: ["97070"], nearby: ["Tualatin", "West Linn", "Sherwood", "Canby", "Oregon City", "Tigard"] },
  Aloha: { zips: ["97003", "97006", "97007", "97078"], nearby: ["Beaverton", "Hillsboro", "Cornelius", "Tigard", "Forest Grove", "Portland"] },
  Aurora: { zips: ["97002"], nearby: ["Canby", "Wilsonville", "Woodburn", "Hubbard", "Oregon City", "Newberg"] },
  Beavercreek: { zips: ["97004"], nearby: ["Oregon City", "Molalla", "Canby", "Happy Valley", "West Linn", "Estacada"] },
  Estacada: { zips: ["97023"], nearby: ["Sandy", "Eagle Creek", "Boring", "Happy Valley", "Oregon City", "Molalla"] },
  "Forest Grove": { zips: ["97116"], nearby: ["Hillsboro", "Cornelius", "Beaverton", "North Plains", "Gaston", "Aloha"] },
  "Government Camp": { zips: ["97028"], nearby: ["Rhododendron", "Hood Village", "Sandy", "Welches", "Brightwood", "Estacada"] },
  "Hood Village": { zips: ["97067"], nearby: ["Rhododendron", "Government Camp", "Welches", "Brightwood", "Sandy", "Estacada"] },
  Keizer: { zips: ["97303", "97307"], nearby: ["Salem", "Silverton", "Woodburn", "Aurora", "Newberg", "Independence"] },
  McMinnville: { zips: ["97128"], nearby: ["Newberg", "Dundee", "Sheridan", "Amity", "Forest Grove", "Salem"] },
  Molalla: { zips: ["97038"], nearby: ["Canby", "Beavercreek", "Oregon City", "Mulino", "Silverton", "Woodburn"] },
  Newberg: { zips: ["97132"], nearby: ["Dundee", "McMinnville", "Sherwood", "Wilsonville", "Tigard", "Aurora"] },
  "Oregon City": { zips: ["97045"], nearby: ["West Linn", "Beavercreek", "Gladstone", "Milwaukie", "Happy Valley", "Molalla"] },
  Rhododendron: { zips: ["97049"], nearby: ["Government Camp", "Hood Village", "Welches", "Brightwood", "Sandy", "Estacada"] },
  Salem: { zips: ["97301", "97302", "97303", "97304", "97305", "97306", "97317"], nearby: ["Keizer", "Silverton", "Woodburn", "Aurora", "Turner", "Independence"] },
  Sandy: { zips: ["97055"], nearby: ["Gresham", "Troutdale", "Estacada", "Boring", "Rhododendron", "Welches"] },
  Scappoose: { zips: ["97056"], nearby: ["St. Helens", "Columbia City", "Warren", "Portland", "Rainier"] },
  Sherwood: { zips: ["97140"], nearby: ["Tualatin", "Tigard", "Wilsonville", "Newberg", "Beaverton", "King City"] },
  Silverton: { zips: ["97381"], nearby: ["Salem", "Woodburn", "Mt. Angel", "Molalla", "Keizer", "Aurora"] },
  "St. Helens": { zips: ["97051"], nearby: ["Scappoose", "Columbia City", "Warren", "Rainier", "Portland"] },
  Troutdale: { zips: ["97060"], nearby: ["Gresham", "Fairview", "Wood Village", "Corbett", "Portland", "Sandy"] },
  "Vancouver metro area": { zips: ["98660", "98661", "98662", "98663", "98664", "98665", "98682", "98683", "98684", "98685"], nearby: ["Portland", "Camas", "Washougal", "Battle Ground", "Hazel Dell", "Ridgefield"] },
  Woodburn: { zips: ["97071"], nearby: ["Aurora", "Hubbard", "Gervais", "Silverton", "Salem", "Canby"] },
};

/** Places whose page text and slug differ from the label in the cities list. */
const overrides: Record<string, { name: string; slug: string; state: "OR" | "WA" }> = {
  "Vancouver metro area": { name: "Vancouver", slug: "vancouver", state: "WA" },
};

/** Every place that gets its own page: the main cities plus the ones behind "+22 more". */
export const allCities = [...cities, ...moreCities];

export const cityPages: City[] = allCities.map((label) => {
  const d = data[label];
  if (!d) throw new Error(`Add city data for "${label}" in lib/cities.ts`);
  const o = overrides[label];
  return { slug: o?.slug ?? citySlug(label), name: o?.name ?? label, label, state: o?.state ?? "OR", ...d };
});

export const getCity = (slug: string) => cityPages.find((c) => c.slug === slug);

/** Link target for an area name, or undefined when there is no page for it. */
export const cityHref = (name: string) => {
  const c = cityPages.find((x) => x.name === name || x.label === name);
  return c ? `/locations/${c.slug}` : undefined;
};
