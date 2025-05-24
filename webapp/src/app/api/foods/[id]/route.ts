import { NextRequest, NextResponse } from 'next/server';

interface Params {
    id: string;
}

const API_URL = process.env.API_URL;

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<Params> }
) {
    const { id } = await params;
    const res = await fetch(`${API_URL}/foods/${id}`);
    const data = await res.json();
    return NextResponse.json(data);
}