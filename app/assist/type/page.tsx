"use client";
import { useState } from "react";
import Link from "next/link";
import { AssistShell } from "@/components/assist/assist-shell";

export default function TypePage() { const [text, setText] = useState(""); return <AssistShell eyebrow="Type" title="Tell us what happened, in your own words."><Link href="/assist/speak" className="mt-6 inline-flex min-h-12 items-center text-sm font-bold text-assist-blue underline underline-offset-4">Speak instead</Link><textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="Tell us what happened, in your own words." className="mt-3 min-h-56 w-full rounded-2xl border border-assist-line bg-white p-5 text-lg leading-8 outline-none placeholder:text-[#8490A0] focus:border-assist-blue" /><p className="mt-3 text-sm text-[#617087]">There is no minimum length. Start wherever feels easiest.</p><Link href="/assist" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-navy px-5 text-sm font-extrabold text-white">Save and return to Assist</Link></AssistShell>; }
