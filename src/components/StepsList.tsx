"use client";

import { useState } from "react";

const PHONE_VISIBLE = 2;

/**
 * Numbered steps. Phones get a compact list that shows the first two steps and
 * hides the rest behind a "learn more" toggle; from sm up, every step is a card.
 */
export function StepsList({ items }: { items: [string, string, string][] }) {
  const [open, setOpen] = useState(false);
  const hidden = Math.max(items.length - PHONE_VISIBLE, 0);

  return (
    <>
      <ol id="steps-list" className="mt-6 sm:mt-7 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {items.map(([n, t, b], i) => (
          <li
            key={n}
            className={`${
              open || i < PHONE_VISIBLE ? "grid" : "hidden"
            } grid-cols-[2.75rem_1fr] items-baseline gap-x-3 border-t border-line py-4 first:border-t-0 first:pt-0 sm:block sm:rounded-[10px] sm:border sm:bg-surface sm:p-5 sm:first:border-t sm:first:pt-5`}
          >
            <p className="font-display text-sub font-bold leading-none text-orange">{n}</p>
            <div>
              <h3 className="text-title sm:mt-2">{t}</h3>
              <p className="mt-1 text-body leading-snug text-muted sm:mt-2 sm:leading-relaxed">{b}</p>
            </div>
          </li>
        ))}
      </ol>

      {hidden > 0 && (
        <button
          type="button"
          data-track="steps_toggle"
          data-track-label={open ? "Show fewer steps" : "Show more steps"}
          aria-expanded={open}
          aria-controls="steps-list"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between border-t border-line pt-4 text-left font-semibold text-orange sm:hidden"
        >
          <span>{open ? "Show fewer steps" : `${hidden} more steps · Learn more`}</span>
          <span aria-hidden className="text-sub font-bold leading-none">
            {open ? "−" : "+"}
          </span>
        </button>
      )}
    </>
  );
}
