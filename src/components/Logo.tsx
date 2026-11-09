import Image from "next/image";

// Intrinsic size of /public/logo.png. Update if the file is replaced with a different shape.
const LOGO = { width: 472, height: 142 };

/**
 * Height steps with the viewport so the header never squeezes the logo sideways:
 * md (header) 46px on phones, 48px from 640px, 64px from 1024px; lg (footer) 64px, then 80px.
 */
export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const sizes = size === "lg" ? "h-16 sm:h-20" : "h-[46px] sm:h-12 lg:h-16";
  return (
    <span>
      <Image
        src="/logo.png"
        alt="Alpha Locksmith & Garage"
        width={LOGO.width}
        height={LOGO.height}
        priority
        className={`block w-auto max-w-none ${sizes}`}
      />
    </span>
  );
}
