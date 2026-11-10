"use client";

import { useEffect, useRef, useState } from "react";

type Review = { text: string; by: string };

const ROTATE_MS = 5000;

function usePageSize() {
  const [size, setSize] = useState(3);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setSize(mq.matches ? 3 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return size;
}

export function ReviewsCarousel({ items, title = "What customers say" }: { items: Review[]; title?: string }) {
  const size = usePageSize();
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false); // hovering or focused: leave the cards alone
  const [dir, setDir] = useState<0 | 1 | -1>(0); // which way the last change went; 0 until the first change
  const changedAt = useRef(0); // when the cards last changed (or the visitor last stopped hovering)
  const pages = Math.ceil(items.length / size);
  const current = Math.min(page, pages - 1);
  const start = current * size;
  const visible = items.slice(start, start + size);

  // Move to the next page once the current one has been on screen for 5 seconds, looping back to
  // the first. The clock is the timestamp of the last change, so a stray extra timer (hot reload,
  // a throttled tab catching up) can never advance early. Pauses while the visitor hovers or
  // focuses the carousel, and never runs for people who prefer reduced motion.
  useEffect(() => {
    changedAt.current = Date.now();
    if (paused || pages <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (Date.now() - changedAt.current < ROTATE_MS) return;
      changedAt.current = Date.now();
      setDir(1);
      setPage((p) => (Math.min(p, pages - 1) + 1) % pages);
    }, 250);
    return () => window.clearInterval(id);
  }, [paused, pages]);

  const goTo = (next: number, direction: 1 | -1) => {
    changedAt.current = Date.now(); // a manual change starts the 5 seconds over
    setDir(direction);
    setPage((next + pages) % pages);
  };

  const buttons = (["prev", "next"] as const).map((side) => (
    <button
      key={side}
      type="button"
      data-track="reviews_nav"
      aria-label={side === "prev" ? "Previous reviews" : "Next reviews"}
      onClick={() => goTo(current + (side === "prev" ? -1 : 1), side === "prev" ? -1 : 1)}
      className="chip size-11 justify-center !p-0"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={side === "prev" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"} />
      </svg>
    </button>
  ));

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="h-section">{title}</h2>
        <div className="hidden items-center gap-3 md:flex">
          <p className="whitespace-nowrap text-small text-muted">
            {start + 1}–{Math.min(start + size, items.length)} of {items.length}
          </p>
          {buttons}
        </div>
      </div>

      <div className="mt-8 overflow-hidden">
        <ul
          key={current}
          className={`grid gap-4 md:grid-cols-3 ${dir === 1 ? "slide-next" : dir === -1 ? "slide-prev" : ""}`}
        >
          {visible.map((r) => (
            <li key={r.text} className="card flex flex-col p-5">
              <p className="text-orange" aria-label="5 out of 5 stars">★★★★★</p>
              <p className="mt-3 flex-1 text-body leading-relaxed">{r.text}</p>
              <p className="mt-4 text-small text-muted">{r.by}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Phones: previous, counter and next sit under the card. */}
      <div className="mt-4 flex items-center justify-between md:hidden">
        {buttons[0]}
        <p className="font-display text-title font-bold text-muted">
          {current + 1} / {pages}
        </p>
        {buttons[1]}
      </div>

      <div className="mt-6 hidden justify-center gap-2 md:flex" role="group" aria-label="Review pages">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            type="button"
            data-track="reviews_nav"
            aria-label={`Show reviews page ${i + 1}`}
            aria-current={i === current}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className="grid h-6 place-items-center px-0.5"
          >
            <span className={`block h-1.5 rounded-full transition-all duration-200 ${i === current ? "w-6 bg-orange" : "w-1.5 bg-line"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
