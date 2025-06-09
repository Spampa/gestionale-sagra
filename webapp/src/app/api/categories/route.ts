import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const API_URL = process.env.API_URL;

export async function GET() {
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const body = await request.json();
    
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value || "redondi";

    const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        revalidatePath("/api/categories");
        revalidatePath("/api/categories/available");
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}