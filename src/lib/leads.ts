import { MongoClient, type ObjectId } from "mongodb";

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
