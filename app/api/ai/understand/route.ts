import { NextResponse } from "next/server";
export async function POST() { return NextResponse.json({ location: "Government Hospital Pharmacy", department: "Public Health Services", service: "Medicine availability", nature: "Service not available", urgency: "Medium" }); }
