"use client";

import Link from "next/link";
import { useState } from "react";
import { site, nav } from "@/lib/site";
import { Logo } from "./Logo";
import { PhoneIcon, MenuIcon, CloseIcon } from "./Icons";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line">
      <div className="bg-topbar text-small">
        <div className="wrap flex flex-wrap items-center gap-x-6 gap-y-1 py-2">
          <span className="flex items-center gap-2 font-bold">
            <span className="size-1.5 rounded-full bg-orange" /> Open 24/7
          </span>
          <span className="text-muted">
            <span className="hidden sm:inline">Contractor License </span>
            <span className="sm:hidden">License </span>
            <b className="text-ink">{site.license}</b>
          </span>
          <span className="hidden text-muted sm:inline">
            Locksmith Certification <b className="text-ink">{site.certification}</b>
          </span>
        </div>
      </div>

      <div className="wrap flex items-start justify-between gap-4 py-4 xl:items-center">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-8">
          <Link href="/" aria-label="Alpha Locksmith & Garage home">
            <Logo />
          </Link>
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex flex-nowrap gap-x-4 text-small font-semibold">
              {nav.map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className="whitespace-nowrap text-ink/90 transition-colors hover:text-orange">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a href={site.phoneHref} className="btn hidden whitespace-nowrap px-4 py-2.5 text-body lg:inline-flex">
            <PhoneIcon className="size-4" /> {site.phone}
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg border border-line xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="rise border-t border-line xl:hidden">
          <ul className="wrap flex flex-col py-2">
            {nav.map((n) => (
              <li key={n.label}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3 font-display text-title font-semibold uppercase"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
