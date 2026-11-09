"use client";

import { useEffect, useState } from "react";

type Review = { text: string; by: string };

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

export function ReviewsCarousel({ items }: { items: Review[] }) {
  const size = usePageSize();
  const [page, setPage] = useState(0);
  const pages = Math.ceil(items.length / size);
  const current = Math.min(page, pages - 1);
  const start = current * size;
  const visible = items.slice(start, start + size);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="h-section">What customers say</h2>
        <div className="flex items-center gap-3">
          <p className="whitespace-nowrap text-small text-muted" aria-live="polite">
            {size === 1 ? start + 1 : `${start + 1}–${Math.min(start + size, items.length)}`} of {items.length}
          </p>
          {(["prev", "next"] as const).map((dir) => {
            const disabled = dir === "prev" ? current === 0 : current === pages - 1;
            return (
              <button
                key={dir}
                type="button"
                data-track="reviews_nav"
                aria-label={dir === "prev" ? "Previous reviews" : "Next reviews"}
                disabled={disabled}
                onClick={() => setPage(current + (dir === "prev" ? -1 : 1))}
                className="chip size-11 justify-center !p-0 disabled:opacity-40"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={dir === "prev" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"} />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {visible.map((r) => (
          <li key={r.text} className="card flex flex-col p-5">
            <p className="text-orange" aria-label="5 out of 5 stars">★★★★★</p>
            <p className="mt-3 flex-1 text-body leading-relaxed">{r.text}</p>
            <p className="mt-4 text-small text-muted">{r.by}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 hidden justify-center gap-2 md:flex" role="group" aria-label="Review pages">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            type="button"
            data-track="reviews_nav"
            aria-label={`Show reviews page ${i + 1}`}
            aria-current={i === current}
            onClick={() => setPage(i)}
            className="grid h-6 place-items-center px-0.5"
          >
            <span className={`block h-1.5 rounded-full transition-all duration-200 ${i === current ? "w-6 bg-orange" : "w-1.5 bg-line"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
