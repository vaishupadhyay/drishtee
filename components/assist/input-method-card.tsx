import Link from "next/link";

export function InputMethodCard({ icon, title, description, href, tone }: { icon: string; title: string; description: string; href: string; tone: "mint" | "sky" }) {
  const palette = tone === "mint" ? "border-[#CFECD9] bg-mint text-mint-strong" : "border-[#D5E3FA] bg-sky text-sky-strong";
  return <Link href={href} className={`group min-h-[188px] rounded-[20px] border p-5 transition hover:-translate-y-1 hover:shadow-[0_14px_32px_rgb(23_52_92_/_10%)] ${palette}`}><span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-2xl">{icon}</span><h2 className="mt-4 text-[20px] font-extrabold tracking-[-.025em] text-navy">{title}</h2><p className="mt-2 max-w-[28ch] text-sm leading-5 text-[#4E6070]">{description}</p><span className="mt-5 inline-flex text-xs font-extrabold text-navy">Choose this method →</span></Link>;
}
