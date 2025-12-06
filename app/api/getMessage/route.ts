import { NextResponse } from "next/server";
import { getMessage } from "../aiService";

export async function POST(request: Request) {
    const { text } = await request.json();
    const response = await getMessage(text);
    return NextResponse.json({ message: response });
}