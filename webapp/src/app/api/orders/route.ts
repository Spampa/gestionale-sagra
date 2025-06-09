import { FoodsOrderd } from '@/types/foodOrdered';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.API_URL;

export async function POST(request: Request) {
    const reqBody = await request.json();

    const foodsOrdered = (reqBody.foodsOrdered || []).map((order: FoodsOrderd) => ({
        quantity: order.quantity,
        foodId: order.food.id
    }));

    const newBody = {
        ...reqBody,
        foodsOrdered
    };

    const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(await newBody)
    })

    const data = await res.json();

    return NextResponse.json(data);
}

export async function GET() {

    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value || "redondi";

    const res = await fetch(`${API_URL}/orders`, {
        method: "GET",
        headers: {
            "authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        return NextResponse.json({ error: data.message || 'Not Found' }, { status: res.status });
    }

    return NextResponse.json(data);
}