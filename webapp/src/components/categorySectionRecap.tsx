import { Category } from "@/types/category"
import { Food } from "@/types/food"
import { TableCell, TableRow } from "./ui/table"
import FoodRowRecap from "./foodRowRecap"
import { FoodOrderd } from "@/types/foodOrdered"
import { useEffect, useState } from "react"

interface Props {
    category: Category,
    foodsOrderd: Array<FoodOrderd>
}

export default function CategorySectionRecap({ category, foodsOrderd }: Props) {
    const [foods, setFoods] = useState<Array<FoodOrderd>>([]);

    useEffect(() => {
        foodsOrderd.map(foodOrder => {
            if (foodOrder.food.categoryId === category.id || foodOrder.food.category?.id === category.id) {
                setFoods(prevFoods => [...prevFoods, foodOrder]);
            }
        })
    }, [])

    if (foods.length === 0) {
        return <></>
    }
    else {
        return (
            <>
                <TableRow className=" bg-gray-100">
                    <TableCell className="font-bold">
                        {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                {
                    foodsOrderd
                        .filter(foodOrder =>
                            foodOrder.food.categoryId === category.id ||
                            foodOrder.food.category?.id === category.id
                        )
                        .map(foodOrder => (
                            <FoodRowRecap
                                key={foodOrder.food.id}
                                food={foodOrder.food}
                                quantity={foodOrder.quantity}
                            />
                        ))
                }
            </>
        )
    }


}