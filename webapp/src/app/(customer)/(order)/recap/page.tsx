"use client"

import { useOrder } from "@/contexts/OrderContext"
import FoodCheckout from "@/components/foodCheckout";
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
import { Button } from "@/components/ui/button";

export default function Recap() {
    const { order, setOrder } = useOrder();
    const router = useRouter();

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
                        order.foodOrdered.map(food => {
                            return (
                                // Render something for each food item, e.g.:
                                <FoodCheckout key={food.foodId} id={food.foodId} quantity={food.quantity} />
                            )
                        })
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