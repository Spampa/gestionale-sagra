
import { NextResponse } from 'next/server';
import { success } from 'zod/v4';

const API_URL = process.env.API_URL;

export async function POST(request: Request) {

    const { username, password } = await request.json();

    if(!(username && password)){
        return NextResponse.json({ message: "Bad request"}, { status: 400 });
    }

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: data.message || 'Login fallito' }, { status: response.status });
        }

        return NextResponse.json(
            data.user, 
            {
                status: 200,
                headers: {
                    "Set-Cookie": `token=${data.token}; HttpOnly; Path=/; SameSite=Strict; Secure`
                }
            }
        );
    } catch (e) {
        return NextResponse.json({ error: 'Errore di rete' }, { status: 500 });
    }
}