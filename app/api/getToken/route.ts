import { NextResponse } from "next/server";
import { countToken, getMessage } from "../aiService";

export async function POST(request: Request) {
    const { text } = await request.json();
    const response = await countToken(text);
    return NextResponse.json({ message: response });
}