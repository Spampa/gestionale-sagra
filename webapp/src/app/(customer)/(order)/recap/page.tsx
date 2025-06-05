"use client"

import { useOrder } from "@/contexts/OrderContext"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

import TableRecap from "@/components/recap/tableRecap";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";


export default function Recap() {
    const { order, setOrder } = useOrder();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function createOrder() {
        setLoading(true);
        fetch("/api/orders", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then(async res => {
            const data = await res.json();
            localStorage.setItem("order", JSON.stringify(data));

            setTimeout(() => {
                clearOrder();
                setLoading(false)
                router.push(`/checkout`);
            }, 500)
        }).catch(err => {
            console.log(err);
        })
    }

    function clearOrder() {
        setOrder({
            id: "",
            table: order.table,
            customer: order.customer,
            price: 0,
            foodsOrdered: [],
            dateTime: new Date()
        })
    }

    return (
        <div className="pt-[60px] h-screen flex flex-col gap-4 pb-4">
            <TableRecap order={order} className="bg-white"></TableRecap>

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
                            {
                                loading ?
                                    <Button className="text-white" disabled>
                                        <Loader2Icon className="animate-spin" /> Stiamo creando il tuo ordine
                                    </Button>
                                    :
                                    <Button onClick={() => createOrder()}>
                                        Conferma Ordine
                                    </Button>
                            }
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}