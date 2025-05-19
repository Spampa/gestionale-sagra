"use client"

import Header from "@/components/header"

import { useOrder } from "@/contexts/OrderContext"
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { order } = useOrder();
    const router = useRouter();

    if(!(order.customer && order.table)){
        return router.push("/");
    }

    return (
        <main>
            <Header />
            {children}
        </main>
    )
}
