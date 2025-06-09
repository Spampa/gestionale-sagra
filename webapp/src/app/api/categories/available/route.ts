import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL;

export async function GET() {
    const res = await fetch(`${API_URL}/categories/available`, { next: { revalidate: 3600 }});
    const data = await res.json();
    return NextResponse.json(data);
}