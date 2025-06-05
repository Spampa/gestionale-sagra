
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "../ui/button"
import { Order } from "@/types/order"
import TableRecap from "./tableRecap"

interface DialogRecapProps {
    order: Order
}

export default function DialogRecap({ order }: DialogRecapProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Visualizza Ordine
                </Button>
            </DialogTrigger>
            <DialogContent className=" h-[500px]">
                <DialogHeader>
                    <DialogTitle>Ordine di {order.customer}</DialogTitle>
                    <DialogDescription asChild>
                        <div className="flex flex-row gap-3 place-content-between">
                            <nav>
                                {new Date(order.dateTime).toLocaleString("it-IT", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </nav>
                            <nav>
                                Tavolo: {order.table}
                            </nav>
                            <nav>
                                ID: <span className="font-mono">{order.id}</span>
                            </nav>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <TableRecap key={order.id} order={order} />
            </DialogContent>
        </Dialog>
    )
}