'use client'

import OrderCard from "@/components/orderCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Order } from "@/types/order";
import { Search, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {

    const router = useRouter();
    const [text, setText] = useState("");
    const [orders, setOrders] = useState<Array<Order>>([]);

    function searchOrders(value: string) {
        if (!value) return;
        fetch(`/api/orders/search/${value}`, {
            method: "GET",
            credentials: "include"
        }).then(async res => {
            if (!res.ok) {
                if (res.status !== 404 && res.status !== 500) {
                    router.push("/auth/login");
                }
                return;
            }
            const data = await res.json();
            setOrders(data);
        }).catch(err => {
            console.log(err)
        })
    }

    function logOut() {
        fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include"
        }).then(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            router.replace("/auth/login");
        });
    }

    return (
        <div className="container mx-auto h-screen p-3 place-content-between flex flex-col gap-5">
            <div className="flex flex-row gap-2 items-center rounded-md p-3">
                <Input
                    type="text"
                    placeholder="Cerca Ordine"
                    value={text}
                    onChange={e => {
                        setOrders([])
                        setText(e.target.value)
                    }}
                />
                <Button size={"icon"} onClick={() => searchOrders(text)}>
                    <Search />
                </Button>
            </div>

            <div className="flex flex-col gap-3">
                {
                    orders.map(order => (
                        <OrderCard order={order} key={order.id} value={text} />
                    ))
                }
            </div>


            <div className="flex w-full place-content-center p-2">
                <Button variant="destructive" className="w-[250px]" onClick={() => logOut()}>
                    Esci <LogOut />
                </Button>
            </div>

        </div>
    )
}