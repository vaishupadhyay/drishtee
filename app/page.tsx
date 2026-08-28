"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ===============================================================
   Strings. Three languages ship; the shape makes adding the other
   nineteen a data change, not a code change.
   =============================================================== */

type Lang = "en" | "hi" | "ta";

const T: Record<Lang, Record<string, string>> = {
  en: {
    wordmark: "Scan & Report",
    kicker: "A proposed public grievance tool",
    lede: "Point your phone at the place. We'll find the department.",
    scanTitle: "Scan and report",
    scanSub: "Board, counter, notice or token slip",
    talkTitle: "Talk to Chatbot",
    talkSub: "Start with a template or type what happened.",
    track: "Track a report",
    trackPlaceholder: "Registration number",
    trackGo: "Open",
    trackHelp: "The 16-digit number you got when you filed.",
    near: "open reports near you",
    account: "Account",
    disclaimer:
      "Independent hackathon prototype. Not affiliated with or endorsed by any government body.",
    problemEyebrow: "The problem",
    problemTitle: "Eleven fields before you can say what went wrong.",
    problemBody:
      "To file today you must already know which department and service owns your problem. Most people find out much later that their report was sent to the wrong place.",
    removed: "Removed",
    kept: "What we still ask for",
    changedEyebrow: "What changed",
    howEyebrow: "How it works",
    realEyebrow: "Honesty",
    realTitle: "What's real and what's simulated",
    realBody:
      "No live government system is contacted. Every integration is a labelled mock, all data is synthetic, and the page below lists exactly what works today.",
    realCta: "Read what's real",
  },
  hi: {
    wordmark: "स्कैन और रिपोर्ट",
    kicker: "सार्वजनिक शिकायत के लिए प्रस्तावित साधन",
    lede: "जहाँ समस्या हुई, वहाँ कैमरा घुमाइए। विभाग हम ढूँढ लेंगे।",
    scanTitle: "स्कैन करके रिपोर्ट करें",
    scanSub: "बोर्ड, काउंटर, सूचना या टोकन पर्ची",
    talkTitle: "बोलकर दर्ज करें",
    talkSub: "बस बोलिए। बाकी सवाल यह खुद पूछ लेगा।",
    track: "शिकायत की स्थिति देखें",
    trackPlaceholder: "पंजीकरण संख्या",
    trackGo: "खोलें",
    trackHelp: "दर्ज करते समय मिली 16 अंकों की संख्या।",
    near: "शिकायतें आपके आसपास खुली हैं",
    account: "खाता",
    disclaimer:
      "स्वतंत्र हैकाथॉन प्रोटोटाइप। किसी सरकारी संस्था से संबद्ध या अनुमोदित नहीं।",
    problemEyebrow: "समस्या",
    problemTitle: "शिकायत लिखने से पहले ग्यारह खाने।",
    problemBody:
      "आज शिकायत दर्ज करने के लिए आपको पहले से पता होना चाहिए कि मामला किस विभाग और सेवा का है। अक्सर लोगों को बहुत बाद में पता चलता है कि शिकायत गलत जगह भेजी गई थी।",
    removed: "हटाए गए",
    kept: "अब भी ज़रूरी",
    changedEyebrow: "क्या बदला",
    howEyebrow: "कैसे काम करता है",
    realEyebrow: "पारदर्शिता",
    realTitle: "क्या असली है और क्या नकली",
    realBody:
      "किसी भी सरकारी सिस्टम से संपर्क नहीं किया जाता। सारा डेटा काल्पनिक है।",
    realCta: "विवरण पढ़ें",
  },
  ta: {
    wordmark: "ஸ்கேன் & புகார்",
    kicker: "பொதுப் புகாருக்கான முன்மொழியப்பட்ட கருவி",
    lede: "பிரச்சினை நடந்த இடத்தை நோக்கி கேமராவைக் காட்டுங்கள்.",
    scanTitle: "ஸ்கேன் செய்து புகார் அளியுங்கள்",
    scanSub: "பலகை, கவுண்டர், அறிவிப்பு அல்லது டோக்கன் சீட்டு",
    talkTitle: "பேசி பதிவு செய்யுங்கள்",
    talkSub: "பேசுங்கள். மீதியை இது கேட்டுக்கொள்ளும்.",
    track: "புகாரின் நிலையைப் பாருங்கள்",
    trackPlaceholder: "பதிவு எண்",
    trackGo: "திற",
    trackHelp: "பதிவு செய்தபோது கிடைத்த 16 இலக்க எண்.",
    near: "புகார்கள் அருகில் நிலுவையில்",
    account: "கணக்கு",
    disclaimer:
      "சுயேச்சையான ஹேக்கத்தான் முன்மாதிரி. எந்த அரசு அமைப்புடனும் தொடர்பில்லை.",
    problemEyebrow: "பிரச்சினை",
    problemTitle: "புகார் சொல்வதற்கு முன் பதினொரு கட்டங்கள்.",
    problemBody:
      "இன்று புகார் அளிக்க, எந்தத் துறை மற்றும் சேவை என்பதை நீங்களே தெரிந்திருக்க வேண்டும். பலருக்கு புகார் தவறான இடத்திற்குச் சென்றது தாமதமாகத்தான் தெரிகிறது.",
    removed: "நீக்கப்பட்டவை",
    kept: "இப்போதும் தேவை",
    changedEyebrow: "என்ன மாறியது",
    howEyebrow: "எப்படி வேலை செய்கிறது",
    realEyebrow: "வெளிப்படைத்தன்மை",
    realTitle: "எது உண்மை, எது உருவகம்",
    realBody: "எந்த அரசு அமைப்புடனும் தொடர்பு கொள்ளப்படவில்லை.",
    realCta: "விவரம் படிக்க",
  },
};

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ta", label: "தமிழ்" },
];

/* ===============================================================
   Icons — inline so the page has no dependencies
   =============================================================== */

const Viewfinder = ({ tight }: { tight: boolean }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
    <g
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      style={{
        transform: tight ? "scale(0.9)" : "scale(1)",
        transformOrigin: "center",
        transition: "transform var(--dur-base) var(--ease)",
      }}
    >
      <path d="M3 8V5a2 2 0 0 1 2-2h3" />
      <path d="M16 3h3a2 2 0 0 1 2 2v3" />
      <path d="M21 16v3a2 2 0 0 1-2 2h-3" />
      <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
    </g>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const Mic = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <rect x="9" y="2.5" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0" />
    <path d="M12 18v3.5" />
  </svg>
);

const Chevron = ({ dir = "right" }: { dir?: "right" | "down" }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    style={{ transform: dir === "down" ? "rotate(90deg)" : "none", transition: "transform var(--dur-base) var(--ease)" }}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);

const Pin = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);

const Search = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </svg>
);

const User = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" strokeLinecap="round" />
  </svg>
);

/* ===============================================================
   Page
   =============================================================== */

const OLD_FIELDS = [
  "Gender", "Premise number", "Locality", "Sub-locality",
  "Country", "State", "District", "Pincode",
  "Phone number", "E-mail address", "Security code",
];
const NEW_FIELDS = ["Name", "Mobile number", "Location permission"];

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [trackOpen, setTrackOpen] = useState(false);
  const [ref, setRef] = useState("");
  const [refError, setRefError] = useState("");
  const [hover, setHover] = useState<"scan" | "talk" | null>(null);
  const router = useRouter();

  const t = T[lang];
  const scriptClass =
    lang === "hi" ? "font-[family-name:var(--font-deva)]"
    : lang === "ta" ? "font-[family-name:var(--font-tamil)]"
    : "";

  function openReport() {
    const clean = ref.replace(/\s/g, "");
    if (!clean) { setRefError("Enter a registration number first."); return; }
    setRefError("");
    router.push(`/reports/${encodeURIComponent(clean)}`);
  }

  return (
    <div className={scriptClass}>
      {/* ---------------- Header ---------------- */}
      <header className="bg-seal text-paper">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-4 px-4 py-3">
          <div className="min-w-0">
            <p className="font-[family-name:var(--font-display)] text-[15px] font-medium tracking-[0.02em]">
              {t.wordmark}
            </p>
            <p className="truncate text-[11px] text-paper/70">{t.kicker}</p>
          </div>

          <div className="flex items-center gap-2">
            <div role="group" aria-label="Language" className="flex rounded-[var(--r-pill)] border border-paper/25 p-[2px]">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  aria-pressed={lang === l.code}
                  className={`rounded-[var(--r-pill)] px-2.5 py-1 text-[12px] transition-colors duration-[var(--dur-quick)] ${
                    lang === l.code ? "bg-paper text-seal" : "text-paper/85 hover:bg-paper/10"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <Link
              href="/auth"
              aria-label={t.account}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-paper/10"
            >
              <User />
            </Link>
          </div>
        </div>
      </header>

      <main id="main">
        {/* ---------------- Above the fold: the two options ---------------- */}
        <section className="mx-auto max-w-[1080px] px-4 pt-5 pb-8">
          <p className="mb-4 max-w-[46ch] text-[15px] leading-[1.5] text-ink-2 md:text-[17px]">
            {t.lede}
          </p>

          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            {/* Scan */}
            <Link
              href="/scan"
              prefetch
              onMouseEnter={() => setHover("scan")}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover("scan")}
              onBlur={() => setHover(null)}
              className="group flex items-center gap-3 rounded-[var(--r-md)] border border-rule bg-card p-4 transition-colors duration-[var(--dur-base)] hover:border-rule-strong md:min-h-[112px] md:p-5"
            >
              <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[var(--r-md)] bg-stamp text-white md:h-[54px] md:w-[54px]">
                <Viewfinder tight={hover === "scan"} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-[family-name:var(--font-display)] text-[17px] font-medium md:text-[21px]">
                  {t.scanTitle}
                </span>
                <span className="block text-[13px] leading-[1.4] text-ink-3 md:text-[14px]">
                  {t.scanSub}
                </span>
              </span>
              <span className="text-ink-4 transition-transform duration-[var(--dur-base)] group-hover:translate-x-0.5">
                <Chevron />
              </span>
            </Link>

            {/* Talk */}
            <Link
              href="/talk"
              prefetch
              onMouseEnter={() => setHover("talk")}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover("talk")}
              onBlur={() => setHover(null)}
              className="group flex items-center gap-3 rounded-[var(--r-md)] border border-rule bg-card p-4 transition-colors duration-[var(--dur-base)] hover:border-rule-strong md:min-h-[112px] md:p-5"
            >
              <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[var(--r-md)] bg-seal text-white md:h-[54px] md:w-[54px]">
                <Mic />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-[family-name:var(--font-display)] text-[17px] font-medium md:text-[21px]">
                  {t.talkTitle}
                </span>
                <span className="block text-[13px] leading-[1.4] text-ink-3 md:text-[14px]">
                  {t.talkSub}
                </span>
              </span>
              <span className="text-ink-4 transition-transform duration-[var(--dur-base)] group-hover:translate-x-0.5">
                <Chevron />
              </span>
            </Link>
          </div>

          {/* Track a report — expands inline, never navigates away */}
          <div className="mt-5 border-t border-rule pt-1">
            <button
              onClick={() => setTrackOpen((v) => !v)}
              aria-expanded={trackOpen}
              aria-controls="track-panel"
              className="touch flex w-full items-center gap-2 py-2 text-left"
            >
              <span className="text-ink-3"><Search /></span>
              <span className="text-[14px] text-ink-2">{t.track}</span>
              <span className="ml-auto text-ink-4">
                <Chevron dir={trackOpen ? "down" : "right"} />
              </span>
            </button>

            {trackOpen && (
              <div id="track-panel" className="pb-3">
                <div className="flex gap-2">
                  <input
                    value={ref}
                    onChange={(e) => { setRef(e.target.value); if (refError) setRefError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && openReport()}
                    placeholder={t.trackPlaceholder}
                    inputMode="numeric"
                    aria-label={t.trackPlaceholder}
                    aria-invalid={!!refError}
                    className="h-11 min-w-0 flex-1 rounded-[var(--r-sm)] border border-rule bg-card px-3 text-[15px] outline-none focus:border-stamp"
                  />
                  <button
                    onClick={openReport}
                    className="h-11 shrink-0 rounded-[var(--r-sm)] bg-ink px-4 text-[14px] font-medium text-paper transition-transform duration-[var(--dur-quick)] active:scale-[0.98]"
                  >
                    {t.trackGo}
                  </button>
                </div>
                <p className={`mt-1.5 text-[12px] ${refError ? "text-alert" : "text-ink-4"}`}>
                  {refError || t.trackHelp}
                </p>
              </div>
            )}
          </div>

          {/* Near me */}
          <Link
            href="/near-me"
            className="touch mt-2 flex items-center gap-2.5 rounded-[var(--r-sm)] bg-paper-2 px-3 py-2.5"
          >
            <span className="text-seal"><Pin /></span>
            <span className="text-[13px] text-ink-2">
              <span className="font-medium">14</span> {t.near}
            </span>
            <span className="ml-auto text-ink-3"><Chevron /></span>
          </Link>

          <p className="mt-5 text-center text-[11px] leading-relaxed text-ink-4">
            {t.disclaimer}
          </p>
        </section>

        {/* ================= Below the fold: for reviewers ================= */}

        <div className="border-t border-rule bg-card">
          <div className="mx-auto max-w-[1080px] px-4 py-10 md:py-14">
            <p className="mb-2 text-[12px] uppercase tracking-[0.12em] text-stamp">
              {t.problemEyebrow}
            </p>
            <h2 className="max-w-[22ch] text-ink">{t.problemTitle}</h2>
            <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.65] text-ink-2">
              {t.problemBody}
            </p>

            <div className="mt-7 grid gap-6 md:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="mb-2.5 text-[12px] font-medium uppercase tracking-[0.1em] text-ink-4">
                  {t.removed}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {OLD_FIELDS.map((f) => (
                    <li
                      key={f}
                      className="rounded-[var(--r-pill)] border border-rule px-2.5 py-1 text-[13px] text-ink-4 line-through decoration-alert/70 decoration-[1.5px]"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2.5 text-[12px] font-medium uppercase tracking-[0.1em] text-ink-4">
                  {t.kept}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {NEW_FIELDS.map((f) => (
                    <li
                      key={f}
                      className="rounded-[var(--r-pill)] border border-verify/35 bg-verify-tint px-2.5 py-1 text-[13px] font-medium text-verify"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[13px] leading-[1.55] text-ink-3">
                  Address, district, state and pincode are derived from the location
                  permission and stay editable. The captcha is replaced by rate limiting.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What changed */}
        <div className="mx-auto max-w-[1080px] px-4 py-10 md:py-14">
          <p className="mb-2 text-[12px] uppercase tracking-[0.12em] text-stamp">
            {t.changedEyebrow}
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              {
                h: "You don't pick the department",
                p: "A vision model reads the board, cross-checks the service point directory and your location, and tells you which office it found — with its confidence and the reason for it.",
              },
              {
                h: "You find out before you waste thirty days",
                p: "The system checks the likely service owner early, so you can choose the right public channel before time is lost.",
              },
              {
                h: "Eight complaints become one case",
                p: "If someone already reported the same counter, you add your voice in one tap and get notified when it's resolved — instead of filing a ninth ticket nobody connects.",
              },
            ].map((c) => (
              <div key={c.h} className="rounded-[var(--r-md)] border border-rule bg-card p-4">
                <h3 className="mb-1.5">{c.h}</h3>
                <p className="text-[14px] leading-[1.6] text-ink-2">{c.p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works — numbered because it genuinely is a sequence */}
        <div className="border-y border-rule bg-paper-2">
          <div className="mx-auto max-w-[1080px] px-4 py-10 md:py-14">
            <p className="mb-5 text-[12px] uppercase tracking-[0.12em] text-stamp">
              {t.howEyebrow}
            </p>
            <ol className="grid gap-x-8 gap-y-4 md:grid-cols-2">
              {[
                ["Scan", "Point at the board, counter, notice or token slip."],
                ["Identify", "The office is matched and shown with a confidence score."],
                ["Service check", "Confirm the right public service owner before filing."],
                ["Join or describe", "Add your voice to an open report, or speak a new one."],
                ["Review", "Every field the model produced stays editable. Your words stay yours."],
                ["File and follow", "Registration number, 30-day SLA, and an appeal if the closure doesn't hold up."],
              ].map(([h, p], i) => (
                <li key={h} className="flex gap-3 border-t border-rule pt-3">
                  <span className="font-[family-name:var(--font-display)] text-[13px] tabular-nums text-stamp">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium">{h}</span>
                    <span className="block text-[14px] leading-[1.55] text-ink-2">{p}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Honesty band */}
        <div className="mx-auto max-w-[1080px] px-4 py-10 md:py-14">
          <div className="rounded-[var(--r-md)] border border-seal/20 bg-seal-tint p-5 md:p-6">
            <p className="mb-2 text-[12px] uppercase tracking-[0.12em] text-seal">
              {t.realEyebrow}
            </p>
            <h2 className="max-w-[24ch]">{t.realTitle}</h2>
            <p className="mt-2 max-w-[62ch] text-[14px] leading-[1.6] text-ink-2">
              {t.realBody}
            </p>
            <Link
              href="/whats-real"
              className="mt-4 inline-flex items-center gap-1.5 rounded-[var(--r-sm)] bg-seal px-4 py-2.5 text-[14px] font-medium text-paper transition-transform duration-[var(--dur-quick)] active:scale-[0.98]"
            >
              {t.realCta} <Chevron />
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-rule bg-seal-deep text-paper/85">
        <div className="mx-auto flex max-w-[1080px] flex-col gap-2 px-4 py-6 text-[12px] md:flex-row md:items-center md:justify-between">
          <p className="max-w-[60ch] leading-relaxed">{t.disclaimer}</p>
          <nav className="flex gap-4">
            <Link href="/whats-real" className="underline underline-offset-2">What&apos;s real</Link>
            <Link href="/reports">My reports</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
