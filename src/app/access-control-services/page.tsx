import { ServicePage } from "@/components/ServicePage";
import { accessControl } from "@/lib/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ ...accessControl.meta, path: accessControl.path });

export default function AccessControlPage() {
  return <ServicePage c={accessControl} />;
}
