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
            <TableCell className="text-right">{food.price * quantity}€</TableCell>
        </TableRow>
    )
}