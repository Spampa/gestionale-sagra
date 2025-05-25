"use client"

interface Props {
    food: Food,
    quantity: number
}

import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Food } from "@/types/food";


export default function FoodRowRecap({ food, quantity }: Props) {
    return (
        <TableRow>
            <TableCell className="font-medium">{food.name}</TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right">{quantity}</TableCell>
            <TableCell className="text-right">{Number(food.price * quantity).toFixed(2)}€</TableCell>
        </TableRow>
    )
}