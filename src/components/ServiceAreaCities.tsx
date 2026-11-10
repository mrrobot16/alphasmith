"use client";

import Link from "next/link";
import { useState } from "react";
import { cities, moreCities } from "@/lib/site";
import { cityHref } from "@/lib/cities";

/**
 * Chips for the "Do you serve my area?" section. Each one links to its city page;
 * the "+N more" chip reveals the rest of the places we serve.
 */
export function ServiceAreaCities() {
  const [open, setOpen] = useState(false);

  return (
    <ul id="service-area-cities" className="flex flex-wrap gap-2 lg:mt-3">
      {cities.map((c) => (
        <li key={c}>
          <Link
            href={cityHref(c) ?? "/"}
            className="chip !border-black !text-black transition-colors hover:!bg-black hover:!text-white"
          >
            {c}
          </Link>
        </li>
      ))}
      {open &&
        moreCities.map((c) => (
          <li key={c} className="rise">
            <Link
              href={cityHref(c) ?? "/"}
              className="chip !border-black !text-black transition-colors hover:!bg-black hover:!text-white"
            >
              {c}
            </Link>
          </li>
        ))}
      <li>
        <button
          type="button"
          data-track="cities_toggle"
          data-track-label={open ? "Show fewer cities" : "Show more cities"}
          aria-expanded={open}
          aria-controls="service-area-cities"
          onClick={() => setOpen((v) => !v)}
          className="chip !border-black !bg-black !text-white"
        >
          {open ? "− Show fewer" : `+${moreCities.length} more`}
        </button>
      </li>
    </ul>
  );
}
