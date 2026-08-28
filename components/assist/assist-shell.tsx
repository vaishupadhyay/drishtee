"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccessibilityPanel } from "@/components/assist/accessibility-panel";
import { AssistIcon } from "@/components/assist/icons";
import { BrandLogo } from "@/components/brand-logo";
export function AssistShell({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  const path = usePathname(); const back = path === "/assist" ? "/" : "/assist";
  return <main className="assist-screen min-h-screen bg-surface text-navy"><header className="sticky top-0 z-20 border-b border-assist-line/80 bg-white/95 shadow-[var(--elev-2)] backdrop-blur"><div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4"><Link href={back} className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold"><AssistIcon name="back" width={18} height={18}/>Back</Link><Link href="/assist" aria-label="Drishti Assist home"><BrandLogo compact /></Link><AccessibilityPanel /></div></header><div className="mx-auto max-w-2xl px-4 py-10"><p className="assist-micro uppercase text-assist-blue">{eyebrow}</p><h1 className="assist-display mt-2 max-w-[20ch] leading-[1.08]">{title}</h1>{children}<p className="mt-12 text-xs leading-5 text-[#778397]">Independent hackathon prototype. Not affiliated with or endorsed by any public authority.</p></div></main>;
}
