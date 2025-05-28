"use client"

interface Props {
    food: Food,
    quantity: number,
    smallView?: boolean
}

import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Food } from "@/types/food";


export default function FoodRowRecap({ food, quantity, smallView = false }: Props) {
    return (
        <TableRow>
            <TableCell 
                className={`
                    font-medium
                    ${
                        food.name.length > 25 ? "text-[10px] md:text-sm" : "text-sm"
                    }
                `}
            >
                { food.name }
            </TableCell>
            {
                smallView ? <></> : <TableCell></TableCell>
            }
            <TableCell className="text-right">{quantity}</TableCell>
            <TableCell className="text-right">{Number(food.price * quantity).toFixed(2)}€</TableCell>
        </TableRow>
    )
}