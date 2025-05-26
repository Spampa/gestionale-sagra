'use server'

import FoodCard from "@/components/foodCard";
import { Food } from "@/types/food";

export default async function Category({
    params
}: {
    params: Promise<{ category: string }>
}) {
    const { category } = await params;
    const foods = await fetch(`${process.env.API_URL}/foods/availables/categories/${category}`).then(res => res.json());

    return (
        <div className="pt-[60px] min-h-screen">
            <div className="flex flex-col gap-6 p-3 ">
                {foods.map((food: Food) => (
                    <FoodCard key={food.id} food={food} />
                ))}
            </div>
        </div>
    );
}