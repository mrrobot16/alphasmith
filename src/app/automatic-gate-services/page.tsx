import { ServicePage } from "@/components/ServicePage";
import { automaticGates } from "@/lib/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ ...automaticGates.meta, path: automaticGates.path });

export default function AutomaticGatesPage() {
  return <ServicePage c={automaticGates} />;
}
