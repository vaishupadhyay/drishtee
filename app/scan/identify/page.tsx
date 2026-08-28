"use client";

import { useState } from "react";
import Link from "next/link";
import { locationCandidates } from "@/data/seed/grievance-taxonomy";

export default function IdentifyPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = locationCandidates.find((candidate) => candidate.id === selected);

  return (
    <main className="min-h-screen bg-paper px-4 py-6 text-ink">
      <div className="mx-auto max-w-xl">
        <Link href="/scan" className="text-sm text-ink-3 underline underline-offset-4">← Back to capture</Link>
        <p className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-stamp">Location confirmation</p>
        <h1 className="mt-2 max-w-[20ch]">Which location are you at?</h1>
        <p className="mt-3 max-w-[56ch] text-ink-2">The sample looks like a pharmacy counter. Please confirm one of these two nearby matches before continuing.</p>

        <div className="mt-7 overflow-hidden rounded-[var(--r-lg)] border border-rule bg-card">
          <div className="relative flex h-32 items-center justify-center bg-paper-2">
            <span className="anim-reticle flex h-16 w-16 items-center justify-center rounded-full border border-stamp text-xs font-medium text-stamp">OCR</span>
            <span className="anim-scan-sweep absolute inset-x-6 h-px bg-stamp/70" />
          </div>
          <p className="border-t border-rule px-4 py-3 text-sm text-ink-3">Detected document type: <span className="font-medium text-ink">Hospital pharmacy counter</span></p>
        </div>

        <div className="mt-5 space-y-3" role="radiogroup" aria-label="Location candidates">
          {locationCandidates.map((candidate) => {
            const active = selected === candidate.id;
            return (
              <button key={candidate.id} role="radio" aria-checked={active} onClick={() => setSelected(candidate.id)} className={`touch w-full rounded-[var(--r-md)] border p-4 text-left transition-colors ${active ? "border-stamp bg-stamp-tint" : "border-rule bg-card hover:border-rule-strong"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div><p className="font-[family-name:var(--font-display)] text-[18px] font-medium">{candidate.name}</p><p className="mt-1 text-sm text-ink-3">{candidate.department} · {candidate.address}</p></div>
                  <span className="shrink-0 rounded-[var(--r-pill)] bg-verify-tint px-2 py-1 text-xs font-medium text-verify">{candidate.confidence}% match</span>
                </div>
                <p className="mt-3 text-sm text-ink-2">{candidate.distanceM} m away</p>
              </button>
            );
          })}
        </div>
        <button className="mt-4 text-sm text-ink-3 underline underline-offset-4">None of these. Search manually.</button>
        <button disabled={!chosen} className="touch mt-6 w-full rounded-[var(--r-sm)] bg-seal px-4 py-3 font-medium text-paper disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]">{chosen ? `Confirm ${chosen.name}` : "Choose a location to continue"}</button>
        <p className="mt-5 text-center text-xs leading-relaxed text-ink-4">Independent hackathon prototype. Not affiliated with or endorsed by any government body.</p>
      </div>
    </main>
  );
}
