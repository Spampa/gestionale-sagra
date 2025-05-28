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
import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import CategorySectionRecap from "./categorySectionRecap";

interface TableRecapProp {
    order: Order
}

export default function TableRecap({ order }: TableRecapProp) {

    const [categories, setCategories] = useState<Array<Category>>([]);

    useEffect(() => {
        if (!order?.foodsOrdered) return;
        const uniqueCategories: Category[] = [];
        order.foodsOrdered.forEach(foodOrder => {
            const cat = foodOrder.food.category;
            if (cat && !uniqueCategories.some(c => c.id === cat.id)) {
                uniqueCategories.push(cat);
            }
        });
        setCategories(uniqueCategories);
    }, [order]);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Alimento</TableHead>
                    <TableHead className="text-right">Quantità</TableHead>
                    <TableHead className="text-right">Prezzo</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    categories.map(category => (
                        <CategorySectionRecap category={category} foodsOrderd={order.foodsOrdered} className=" bg-secondary" smallView/>
                    ))
                }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>Totale</TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">{order?.price}€</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}