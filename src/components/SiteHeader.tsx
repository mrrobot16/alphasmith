"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { site, nav } from "@/lib/site";
import { Logo } from "./Logo";
import { PhoneIcon, MenuIcon, CloseIcon } from "./Icons";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Full-screen menu: stop the page behind it from scrolling, and let Escape close it.
  useLayoutEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header data-section="header" className="border-b border-line bg-[#131313] lg:bg-transparent">
      <div className="bg-topbar text-small">
        <div className="wrap flex flex-wrap items-center gap-x-6 gap-y-1 py-2">
          <span className="flex items-center gap-2 font-bold">
            <span className="size-1.5 rounded-full bg-orange" /> Open 24/7
          </span>
          <span className="text-muted sm:hidden">
            CCB <b className="text-ink">{site.license.replace(/^CCB#?/, "")}</b>
          </span>
          <span className="hidden text-muted sm:inline">
            Contractor License <b className="text-ink">{site.license}</b>
          </span>
          <span className="hidden text-muted sm:inline">
            Locksmith Certification <b className="text-ink">{site.certification}</b>
          </span>
        </div>
      </div>

      <div className="wrap flex items-start justify-between gap-4 py-4 xl:items-center">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-6">
          <Link href="/" aria-label="Alpha Locksmith & Garage home">
            <Logo />
          </Link>
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex flex-nowrap gap-x-3.5 text-small font-semibold">
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
          <div className="hidden lg:block">
            <a href={site.phoneHref} className="btn whitespace-nowrap px-4 py-2.5 text-body">
              <PhoneIcon className="size-4" /> {site.phone}
            </a>
          </div>
          <button
            type="button"
            data-track="menu_toggle"
            data-track-label={open ? "Close menu" : "Open menu"}
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
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-[#0d0d0d] xl:hidden"
        >
          <div className="wrap flex items-center justify-between border-b border-line py-4">
            <span className="font-display text-title font-bold uppercase tracking-wide text-muted">Menu</span>
            <button
              type="button"
              data-track="menu_toggle"
              data-track-label="Close menu"
              className="grid size-11 place-items-center rounded-lg border border-line"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain">
            <ul className="wrap">
              {nav.map((n) => (
                <li key={n.label} className="border-b border-line">
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3.5 font-display text-[1.75rem] font-semibold uppercase leading-tight"
                  >
                    {n.label}
                    <span aria-hidden className="text-sub text-orange">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-line bg-black pb-6 pt-5">
            <div className="wrap flex flex-col gap-3">
              <a href={site.phoneHref} className="btn w-full py-3.5 text-sub !text-black">
                <PhoneIcon className="size-6" /> Call {site.phone}
              </a>
              <a
                href="#quote"
                onClick={() => setOpen(false)}
                className="btn w-full !border-2 !border-solid !border-[#4a4a4a] !bg-black py-3 text-body !font-sans !font-semibold !normal-case !text-white"
              >
                Request a quote
              </a>
              <p className="text-center text-small text-muted">
                Open 24/7 · {site.license}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
