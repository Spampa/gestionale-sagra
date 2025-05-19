import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL;

export async function GET(request: Request) {
    const res = await fetch(`${API_URL}/categories`);
    const data = await res.json();
    return NextResponse.json(data);
}