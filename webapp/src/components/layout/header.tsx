"use client"

import { Button } from "../ui/button"
import { ShoppingCart, Home } from "lucide-react"

import Link from "next/link"

import { useOrder } from "@/contexts/OrderContext";
import { useState, useEffect } from "react"

export default function Header() {
    const { order } = useOrder();
    const [price, setPrice] = useState<string>("0.00");

    useEffect(() => {
        setPrice(Number(order.price).toFixed(2));
    }, [order])

    return (
        <header className="fixed top-0 w-full flex p-3 place-content-between items-center z-50 bg-white">
            <h1 className="font-bold text-lg text-primary">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
            <div className="flex flex-row gap-1">
                <Button asChild size="icon">
                    <Link href={"/menu"}>
                        <Home />
                    </Link>
                </Button>
                <Button variant="outline" className="flex flex-row gap-3" asChild>
                    <Link href={"/recap"}>
                        <ShoppingCart />
                        <p className="min-w-16 text-end">{price} €</p>
                    </Link>
                </Button>
            </div>
        </header>
    )
}