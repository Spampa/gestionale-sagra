"use client"

import { useState } from "react";
import { Category } from "@/types/category";
import { Button } from "@/components/ui/button";
import { CircleMinus, Eye, EyeOff } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CategoryDialog from "./categoryDialog";

interface CategoriesPositionProps {
    categories: Array<Category>
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

export default function CategoriesList({ categories, setCategories }: CategoriesPositionProps) {
    return (
        <div className="flex flex-col gap-1">
            {
                categories.map((category) => (
                    <CategoryCard key={category.id} setCategories={setCategories} category={category} />
                ))
            }
        </div>
    )
}

interface CategoryCardProps {
    category: Category
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

function CategoryCard({ category, setCategories }: CategoryCardProps) {
    const [show, setShow] = useState<boolean>(category.available);

    function handleAvailable() {
        fetch(`/api/categories/available/${category.id}`, {
            method: "PATCH",
            credentials: "include"
        }).then(async res => {
            await res.json();
            if (res.ok) {
                setShow(!show);
            }
        });
    }

    function deleteCategory() {
        fetch(`/api/categories/${category.id}`, {
            method: "DELETE",
            credentials: "include"
        }).then(async res => {
            await res.json();
            if (res.ok) {
                setCategories(prev => prev.filter(c => c.id !== category.id));
            }
        })
    }

    return (
        <div className="w-full flex place-content-center">
            <div className="bg-secondary p-3 rounded-sm flex flex-row gap-3 place-content-between w-[400px] items-center">
                <div className="flex flex-row gap-1 items-center">
                    <Button variant={"destructive"} size={"icon"} className="size-7" onClick={() => deleteCategory()}>
                        <CircleMinus />
                    </Button>
                    <h1>
                        {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                    </h1>
                </div>

                <div className="flex flex-row gap-0.5 items-center">

                    <Button size={"icon"} variant={"ghost"} onClick={() => handleAvailable()}>
                        {
                            show ?
                                <Eye />
                                :
                                <EyeOff />
                        }
                    </Button>

                    <Separator
                        orientation="vertical"
                        className="mx-2 data-[orientation=vertical]:h-4"
                    />
                    <CategoryDialog category={category} setCategories={setCategories} />
                </div>
            </div>
        </div>
    )
}