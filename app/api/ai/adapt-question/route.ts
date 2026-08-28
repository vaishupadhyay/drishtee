import { NextResponse } from "next/server";
export async function POST() { return NextResponse.json({ question: "When did this happen?", options: ["Today", "This week", "Longer ago"] }); }
