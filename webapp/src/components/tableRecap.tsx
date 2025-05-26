import { Order } from "@/types/order";

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface TableRecapProp {
    order: Order
}

export default function TableRecap({ order }: TableRecapProp) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Alimento</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Quantità</TableHead>
                    <TableHead className="text-right">Prezzo</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    order.foodsOrdered.map(foodOrder => (
                        <TableRow key={foodOrder.food.id}>
                            <TableCell className="font-medium">{foodOrder.food.name}</TableCell>
                            <TableCell>
                                {foodOrder.food.category?.name
                                    ? foodOrder.food.category.name.charAt(0).toUpperCase() + foodOrder.food.category.name.slice(1)
                                    : ""}
                            </TableCell>
                            <TableCell className="text-right">{foodOrder.quantity}</TableCell>
                            <TableCell className="text-right">{(foodOrder.food.price * foodOrder.quantity).toFixed(2)}€</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>Totale</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">{order?.price}€</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}