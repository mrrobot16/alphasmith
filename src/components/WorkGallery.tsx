"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { work, workFilters } from "@/lib/site";
import { serviceIcons } from "./Icons";

const iconFor = {
  locksmith: "key",
  "garage doors": "garage",
  "automatic gates": "gate",
  fencing: "gate",
  "access control": "access",
} as const;

/** Tiles link to the service page for this city. Portland for now. */
const GALLERY_CITY = "portland";

const slugFor = {
  locksmith: "locksmith",
  "garage doors": "garage-doors",
  "automatic gates": "automatic-gates",
  fencing: "fencing",
  "access control": "access-control",
} as const;

export function WorkGallery() {
  const [active, setActive] = useState("All");
  const filters = workFilters.filter((f) => f === "All" || work.some((w) => w.cat === f));
  const items = work.filter((w) => (active === "All" ? w.featured : w.cat.toLowerCase() === active.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="-mx-4 flex min-w-0 gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filter work by service">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              data-track="gallery_filter"
              data-track-label={f}
              aria-pressed={active === f}
              onClick={() => setActive(f)}
              className={`chip shrink-0 whitespace-nowrap ${active === f ? "!border-orange !bg-orange/10" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="hidden text-small text-muted sm:block">Real jobs by the Alpha team</p>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((w, i) => {
          const key = w.cat.toLowerCase() as keyof typeof iconFor;
          const Icon = serviceIcons[iconFor[key] ?? "key"];
          const href = `/locations/${GALLERY_CITY}/service/${slugFor[key] ?? "locksmith"}`;
          return (
            // The filter is part of the key so every tile remounts and replays its entrance when the filter changes.
            <li key={`${active}:${w.caption}`} className="gallery-item" style={{ "--i": i } as React.CSSProperties}>
              <Link
                href={href}
                data-track="gallery_tile"
                data-track-label={w.caption}
                aria-label={`${w.caption}. See ${w.cat.toLowerCase()} services in Portland`}
                className="group block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line transition-colors duration-150 group-hover:border-orange motion-reduce:transition-none">
                  {w.src ? (
                    <Image src={w.src} alt={`${w.cat}: ${w.caption}`} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
                  ) : (
                    <div
                      role="img"
                      aria-label={`${w.cat}: ${w.caption} (photo coming soon)`}
                      className="grid size-full place-items-center"
                      style={{ background: "radial-gradient(120% 90% at 30% 20%, #3a2410, #202020 70%)" }}
                    >
                      <Icon className="size-10 text-orange/70" />
                    </div>
                  )}
                </div>
                <p className="mt-2 font-display text-label font-bold uppercase tracking-[0.12em] text-orange">{w.cat}</p>
                <p className="text-small group-hover:underline">
                  {w.caption} <span aria-hidden className="text-orange">→</span>
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
