import Link from "next/link";

const badges = ["Secure & Private", "Transparent Process", "Timely Action", "Citizen First"];
const steps = [
  ["Capture / Chat", "Scan or describe the issue in your own words."],
  ["We Understand", "AI extracts details and suggests the right category and department."],
  ["You Review", "Review, edit if needed, and confirm the details."],
  ["Submit", "Your grievance is submitted securely."],
  ["Track & Update", "Track status and get updates in real time."],
];
const layers = [
  ["Input flexibility", "Speak · Scan · Type · Upload"],
  ["AI understanding", "Location · Department · Service · Issue nature · Urgency · Access barriers"],
  ["Adaptive experience", "Language complexity · Questions · Text size · Interaction · Explanations"],
  ["Assisted completion", "Trusted Helper Mode · Caregiver support · Guided drafting · Read aloud"],
  ["Understandable follow-up", "Plain-language status · Voice updates · Explain this response · Solved / Not Solved"],
];
const why = [
  ["Faster Reporting", "Start in the way that feels easiest, then let the system organise the details."],
  ["Better Accountability", "A clearer report helps the right service owner understand what needs attention."],
  ["Stronger Communities", "See an ongoing issue and add your voice instead of starting from zero."],
  ["For Every Citizen", "Flexible language and assistance options keep the process open to more people."],
  ["Accessible for All", "Adjustable text, plain explanations and read-aloud support make every step easier."],
];
const testimonials = [
  ["It made a complicated process feel like one clear conversation.", "Priya S.", "Fictional teacher persona"],
  ["I could explain the issue in my own words and check every detail before filing.", "Ravi A.", "Fictional shopkeeper persona"],
  ["The simple status updates helped me understand what was happening next.", "Meera N.", "Fictional caregiver persona"],
];

function LogoMark() {
  return <span className="grid h-10 w-10 place-items-center rounded-full bg-[linear-gradient(135deg,var(--assist-blue),var(--assist-green))] text-white"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12c2.1-3.4 4.8-5.1 8-5.1s5.9 1.7 8 5.1c-2.1 3.4-4.8 5.1-8 5.1S6.1 15.4 4 12Z" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.8"/></svg></span>;
}

function Brand() {
  return <span className="flex items-center gap-2.5"><LogoMark /><span><span className="block text-[19px] font-extrabold tracking-[-.04em] text-navy">Drishtee</span><span className="block text-[9px] font-bold uppercase tracking-[.08em] text-[#6B7A8F]">Your Voice. Our Action.</span></span></span>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-surface text-navy">
      <header className="border-b border-assist-line bg-surface/95">
        <div className="mx-auto flex min-h-20 w-[min(1180px,calc(100%-32px))] items-center justify-between gap-4">
          <Link href="/" aria-label="Drishtee home"><Brand /></Link>
          <nav className="hidden items-center gap-5 text-[13px] font-semibold text-[#52637A] lg:flex"><a href="#how">How It Works</a><a href="#assist">My Grievances</a><a href="#track">Track Status</a><a href="#resources">Resources</a><a href="#about">About Us</a></nav>
          <div className="flex items-center gap-2"><button className="hidden rounded-full border border-assist-line bg-white px-3 py-2 text-xs font-bold text-[#45566D] sm:block">English ▾</button><Link href="/auth" className="hidden rounded-full border border-assist-line bg-white px-3 py-2 text-xs font-bold text-[#45566D] md:block">Login / Sign up</Link><Link href="/scan" className="rounded-full bg-navy px-4 py-2.5 text-xs font-bold text-white transition hover:bg-navy-2 active:scale-[.98]">Report Now</Link></div>
        </div>
      </header>

      <main>
        <section className="overflow-hidden py-14 md:py-[74px]">
          <div className="mx-auto grid w-[min(1180px,calc(100%-32px))] items-center gap-12 lg:grid-cols-[1.06fr_.94fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[.13em] text-assist-blue">A clearer way to be heard</p>
              <h1 className="mt-3 max-w-[680px] font-[family-name:var(--font-display)] text-[clamp(42px,5.25vw,68px)] font-semibold leading-[.99] tracking-[-.055em] text-navy">Your voice starts here.<br /><span className="bg-[linear-gradient(100deg,var(--assist-blue),var(--assist-green))] bg-clip-text text-transparent">Change begins here.</span></h1>
              <p className="mt-5 max-w-[570px] text-[17px] leading-[1.65] text-[#526074]">Drishtee helps you describe a public-service problem in the way that works for you, understand what happens next, and stay connected until it is resolved.</p>
              <div className="mt-6 flex flex-wrap gap-2">{badges.map((badge) => <span key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-assist-line bg-white px-2.5 py-1.5 text-[11px] font-bold text-[#43556D]"><span className="text-assist-green">✓</span>{badge}</span>)}</div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <Link href="/scan" className="relative min-h-[178px] rounded-[20px] border border-[#CFECD9] bg-mint p-5 transition hover:-translate-y-1 hover:shadow-[0_14px_32px_rgb(23_52_92_/_10%)]"><span className="absolute right-4 top-4 rounded-full bg-white px-2 py-1 text-[10px] font-extrabold text-mint-strong">Recommended</span><span className="grid h-10 w-10 place-items-center rounded-xl bg-mint-strong text-lg text-white">⌁</span><h2 className="mt-4 text-[19px] font-extrabold tracking-[-.025em]">Scan and Report</h2><p className="mt-1 text-xs leading-5 text-[#4E6070]">Show a sign, notice, receipt or counter, then tell us what happened.</p><span className="mt-4 inline-flex rounded-full bg-mint-strong px-2.5 py-1.5 text-[11px] font-extrabold text-white">Start scanning →</span></Link>
                <Link href="/talk" className="min-h-[178px] rounded-[20px] border border-[#D5E3FA] bg-sky p-5 transition hover:-translate-y-1 hover:shadow-[0_14px_32px_rgb(23_52_92_/_10%)]"><span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-strong text-lg text-white">◌</span><h2 className="mt-4 text-[19px] font-extrabold tracking-[-.025em]">Talk to Chatbot</h2><p className="mt-1 text-xs leading-5 text-[#4E6070]">Start with a guided prompt or type the issue in your own words.</p><span className="mt-4 inline-flex rounded-full bg-sky-strong px-2.5 py-1.5 text-[11px] font-extrabold text-white">Start a chat →</span></Link>
              </div>
            </div>
            <div className="relative mx-auto min-h-[410px] w-full max-w-[500px] lg:min-h-[545px]">
              <div className="absolute inset-[10px_0_14px_32px] overflow-hidden rounded-[42%_58%_42%_58%_/_38%_38%_62%_62%] bg-[linear-gradient(145deg,#DDEBFC,#DFF4E6)]"><div className="absolute left-1/2 top-[72px] h-[310px] w-[310px] -translate-x-1/2 rotate-[-18deg] rounded-[46%_54%_49%_51%] bg-[linear-gradient(155deg,var(--assist-blue),var(--assist-green))] opacity-90" /><div className="absolute bottom-[-62px] right-7 h-[260px] w-[240px] rotate-[18deg] rounded-[48%_48%_8px_8px] bg-[#F6D4B3] opacity-80" /></div>
              <div className="absolute left-[13%] top-12 w-[62%] rounded-[19px] border border-white/70 bg-white/90 p-5"><p className="text-[11px] font-bold text-[#617087]">Drishtee Assist is listening</p><div className="mt-3 flex h-11 items-center gap-1">{[18,35,24,46,31,52,29,41,22,36,18].map((height, index) => <span key={index} className="w-1.5 rounded-full bg-[linear-gradient(var(--assist-blue),var(--assist-green))]" style={{ height }} />)}</div></div>
              <div className="absolute bottom-2 right-0 flex w-[min(270px,73%)] items-center gap-3 rounded-2xl border border-assist-line bg-white p-3.5 shadow-[0_14px_35px_rgb(11_31_61_/_13%)]"><span className="grid h-9 w-9 place-items-center rounded-full bg-mint font-bold text-mint-strong">✓</span><span><strong className="block text-[13px]">Real voices. Real impact.</strong><span className="mt-0.5 block text-[11px] leading-4 text-[#637288]">Clearer reports, understandable next steps.</span></span></div>
            </div>
          </div>
        </section>

        <section id="how" className="border-y border-assist-line bg-white py-16 md:py-20"><div className="mx-auto w-[min(1180px,calc(100%-32px))]"><SectionTitle eyebrow="How it works" title="From what happened to what happens next." body="One connected journey, with you in control of every detail before it is filed." /><div className="mt-11 grid gap-5 md:grid-cols-5">{steps.map(([title, body], index) => <article className="text-center" key={title}><span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-[#BFD3ED] bg-sky text-sm font-extrabold text-assist-blue">0{index + 1}</span><h3 className="mt-4 text-[15px] font-extrabold">{title}</h3><p className="mx-auto mt-2 max-w-[175px] text-xs leading-5 text-[#657389]">{body}</p></article>)}</div></div></section>

        <section id="assist" className="py-16 md:py-20"><div className="mx-auto w-[min(1180px,calc(100%-32px))]"><SectionTitle eyebrow="Drishtee Assist" title="Support that adapts to the person, not the form." body="Each layer makes it easier to share what matters and understand the response." /><div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{layers.map(([title, body], index) => <article className="min-h-[245px] rounded-2xl border border-assist-line bg-white p-5" key={title}><span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-[11px] font-extrabold text-white">0{index + 1}</span><h3 className="mt-4 text-[16px] font-extrabold leading-5">{title}</h3><p className="mt-3 text-xs leading-5 text-[#617087]">{body}</p></article>)}</div></div></section>

        <section id="track" className="border-y border-assist-line bg-white py-16 md:py-20"><div className="mx-auto w-[min(1180px,calc(100%-32px))]"><SectionTitle eyebrow="Progress at a glance" title="Built around follow-through." /><div className="mt-10 grid overflow-hidden rounded-2xl border border-assist-line bg-surface sm:grid-cols-2 lg:grid-cols-4">{[["1.2M+", "Issues Reported"], ["85%", "Issues Resolved"], ["7.4", "Avg. Days to Resolve"], ["92%", "Citizen Satisfaction"]].map(([value, label]) => <div className="border-b border-assist-line p-6 text-center last:border-b-0 sm:nth-[2]:border-l lg:border-b-0 lg:border-l" key={label}><strong className="block text-[33px] font-extrabold tracking-[-.055em]">{value}</strong><span className="mt-1 block text-xs font-semibold text-[#637288]">{label}</span></div>)}</div><p className="mt-3 text-center text-[11px] text-[#7A8798]">Illustrative figures — demo data</p></div></section>

        <section className="py-16 md:py-20"><div className="mx-auto w-[min(1180px,calc(100%-32px))]"><SectionTitle eyebrow="Why Drishtee" title="Small improvements that make a real difference." /><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{why.map(([title, body], index) => <article className="rounded-2xl border border-assist-line bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_12px_27px_rgb(11_31_61_/_8%)]" key={title}><span className="grid h-10 w-10 place-items-center rounded-xl bg-sky text-lg font-bold text-assist-blue">{["↗", "✓", "◌", "◎", "↔"][index]}</span><h3 className="mt-4 text-[16px] font-extrabold">{title}</h3><p className="mt-2 text-[13px] leading-5 text-[#647287]">{body}</p></article>)}</div><div className="mt-9 flex flex-wrap justify-center gap-2">{["Secure by Design", "Your Data, Your Control", "Privacy First", "Transparent Process"].map((item) => <span key={item} className="rounded-full border border-assist-line bg-white px-3 py-2 text-xs font-bold text-[#43556D]">✓ <span className="ml-1">{item}</span></span>)}</div></div></section>

        <section className="border-y border-assist-line bg-white py-16 md:py-20"><div className="mx-auto w-[min(1180px,calc(100%-32px))]"><SectionTitle eyebrow="Prototype voices" title="Voices that inspire us." body="Illustrative scenarios, created for this prototype." /><div className="mt-10 grid gap-4 md:grid-cols-3">{testimonials.map(([quote, name, role]) => <article className="rounded-2xl border border-assist-line p-6" key={name}><p className="text-[16px] font-semibold leading-6 text-navy">“{quote}”</p><div className="mt-6 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-mint text-xs font-extrabold text-mint-strong">{name.slice(0, 1)}</span><span><strong className="block text-xs">{name}</strong><span className="block text-[11px] text-[#778397]">{role}</span></span></div></article>)}</div><div className="mt-5 flex justify-center gap-1.5"><span className="h-1.5 w-5 rounded-full bg-assist-blue" /><span className="h-1.5 w-1.5 rounded-full bg-[#C7D2DF]" /><span className="h-1.5 w-1.5 rounded-full bg-[#C7D2DF]" /></div></div></section>

        <section className="bg-navy py-14 text-white md:py-16"><div className="mx-auto flex w-[min(1180px,calc(100%-32px))] flex-col items-start justify-between gap-7 md:flex-row md:items-center"><div><h2 className="max-w-[650px] text-[clamp(30px,3.6vw,46px)] font-semibold tracking-[-.045em]">Let&apos;s build better communities together.</h2><p className="mt-2 text-[15px] text-[#C8D5E6]">Report. Track. Resolve. Together.</p></div><Link href="/scan" className="rounded-full bg-white px-5 py-3.5 text-[13px] font-extrabold text-navy active:scale-[.98]">Report Now →</Link></div></section>
      </main>

      <footer id="resources" className="bg-[#07172D] pt-12 text-[#C8D5E6]"><div className="mx-auto w-[min(1180px,calc(100%-32px))]"><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.25fr]"><div><Brand /><p className="mt-4 max-w-[255px] text-xs leading-5 text-[#9EB0C7]">A thoughtful, human-centred way to describe, follow and understand public-service concerns.</p></div><FooterColumn title="Quick Links" links={["My Grievances", "Track Status", "How it Works", "Help & Support"]} /><FooterColumn title="Resources" links={["FAQs", "Guidelines", "Privacy Policy", "Terms of Use"]} /><FooterColumn title="About" links={["About Us", "Our Approach", "Impact", "Contact Us"]} /><div id="about"><h3 className="mb-3 text-xs font-extrabold text-white">Stay Connected</h3><div className="flex overflow-hidden rounded-full border border-[#35516F]"><input className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-[11px] text-white outline-none" placeholder="Email address" aria-label="Email address" type="email" /><button className="bg-assist-green px-3 text-[11px] font-extrabold text-white">Join</button></div><div className="mt-4 flex gap-2"><span className="grid h-7 w-7 place-items-center rounded-full border border-[#35516F] text-[11px] font-bold">in</span><span className="grid h-7 w-7 place-items-center rounded-full border border-[#35516F] text-[11px] font-bold">f</span><span className="grid h-7 w-7 place-items-center rounded-full border border-[#35516F] text-[10px] font-bold">ig</span></div></div></div><p className="mt-10 border-t border-[#203B58] py-5 text-center text-[11px] text-[#8FA3BB]">Independent hackathon prototype. Not affiliated with or endorsed by any government body.</p></div></footer>
    </div>
  );
}

function SectionTitle({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <div className="mx-auto max-w-[670px] text-center"><span className="text-[11px] font-extrabold uppercase tracking-[.12em] text-assist-blue">{eyebrow}</span><h2 className="mt-2 text-[clamp(29px,3.4vw,42px)] font-semibold tracking-[-.045em] text-navy">{title}</h2>{body && <p className="mt-3 text-[15px] leading-6 text-[#617087]">{body}</p>}</div>;
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return <div><h3 className="mb-3 text-xs font-extrabold text-white">{title}</h3><ul className="grid gap-2 text-xs text-[#A7B7CA]">{links.map((link) => <li key={link}><a href="#resources">{link}</a></li>)}</ul></div>;
}
