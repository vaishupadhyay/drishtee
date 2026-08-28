"use client";
import { useState } from "react";
export function ReadAloudButton({ text }: { text: string }) { const [playing, setPlaying] = useState(false); function speak() { if (!("speechSynthesis" in window)) return; window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.onend = () => setPlaying(false); setPlaying(true); window.speechSynthesis.speak(utterance); } return <button onClick={speak} className="min-h-12 rounded-full border border-assist-line bg-white px-4 text-sm font-extrabold text-navy">{playing ? "Reading…" : "Read aloud"}</button>; }
