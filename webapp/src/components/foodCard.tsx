"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "./ui/button"
import { Plus, Minus } from "lucide-react"

interface Prop {
    food: {
        id: number
        name: string,
        description?: string
        price: number,
        categoryId: number
    }
}

import { useOrder } from "@/contexts/OrderContext";
import { useEffect, useState } from "react"

export default function FoodCard({ food }: Prop) {
    const { order, setOrder } = useOrder();
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const { foodOrdered } = order;
        foodOrdered.forEach(f => {
            if (f.foodId == food.id) {
                setCount(f.quantity);
            }
        })
    }, []);

    function addFood() {
        setOrder(o => {
            // Cerca se il cibo è già stato ordinato
            const existing = o.foodOrdered.find(f => f.foodId === food.id);
            let newFoodOrdered;
            if (existing) {
                newFoodOrdered = o.foodOrdered.map(f =>
                    f.foodId === food.id
                        ? { ...f, quantity: f.quantity + 1 }
                        : f
                );
            } else {
                newFoodOrdered = [
                    ...o.foodOrdered,
                    { foodId: food.id, quantity: 1, name: food.name, price: food.price }
                ];
            }
            return {
                ...o,
                price: Number(o.price) + Number(food.price),
                foodOrdered: newFoodOrdered
            };
        });

        setCount(count + 1);
    }

    function removeFood() {
        if(count == 0) return;

            setOrder(o => {
        const existing = o.foodOrdered.find(f => f.foodId === food.id);
        if (!existing) return o;

        let newFoodOrdered;
        if (existing.quantity === 1) {
            newFoodOrdered = o.foodOrdered.filter(f => f.foodId !== food.id);
        } else {
            newFoodOrdered = o.foodOrdered.map(f =>
                f.foodId === food.id
                    ? { ...f, quantity: f.quantity - 1 }
                    : f
            );
        }

        return {
            ...o,
            price: Number(o.price) - Number(food.price),
            foodOrdered: newFoodOrdered
        };
    });

    setCount(count - 1);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-row place-content-between">
                    {food.name}
                    <p className="font-normal">{food.price}€</p>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>{food.description || ""}</p>
            </CardContent>
            <CardFooter>
                <div className="flex flex-row place-content-between w-full">
                    <Button variant={"destructive"} size={"icon"} onClick={() => removeFood()}>
                        <Minus />
                    </Button>
                    <p>{count}</p>
                    <Button size={"icon"} onClick={() => addFood()}>
                        <Plus />
                    </Button>
                </div>
            </CardFooter>
        </Card>

    )
}