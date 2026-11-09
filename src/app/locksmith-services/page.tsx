import { ServicePage } from "@/components/ServicePage";
import { locksmith } from "@/lib/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ ...locksmith.meta, path: locksmith.path });

export default function LocksmithPage() {
  return <ServicePage c={locksmith} />;
}
