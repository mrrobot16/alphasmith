import { ServicePage } from "@/components/ServicePage";
import { fencing } from "@/lib/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ ...fencing.meta, path: fencing.path });

export default function FencingPage() {
  return <ServicePage c={fencing} />;
}
