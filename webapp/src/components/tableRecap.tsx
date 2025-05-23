import { Order } from "@/types/order";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface TableRecapProp {
    order: Order
}

export default function TableRecap({ order }: TableRecapProp) {
    return (
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
                    order.foodsOrdered.map(foodOrder => (
                        <TableRow id={foodOrder.food.id.toString()}>
                            <TableCell className="font-medium">{foodOrder.food.name}</TableCell>
                            <TableCell></TableCell>
                            <TableCell className="text-right">{foodOrder.quantity}</TableCell>
                            <TableCell className="text-right">{foodOrder.food.price * foodOrder.quantity}€</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}