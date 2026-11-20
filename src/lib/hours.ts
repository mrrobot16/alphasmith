/**
 * When the "Open 24/7" / "Open now" copy is shown.
 *
 * HOURS_MODE picks the behavior:
 *   "auto" – show it, except between AFTER_HOURS.start and AFTER_HOURS.end (Portland time),
 *            when neutral after-hours copy is shown instead.
 *   "show" – always show the 24/7 copy, whatever the time.
 *   "hide" – never show it; the after-hours copy is shown all day.
 *
 * Set it here, or override it per deploy with the NEXT_PUBLIC_HOURS_MODE environment variable
 * (e.g. NEXT_PUBLIC_HOURS_MODE=hide on the host). Either way it takes effect on the next build.
 *
 * Pages are statically built, so in "auto" the check runs in the visitor's browser: `hoursScript`
 * sets <html data-hours="open|closed"> before the page paints, and CSS in globals.css hides whichever
 * variant does not apply (see components/Hours.tsx). "show" and "hide" set the attribute in the
 * HTML itself, so they also hold without JavaScript.
 */
const DEFAULT_MODE: HoursMode = "auto";

export const AFTER_HOURS = { start: 22, end: 6, timeZone: "America/Los_Angeles" } as const;

export type HoursMode = "auto" | "show" | "hide";
const MODES: HoursMode[] = ["auto", "show", "hide"];

function readMode(): HoursMode {
  const raw = process.env.NEXT_PUBLIC_HOURS_MODE?.trim().toLowerCase();
  if (!raw) return DEFAULT_MODE;
  if ((MODES as string[]).includes(raw)) return raw as HoursMode;
  console.warn(`NEXT_PUBLIC_HOURS_MODE="${raw}" is not one of ${MODES.join(", ")}; using "${DEFAULT_MODE}".`);
  return DEFAULT_MODE;
}

export const HOURS_MODE = readMode();

/** Fixed value for <html data-hours> when the mode ignores the clock; undefined in "auto". */
export const fixedHoursState = HOURS_MODE === "show" ? "open" : HOURS_MODE === "hide" ? "closed" : undefined;

/**
 * Inline script for <head> in "auto" mode (null otherwise). Re-checks every minute so an open tab
 * flips at 10pm and 6am.
 */
export const hoursScript =
  HOURS_MODE !== "auto"
    ? null
    : `(function(){var d=document.documentElement,s=${AFTER_HOURS.start},e=${AFTER_HOURS.end},f;try{f=new Intl.DateTimeFormat("en-US",{timeZone:${JSON.stringify(AFTER_HOURS.timeZone)},hour:"numeric",hourCycle:"h23"})}catch(x){return}function u(){var h=parseInt(f.format(new Date()),10)%24,c=s>e?h>=s||h<e:h>=s&&h<e;d.setAttribute("data-hours",c?"closed":"open")}u();setInterval(u,60000)})();`;
