import type { ReactNode } from "react";

/**
 * Class names for whole elements (a list item, an FAQ entry) that should only show during
 * open hours or only after hours. Rules live in globals.css; the window is set in lib/hours.ts.
 */
export const hoursClass = { open: "hours-open", closed: "hours-closed" } as const;

/**
 * Inline copy that changes after hours: `open` shows during the day, `closed` from 10pm to 6am
 * (Portland time), or always one or the other when HOURS_MODE is "show" / "hide" (lib/hours.ts).
 * Leave `closed` out to show nothing after hours.
 */
export function Hours({ open, closed }: { open: ReactNode; closed?: ReactNode }) {
  return (
    <>
      <span className={hoursClass.open}>{open}</span>
      {closed != null && closed !== "" && <span className={hoursClass.closed}>{closed}</span>}
    </>
  );
}
