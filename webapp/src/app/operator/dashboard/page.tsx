'use client'

import OrderCard from "@/components/orderCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Order } from "@/types/order";
import { Search, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Receipt, Loader2Icon } from "lucide-react";

export default function Dashboard() {

    const router = useRouter();
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<Array<Order>>([]);
    const inputRef = useRef<HTMLInputElement>(null); //remove focus from keyboard

    useEffect(() => {
        lastOrders();
    }, [])

    function lastOrders() {
        setLoading(true);
        setText("");
        fetch(`/api/orders/day/today`, {
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
            setTimeout(() => setLoading(false), 100);
        }).catch(err => {
            console.log(err)
        })
    }

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
        <>
            <main className="container mx-auto h-screen p-3 flex flex-col gap-3">
                <div className="flex flex-col gap-1.5 p-3 md:w-[400px]">
                    <form
                        className="flex flex-row gap-2 items-center rounded-md"
                        onSubmit={e => {
                            e.preventDefault();
                            searchOrders(text);
                            inputRef.current?.blur();
                        }}
                    >
                        <Input
                            ref={inputRef}
                            type="search"
                            inputMode="search"
                            enterKeyHint="search"
                            className="hide-search-clear"
                            placeholder="Cerca Ordine"
                            value={text}
                            onChange={e => {
                                setOrders([]);
                                setText(e.target.value);
                            }}
                        />
                        <Button size={"icon"} type="submit">
                            <Search />
                        </Button>
                    </form>
                    {
                        loading ?
                            <Button className="bg-blue-500 hover:bg-blue-400 text-white" disabled onClick={() => lastOrders()}>
                                <Loader2Icon className="animate-spin" /> Cercando gli ultimi aggiornamenti
                            </Button>
                            :
                            <Button className="bg-blue-500 hover:bg-blue-400 text-white" onClick={() => lastOrders()}>
                                <Receipt /> Visualizza tutti gli ordini giornalieri
                            </Button>
                    }

                </div>


                <div className="flex flex-col gap-3 pb-20">
                    {
                        orders.map(order => (
                            <OrderCard order={order} key={order.id} value={text} />
                        ))
                    }
                </div>

            </main>
            <div className="flex items-center place-content-center p-5 fixed  w-full  bottom-0 bg-white">
                <Button variant="destructive" className="w-[250px]" onClick={() => logOut()}>
                    Esci <LogOut />
                </Button>
            </div>
        </>
    )
}