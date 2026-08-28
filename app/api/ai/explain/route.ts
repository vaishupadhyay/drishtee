import { NextResponse } from "next/server";
export async function POST() { return NextResponse.json({ explanation: "The team has received the report and is checking the next action." }); }
