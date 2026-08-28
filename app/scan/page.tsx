import Link from "next/link";

export default function ScanPage() {
  return (
    <main className="min-h-screen bg-paper px-4 py-6 text-ink">
      <div className="mx-auto max-w-xl">
        <Link href="/" className="text-sm text-ink-3 underline underline-offset-4">← Back home</Link>
        <p className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-stamp">Scan and Report</p>
        <h1 className="mt-2 max-w-[18ch]">Show us where the problem happened.</h1>
        <p className="mt-3 max-w-[55ch] text-ink-2">A board, counter, notice, receipt, token slip, bus sign, or utility sign can help confirm the location.</p>
        <div className="relative mt-7 overflow-hidden rounded-[var(--r-lg)] border border-rule bg-ink p-5 text-paper">
          <div className="anim-reticle mx-auto flex aspect-[4/3] max-w-md items-center justify-center border-2 border-paper/75">
            <span className="relative h-20 w-20 border border-stamp">
              <span className="anim-scan-sweep absolute inset-x-0 h-px bg-stamp" />
            </span>
          </div>
          <p className="mt-4 text-center text-sm text-paper/75">Fit the sign or document inside the frame.</p>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button className="touch rounded-[var(--r-sm)] bg-stamp px-4 py-3 font-medium text-white active:scale-[0.98]">Open camera</button>
          <Link href="/scan/identify" className="touch rounded-[var(--r-sm)] border border-rule bg-card px-4 py-3 text-center font-medium active:scale-[0.98]">Use a sample document</Link>
        </div>
        <p className="mt-5 text-center text-xs leading-relaxed text-ink-4">Independent hackathon prototype. Not affiliated with or endorsed by any government body.</p>
      </div>
    </main>
  );
}
