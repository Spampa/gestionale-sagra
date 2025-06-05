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
import { cn } from "@/lib/utils";

interface TableRecapProp {
    order: Order,
    smallView?: boolean,
    className?: string
}

export default function TableRecap({ order, smallView = false, className }: TableRecapProp) {

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
                    <TableHead className={`${smallView ? "w-[100px]" : "w-[200px]"}`}>Alimento</TableHead>
                    {
                        smallView ? <></> : <TableHead></TableHead>
                    }
                    <TableHead className="text-right">Quantità</TableHead>
                    <TableHead className="text-right">Prezzo</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    categories.map(category => (
                        <CategorySectionRecap key={category.id} category={category} foodsOrderd={order.foodsOrdered} className={cn("bg-secondary", className)} smallView={smallView} />
                    ))
                }
            </TableBody>
            <TableFooter className={cn("bg-secondary", className)}>
                <TableRow>
                    <TableCell>Totale</TableCell>
                    <TableCell></TableCell>
                    {
                        smallView ? <></> : <TableCell></TableCell>
                    }
                    <TableCell className="text-right">{order?.price}€</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}