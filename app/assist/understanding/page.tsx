"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AssistShell } from "@/components/assist/assist-shell";
import { UnderstandingCard, type Attribute } from "@/components/assist/understanding-card";
import { HelperInviteCard } from "@/components/assist/helper-invite-card";
const attributes:Attribute[]=[{label:"Location",value:"Taluk Office, Coimbatore North"},{label:"Department",value:"Revenue Department"},{label:"Service",value:"Certificate delay"},{label:"Nature of issue",value:"Delay in service"},{label:"Urgency",value:"Medium"}];
export default function UnderstandingPage(){const [shown,setShown]=useState(0);useEffect(()=>{const timer=window.setInterval(()=>setShown(count=>Math.min(count+1,attributes.length)),500);return()=>window.clearInterval(timer);},[]);const complete=shown===attributes.length;return <AssistShell eyebrow="Understanding your issue" title={complete?"Does this look right?":"We’re putting the details together."}><p className="assist-body mt-5 text-[#526074]">{["Finding the location…","Matching the department…","Understanding what happened…"][Math.min(2,Math.floor(shown/2))]}</p><UnderstandingCard attributes={attributes.slice(0,shown)}/>{complete&&<><div className="mt-6 flex flex-wrap gap-3"><Link href="/assist/helper" className="assist-button assist-button-primary inline-flex items-center px-5">Yes, this is right</Link><button className="assist-button border border-assist-line bg-white px-5">Something’s not right</button></div><HelperInviteCard/></>}</AssistShell>;}
