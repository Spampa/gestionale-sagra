"use client"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "./ui/button"
import { Plus, Minus } from "lucide-react"

interface Prop {
    food: Food
}

import { useOrder } from "@/contexts/OrderContext";
import { useEffect, useState } from "react"
import { Food } from "@/types/food"

export default function FoodCard({ food }: Prop) {
    const { order, setOrder } = useOrder();
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const { foodsOrdered } = order;
        foodsOrdered.forEach(foodOrder => {
            if (foodOrder.food.id == food.id) {
                setCount(foodOrder.quantity);
            }
        })
    }, [food.id, order]);

    function addFood() {
        setOrder(o => {
            // Cerca se il cibo è già stato ordinato
            const existing = o.foodsOrdered.find(foodOrder => foodOrder.food.id === food.id);
            let newFoodsOrdered;
            if (existing) {
                newFoodsOrdered = o.foodsOrdered.map(foodOrder =>
                    foodOrder.food.id === food.id
                        ? { ...foodOrder, quantity: foodOrder.quantity + 1 }
                        : foodOrder
                );
            } else {
                newFoodsOrdered = [
                    ...o.foodsOrdered,
                    { food: food, quantity: 1 }
                ];
            }
            return {
                ...o,
                price: Number(o.price) + Number(food.price),
                foodsOrdered: newFoodsOrdered
            };
        });


        setCount(count + 1);
    }

    function removeFood() {
        if (count === 0) return;

        setOrder(o => {
            const existing = o.foodsOrdered.find(foodOrder => foodOrder.food.id === food.id);
            if (!existing) return o;

            let newFoodsOrdered;
            if (existing.quantity === 1) {
                // Rimuovi il cibo dall'array se la quantità va a zero
                newFoodsOrdered = o.foodsOrdered.filter(foodOrder => foodOrder.food.id !== food.id);
            } else {
                // Decrementa la quantità
                newFoodsOrdered = o.foodsOrdered.map(foodOrder =>
                    foodOrder.food.id === food.id
                        ? { ...foodOrder, quantity: foodOrder.quantity - 1 }
                        : foodOrder
                );
            }

            return {
                ...o,
                price: Number(o.price) - Number(food.price),
                foodsOrdered: newFoodsOrdered
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