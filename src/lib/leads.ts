import { MongoClient, type ObjectId, type WithId } from "mongodb";

export type EmailStatus = "pending" | "sent" | "failed" | "not_configured";

export type Lead = {
  name: string;
  phone: string;
  service: string;
  zip: string;
  details: string;
  page: string;
  createdAt: Date;
  emailStatus: EmailStatus;
};

// One client per server instance, reused across requests (and across hot reloads in dev).
const g = globalThis as typeof globalThis & { _mongo?: Promise<MongoClient> };

function client(uri: string) {
  g._mongo ??= new MongoClient(uri, { serverSelectionTimeoutMS: 5000 })
    .connect()
    .catch((err) => {
      g._mongo = undefined; // let the next request try again
      throw err;
    });
  return g._mongo;
}

/** The leads collection, or null when MONGODB_URI is not set. The database is the one named in the URI. */
async function leads() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  return (await client(uri)).db().collection<Lead>("leads");
}

/** Saves a lead. Never throws: the email still goes out if the database is down. */
export async function saveLead(lead: Omit<Lead, "createdAt" | "emailStatus">): Promise<ObjectId | null> {
  try {
    const col = await leads();
    if (!col) return null;
    const { insertedId } = await col.insertOne({ ...lead, createdAt: new Date(), emailStatus: "pending" });
    return insertedId;
  } catch (err) {
    console.error("[leads] Could not save lead to MongoDB", err);
    return null;
  }
}

/** Records whether the lead's email went out. Never throws. */
export async function setEmailStatus(id: ObjectId | null, emailStatus: EmailStatus) {
  if (!id) return;
  try {
    await (await leads())?.updateOne({ _id: id }, { $set: { emailStatus } });
  } catch (err) {
    console.error("[leads] Could not update lead email status", err);
  }
}

export const LEADS_PAGE_SIZE = 50;

/**
 * One page of leads, newest first. `failedOnly` keeps the ones whose email never arrived.
 * Returns null when MONGODB_URI is not set; throws if the database can't be reached.
 */
export async function listLeads({ page, failedOnly }: { page: number; failedOnly: boolean }) {
  const col = await leads();
  if (!col) return null;
  const filter = failedOnly ? { emailStatus: { $in: ["failed", "not_configured"] as EmailStatus[] } } : {};
  const [items, total] = await Promise.all([
    col
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * LEADS_PAGE_SIZE)
      .limit(LEADS_PAGE_SIZE)
      .toArray(),
    col.countDocuments(filter),
  ]);
  return { items: items as WithId<Lead>[], total };
}

/** Turns a page path into a plain-English label for the owner. */
export function pageLabel(path: string) {
  const known: Record<string, string> = {
    "/": "Homepage",
  };
  if (known[path]) return known[path];
  const title = (slug: string) => slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
  const cs = path.match(/^\/locations\/([^/]+)\/service\/([^/]+)/);
  if (cs) return `${title(cs[2])} page in ${title(cs[1])}`;
  if (path.startsWith("/locations/")) return `${title(path.slice("/locations/".length))} city page`;
  const last = path.split("/").filter(Boolean).pop();
  if (!last) return "Website";
  const words = last.replace(/-/g, " ");
  return `${words.charAt(0).toUpperCase()}${words.slice(1)} page`;
}
