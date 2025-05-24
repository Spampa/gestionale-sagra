import { FoodsOrderd } from '@/types/foodOrdered';
import { NextResponse } from 'next/server';

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