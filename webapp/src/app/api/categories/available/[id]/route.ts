import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

interface Params {
    id: string;
}

const API_URL = process.env.API_URL;

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<Params> }
) {
    const { id } = await params;
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value || "redondi";

    const res = await fetch(`${API_URL}/categories/available/${id}`, {
        method: "PATCH",
        headers: {
            "authorization": `Bearer ${token}`
        }
    });

    revalidatePath("/api/categories");
    revalidatePath("/api/categories/available");

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}