"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { defaultAccessibilityPreferences, type AccessibilityPreferences, type TextSize } from "@/lib/accessibility/preferences";
import { readAssistSession, updatePreferences } from "@/lib/assist/session";
import { AssistIcon } from "@/components/assist/icons";

export function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(defaultAccessibilityPreferences);

  useEffect(() => { const current = readAssistSession().preferences; setPreferences(current); applySize(current.textSize); }, []);

  function update(next: Partial<AccessibilityPreferences>) {
    setPreferences((current) => { const value = { ...current, ...next }; updatePreferences(value); applySize(value.textSize); return value; });
  }
  function applySize(size: TextSize) { document.documentElement.classList.remove("text-scale-large", "text-scale-extra-large"); if (size !== "standard") document.documentElement.classList.add(`text-scale-${size}`); }

  return <>
    <button onClick={() => setOpen(true)} className="grid min-h-11 min-w-11 place-items-center rounded-xl border border-assist-line bg-white text-navy" aria-label="Open accessibility preferences"><AssistIcon name="accessibility" width={20} height={20}/></button>
    {open && <div className="fixed inset-0 z-40 bg-navy/35 p-4" role="presentation" onClick={() => setOpen(false)}><aside className="ml-auto h-full w-full max-w-sm overflow-y-auto rounded-2xl bg-surface p-5 text-navy shadow-[0_18px_45px_rgb(11_31_61_/_20%)]" role="dialog" aria-modal="true" aria-label="Accessibility preferences" onClick={(event) => event.stopPropagation()}>
      <div className="flex items-center justify-between"><div><p className="text-[11px] font-extrabold uppercase tracking-[.12em] text-assist-blue">Drishtee Assist</p><h2 className="mt-1 text-xl font-extrabold">Make this easier to use</h2></div><button onClick={() => setOpen(false)} className="grid min-h-12 min-w-12 place-items-center rounded-full border border-assist-line text-lg" aria-label="Close accessibility preferences"><AssistIcon name="close"/></button></div>
      <PreferenceSection label="Text size"><div className="grid grid-cols-3 gap-2">{(["standard", "large", "extra-large"] as TextSize[]).map((size) => <button key={size} onClick={() => update({ textSize: size })} className={`min-h-12 rounded-xl border px-2 text-xs font-bold ${preferences.textSize === size ? "border-assist-blue bg-sky text-assist-blue" : "border-assist-line bg-white"}`}>{size === "extra-large" ? "Extra Large" : size[0].toUpperCase() + size.slice(1)}</button>)}</div></PreferenceSection>
      <Toggle label="Simple language" detail="Use shorter, clearer sentences." checked={preferences.simpleLanguage} onChange={(simpleLanguage) => update({ simpleLanguage })} />
      <Toggle label="Ask me fewer questions" detail="Prefer one question at a time." checked={preferences.fewerQuestions} onChange={(fewerQuestions) => update({ fewerQuestions })} />
      <Toggle label="Explain things in more detail" detail="Add a little more context before each step." checked={preferences.detailedExplanations} onChange={(detailedExplanations) => update({ detailedExplanations })} />
      <PreferenceSection label="Switch input method"><div className="grid grid-cols-2 gap-2">{[["Speak", "/assist/speak"], ["Scan", "/assist/scan"], ["Type", "/assist/type"], ["Upload", "/assist/upload"]].map(([label, href]) => <Link key={label} href={href} className="flex min-h-12 items-center justify-center rounded-xl border border-assist-line bg-white text-xs font-bold text-navy">{label}</Link>)}</div></PreferenceSection>
    </aside></div>}
  </>;
}

function PreferenceSection({ label, children }: { label: string; children: React.ReactNode }) { return <section className="mt-6"><h3 className="mb-2 text-sm font-extrabold">{label}</h3>{children}</section>; }
function Toggle({ label, detail, checked, onChange }: { label: string; detail: string; checked: boolean; onChange: (value: boolean) => void }) { return <button onClick={() => onChange(!checked)} className="mt-5 flex min-h-14 w-full items-center justify-between gap-4 text-left"><span><strong className="block text-sm">{label}</strong><span className="mt-0.5 block text-xs leading-4 text-[#617087]">{detail}</span></span><span className={`relative h-7 w-12 rounded-full transition ${checked ? "bg-assist-green" : "bg-[#C8D5E6]"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${checked ? "left-6" : "left-1"}`} /></span></button>; }
