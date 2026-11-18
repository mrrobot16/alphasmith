"use client";

import Image from "next/image";
import { useState } from "react";

// Replace with real photos of jobs in each city when available.
const jobs = [
  { src: "/work/job-slat-gate.jpg", alt: "Black steel slat driveway gate installed by Alpha" },
  { src: "/work/job-overhead-door.jpg", alt: "Alpha technician inspecting an overhead door" },
  { src: "/work/job-door-hardware.jpg", alt: "Installing new door hardware" },
  { src: "/work/car-lockout.jpg", alt: "Alpha technician helping with a car lockout" },
  { src: "/work/wood-driveway-gate.jpg", alt: "Wood automatic driveway gate" },
  { src: "/work/keycard-entry.jpg", alt: "Keycard and keypad entry reader" },
  { src: "/our-work-5.jpg", alt: "Key cutting and duplication" },
  { src: "/our-work-6.jpg", alt: "Commercial overhead door service" },
  { src: "/work/chain-link-fence-2.jpg", alt: "Chain-link fence along a property line" },
  { src: "/work/gate-video-intercom.jpg", alt: "Video intercom and keypad at a gate" },
];

const DEFAULT_VISIBLE = 4;

export function RecentJobs({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const more = jobs.length - DEFAULT_VISIBLE;

  return (
    <>
      <ul id="recent-jobs-list" className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {jobs.map((j, i) => (
          <li key={j.src} className={`${open || i < DEFAULT_VISIBLE ? "block" : "hidden"} ${i >= DEFAULT_VISIBLE ? "rise" : ""}`}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line">
              <Image src={j.src} alt={j.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
            {/* Hidden until real job details exist. Remove "hidden" to show the caption. */}
            <p className="mt-2 hidden text-small text-muted">[Job type, {name} · Month Year]</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          data-track="recent_jobs_toggle"
          data-track-label={open ? "Show fewer jobs" : "Show more jobs"}
          aria-expanded={open}
          aria-controls="recent-jobs-list"
          onClick={() => setOpen((v) => !v)}
          className="chip gap-2 px-6 py-3 text-body font-semibold"
        >
          {open ? "Show fewer jobs −" : `Show ${more} more jobs +`}
        </button>
      </div>
    </>
  );
}
