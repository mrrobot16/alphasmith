import { cities } from "./site";

export type City = {
  slug: string;
  name: string;
  /** ZIP codes served. Verify against your real service area. */
  zips: string[];
  /** Nearby areas shown at the bottom of the page. Cities with a page become links. */
  nearby: string[];
};

export const citySlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

const data: Record<string, Omit<City, "slug" | "name">> = {
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
};

export const cityPages: City[] = cities.map((name) => {
  const d = data[name];
  if (!d) throw new Error(`Add city data for "${name}" in lib/cities.ts`);
  return { slug: citySlug(name), name, ...d };
});

export const getCity = (slug: string) => cityPages.find((c) => c.slug === slug);

/** Link target for an area name, or undefined when there is no page for it. */
export const cityHref = (name: string) => {
  const c = cityPages.find((x) => x.name === name);
  return c ? `/locations/${c.slug}` : undefined;
};
