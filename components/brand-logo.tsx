import Image from "next/image";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`relative block shrink-0 overflow-hidden ${compact ? "h-14 w-14" : "h-24 w-24"}`}>
      <Image src="/drishti-logo.png" alt="Drishti. Your Voice. Our Action." fill priority sizes={compact ? "56px" : "96px"} className="object-contain" />
    </span>
  );
}
