import Image from "next/image";
import Link from "next/link";

export function BrandLogo({ compact = false, href = "/" }: { compact?: boolean; href?: string }) {
  const width = compact ? 172 : 200;
  const height = compact ? 114 : 133;

  return (
    <Link href={href} className={compact ? "brand-logo compact" : "brand-logo"} aria-label="AGRON home">
      <Image
        src="/brand/AGRON_Logo_with_Tagline.webp"
        alt="AGRON - AERIAL-GROUND ROBOTICS OPERATIONS NETWORK"
        width={width}
        height={height}
        priority={compact}
      />
    </Link>
  );
}
