import type { NextConfig } from "next";

// The first version of the site had one page per service. Services now live under a city.
const nextConfig: NextConfig = {
  async redirects() {
    const to = (slug: string) => `/locations/portland/service/${slug}`;
    return [
      { source: "/locksmith-services", destination: to("locksmith"), permanent: true },
      { source: "/garage-door-services", destination: to("garage-doors"), permanent: true },
      { source: "/garage-door-services/spring-repair", destination: to("garage-door-spring-repair"), permanent: true },
      { source: "/automatic-gate-services", destination: to("automatic-gates"), permanent: true },
      { source: "/fence-services", destination: to("fencing"), permanent: true },
      { source: "/access-control-services", destination: to("access-control"), permanent: true },
    ];
  },
};

export default nextConfig;
