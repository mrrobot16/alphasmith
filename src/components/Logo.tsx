import Image from "next/image";

/**
 * The supplied logo has dark lettering, so it sits on a light plate to stay
 * legible on the dark UI. Replace /public/logo.png with a light-on-dark
 * variant if one is made, and drop the plate.
 */
export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const h = size === "lg" ? 56 : 40;
  return (
    <span className="inline-flex rounded-lg bg-[#f4f4f2] px-2.5 py-1.5">
      <Image
        src="/logo.png"
        alt="Alpha Locksmith & Garage"
        width={Math.round(h * (2048 / 429))}
        height={h}
        priority
        style={{ height: h, width: "auto" }}
      />
    </span>
  );
}
