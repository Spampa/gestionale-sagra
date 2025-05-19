"use client"

import { useEffect, useState } from "react";

interface Props {
    id: number
    quantity: number
}

import {
    TableCell,
    TableRow,
} from "@/components/ui/table"


export default function FoodCheckout({ id, quantity }: Props) {
    const [food, setFood] = useState({ name: "", price: 0 });

    useEffect(() => {
        async function getFood() {
            const data = await fetch(`/api/foods/${id}`).then(res => res.json())
            setFood(data);
        }
        getFood();
    }, [])

    return (
        <TableRow>
            <TableCell className="font-medium">{food.name}</TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right">{quantity}</TableCell>
            <TableCell className="text-right">{food.price * quantity}€</TableCell>
        </TableRow>
    )
}