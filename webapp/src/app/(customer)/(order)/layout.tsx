"use client"

import { useEffect } from "react"
import Header from "@/components/layout/header"
import { useOrder } from "@/contexts/OrderContext"
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { order } = useOrder();
    const router = useRouter();

    useEffect(() => {
        if (!(order.customer && order.table)) {
            router.push("/");
        }
    }, [order, router]);

    // Opzionalmente, evita di mostrare nulla mentre aspetti il redirect
    if (!(order.customer && order.table)) {
        return (
            <div className="h-screen w-full flex items-center place-content-center">
                <LoaderCircle className=" h-20 animate-spin"  />
            </div>
        );
    }

    return (
        <main>
            <Header />
            {children}
        </main>
    );
}
