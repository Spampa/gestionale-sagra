import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL;

export async function POST(request: Request) {
    const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(await request.json())
    })

    const data = await res.json();

    console.log(data);

    return NextResponse.json(data);
}