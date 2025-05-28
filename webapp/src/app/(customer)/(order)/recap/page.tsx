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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export default function Recap() {
    const { order, setOrder } = useOrder();
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
            localStorage.setItem("order", JSON.stringify(data));

            router.push(`/checkout`);
            clearOrder();
        }).catch(err => {
            console.log(err);
        })
    }

    function clearOrder() {
        setOrder({
            table: order.table,
            customer: order.customer,
            price: 0,
            foodsOrdered: [],
        })
    }

    return (
        <div className="pt-[60px] h-screen flex flex-col gap-4 pb-4">
            <Table >
                <TableHeader className="bg-white">
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
                <TableFooter className="bg-white">
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">{order.price.toFixed(2)}€</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className="p-2">
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Attenzione</AlertTitle>
                    <AlertDescription>
                        Per eventuali modifiche dell&apos;ordine o agli ingredienti comunicarli alla cassa prima del pagamento, grazie.
                    </AlertDescription>
                </Alert>
            </div>

            <div className="flex flex-row gap-2 place-content-center">
                <Button onClick={() => clearOrder()} variant="destructive">
                    Svuota Carrello
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            disabled={order.foodsOrdered.length === 0}
                        >
                            Crea Ordine
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Sei sicuro di voler ordinare?</DialogTitle>
                            <DialogDescription>
                                La tua azione sta per generare un ordine alla cassa,
                                ti verrà dato un codice dell&apos;ordine<br />
                                <span className="font-bold"> non dimenticarlo!</span>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button onClick={() => createOrder()}>
                                Conferma Ordine
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}