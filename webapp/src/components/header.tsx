"use client"

import { Button } from "./ui/button"
import { ShoppingCart, Home } from "lucide-react"

import Link from "next/link"

import { Badge } from "@/components/ui/badge"

import { useOrder } from "@/contexts/OrderContext";
import { useState, useEffect } from "react"

export default function Header() {
    const { order, setOrder } = useOrder();
    const [price, setPrice] = useState<number>(0);

    useEffect(() => {
        setPrice(order.price);
    }, [order])

    return (
        <header className="fixed top-0 w-full flex p-3 bg-secondary place-content-between items-center z-50">
            <h1 className="font-bold text-lg">Insieme in Festa</h1>
            <div className="flex flex-row gap-1">
                <Button asChild size="icon">
                    <Link href={"/menu"}>
                        <Home />
                    </Link>
                </Button>
                <Button variant="outline" className="flex flex-row gap-3" asChild>
                    <Link href={"/recap"}>
                        <ShoppingCart />
                        <p className="min-w-12 text-center">{order.price} €</p>
                    </Link>
                </Button>
            </div>
        </header>
    )
}