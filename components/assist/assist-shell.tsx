import Link from "next/link";
import { AccessibilityPanel } from "@/components/assist/accessibility-panel";

export function AssistShell({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <main className="assist-screen min-h-screen bg-surface px-4 py-7 text-navy"><AccessibilityPanel /><div className="mx-auto max-w-2xl"><Link href="/assist" className="text-sm font-bold text-assist-blue underline underline-offset-4">← Drishtee Assist</Link><p className="mt-12 text-[11px] font-extrabold uppercase tracking-[.13em] text-assist-blue">{eyebrow}</p><h1 className="mt-2 max-w-[20ch] text-[clamp(34px,5vw,52px)] font-semibold leading-[1.02] tracking-[-.05em]">{title}</h1>{children}<p className="mt-12 text-xs leading-5 text-[#778397]">Independent hackathon prototype. Not affiliated with or endorsed by any government body.</p></div></main>;
}
