"use client"

import { useOrder } from "@/contexts/OrderContext"
import { useRouter } from "next/navigation";

import {
    Table,
    TableBody,
    TableFooter,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import CategorySection from "@/components/categorySectionRecap";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Category } from "@/types/category";

export default function Recap() {
    const { order } = useOrder();
    const [categories, setCategories] = useState<Array<Category>>([]);

    const router = useRouter();

    useEffect(() => {
        async function fetchCategories() {
            const data = await fetch("/api/categories").then(res => res.json());
            setCategories(data);
        }
        fetchCategories();
    }, []);

    function createOrder() {
        fetch("/api/orders", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then(async res => {
            const data = await res.json();
            router.push(`/checkout/${data?.id || ""}`);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="mt-20">
            <Table >
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Alimento</TableHead>
                        <TableHead></TableHead>
                        <TableHead className="text-right">Quantità</TableHead>
                        <TableHead className="text-right">Prezzo</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        categories.map(category => (
                            <CategorySection
                                key={category.id}
                                foodsOrderd={order.foodsOrdered}
                                category={category}
                            />
                        ))
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">{order.price}€</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className="flex place-content-center my-5">
                <Button onClick={() => createOrder()}>
                    Crea Ordine
                </Button>
            </div>

        </div>
    )
}