import { ServicePage } from "@/components/ServicePage";
import { springRepair } from "@/lib/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ ...springRepair.meta, path: springRepair.path });

export default function SpringRepairPage() {
  return <ServicePage c={springRepair} />;
}
