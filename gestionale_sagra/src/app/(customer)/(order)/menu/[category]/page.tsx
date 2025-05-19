'use server'

import FoodCard from "@/components/foodCard";

export default async function Category({
    params
}: {
    params: Promise<{ category: string }>
}) {
    const { category } = await params;
    const foods = await fetch(`http://localhost:3030/foods/categories/${category}`).then(res => res.json());

    return (
        <div className="flex flex-col gap-6 mt-20 p-3">
            {foods.map((food: any) => (
                <FoodCard key={food.id} food={food} />
            ))}
        </div>
    );
}