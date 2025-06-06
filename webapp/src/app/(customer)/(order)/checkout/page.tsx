'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { Order } from "@/types/order";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

export default function Checkout() {
    const [order, setOrder] = useState<Order>();
    const router = useRouter();

    useEffect(() => {
        const orderStr = sessionStorage.getItem("createdOrder");
        if (orderStr) setOrder(JSON.parse(orderStr));
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col gap-16 place-content-start items-center p-12">
            <div className="flex flex-col gap-3 items-center">
                <h1 className="font-bold text-xl text-center">Questo è il codice del tuo ordine, <span className="text-red-500">non dimenticarlo:</span></h1>
                <span className="font-bold font-mono text-9xl text-yellow-800">{order?.id}</span>
            </div>

            <div className="flex flex-col gap-0.5 items-center">
                <h3 className="text-2xl font-semibold">Devi pagare {order?.price}€</h3>
                <p className="py-5 text-gray-600 text-center">*Prepara i soldi per velocizzare il processo😉</p>
            </div>


            <div className="flex flex-col gap-2.5 text-lg font-normal">
                <h1 className="font-semibold text-2xl text-center">Cosa devo fare ora?</h1>
                <div className="flex flex-row gap-1">
                    👉
                    <p>Comunicalo in cassa</p>
                </div>
                <div className="flex flex-row gap-1">
                    🤑
                    <p> Effettua il pagamento</p>
                </div>
                <div className="flex flex-row gap-1">
                    🍸
                    <p>Dopo aver pagato le bevande dovrai ritirarle al bar</p>
                </div>
                <div className="flex flex-row gap-1">
                    🍕
                    <p>Il tuo ordine sarà servito direttamente al tavolo</p>
                </div>
            </div>
            <div className="w-full inset-shadow-xs fixed bottom-0 p-3 bg-secondary flex place-content-center">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            Crea un nuovo Ordine
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Sei sicuro di voler creare un nuovo ordine</DialogTitle>
                            <DialogDescription>
                                Creando un nuovo ordine non potrai più tornare a questa schermata,
                                ricordati il
                                <span className="font-bold"> codice ordine.</span><br />
                                Ma non preoccuparti troppo è sempre reperibile dalle cassiere😉
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                onClick={() => {
                                    sessionStorage.removeItem("createdOrder");
                                    router.push("/");
                                }}
                            >
                                Conferma creazione
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

        </div>

    )

}