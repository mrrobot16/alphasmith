import { MongoClient, ObjectId, type Filter, type WithId } from "mongodb";

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
  /** When someone marked the lead as called from /admin. Missing or null = still to call. */
  calledAt?: Date | null;
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

/** The tabs on /admin. "failed" is every lead whose email never arrived, called or not. */
export const LEAD_VIEWS = ["open", "called", "all", "failed"] as const;
export type LeadView = (typeof LEAD_VIEWS)[number];

const VIEW_FILTERS: Record<LeadView, Filter<Lead>> = {
  open: { calledAt: null }, // matches missing too
  called: { calledAt: { $ne: null } },
  all: {},
  failed: { emailStatus: { $in: ["failed", "not_configured"] } },
};

/**
 * One page of leads for a tab, newest first, plus how many leads each tab holds.
 * Returns null when MONGODB_URI is not set; throws if the database can't be reached.
 */
export async function listLeads({ page, view }: { page: number; view: LeadView }) {
  const col = await leads();
  if (!col) return null;
  const [items, ...totals] = await Promise.all([
    col
      .find(VIEW_FILTERS[view])
      .sort({ createdAt: -1 })
      .skip((page - 1) * LEADS_PAGE_SIZE)
      .limit(LEADS_PAGE_SIZE)
      .toArray(),
    ...LEAD_VIEWS.map((v) => col.countDocuments(VIEW_FILTERS[v])),
  ]);
  const counts = Object.fromEntries(LEAD_VIEWS.map((v, i) => [v, totals[i]])) as Record<LeadView, number>;
  return { items: items as WithId<Lead>[], counts };
}

/** Marks a lead as called (or back to "to call"). Returns false for an unknown id. */
export async function setCalled(id: string, called: boolean) {
  if (!/^[0-9a-f]{24}$/i.test(id)) return false;
  const col = await leads();
  if (!col) return false;
  const { matchedCount } = await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { calledAt: called ? new Date() : null } },
  );
  return matchedCount === 1;
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
