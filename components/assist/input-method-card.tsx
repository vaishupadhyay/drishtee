import Link from "next/link";
import { AssistIcon } from "@/components/assist/icons";
const tones={blue:"bg-sky text-sky-strong",green:"bg-mint text-mint-strong",amber:"bg-[#FFF3DE] text-[#B76700]",violet:"bg-[#F1ECFF] text-[#7450BD]"};
export function InputMethodCard({icon,title,description,href,tone}:{icon:"mic"|"scan"|"type"|"upload";title:string;description:string;href:string;tone:keyof typeof tones}) { return <Link href={href} className="assist-card block min-h-40 focus:outline-none"><span className={`grid h-11 w-11 place-items-center rounded-xl ${tones[tone]}`}><AssistIcon name={icon}/></span><h2 className="assist-label mt-4 text-navy">{title}</h2><p className="assist-body mt-1 text-[#526074]">{description}</p></Link>; }
