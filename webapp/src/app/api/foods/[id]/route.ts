import { NextResponse } from 'next/server';

interface Params {
    id: string;
}

const API_URL = process.env.API_URL;

export async function GET(
    request: Request,
    { params }: { params: Params } // params è il secondo argomento
) {
    const { id } = await params;
    const res = await fetch(`${API_URL}/foods/${id}`);
    const data = await res.json();
    return NextResponse.json(data);
}