import { NextResponse } from "next/server";
export async function POST() { return NextResponse.json({ simulated: true, message: "Read-aloud is simulated in this prototype." }); }
