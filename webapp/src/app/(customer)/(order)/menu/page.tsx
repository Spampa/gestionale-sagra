'use client'

import MenuButton from "@/components/menuButton";
import { Category } from "@/types/category";
import { useEffect, useState } from "react";

export default function Menu() {
    const [categories, setCategories] = useState<Array<Category>>([]);

    useEffect(() => {
        async function fetchCategories() {
            const data = await fetch("/api/categories").then(res => res.json());
            setCategories(data);
        }
        fetchCategories();
    }, []);

    return (
        <div className="flex place-content-center items-center h-screen ">
            <div className="flex flex-col gap-8 place-content-center w-full max-w-[600px] px-8 ">
                {categories.map((category) => (
                    <MenuButton
                        key={category.id}
                        src={"/" + category.name.toLowerCase() + ".jpg"}
                        href={`/menu/${category.id}`}
                        title={category.name}
                    />
                ))}
            </div>
        </div>

    )
}