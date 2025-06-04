import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.API_URL;

export async function GET() {

    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value || "redondi";

    const res = await fetch(`${API_URL}/orders/day/today`, {
        method: "GET",
        headers: {
            "authorization": `Bearer ${token}`
        }
    });
    
    const data = await res.json();
    
    return NextResponse.json(data);
}