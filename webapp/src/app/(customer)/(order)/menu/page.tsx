'use client'

import MenuButton from "@/components/menuButton";
import { useEffect, useState } from "react";

export default function Menu() {
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            const data = await fetch("/api/categories").then(res => res.json());
            setCategories(data);
        }
        fetchCategories();
    }, []);

    return (
        <div className="flex place-content-center items-center">
            <div className="h-screen flex flex-col gap-3 place-content-center ">
                {categories.map((category) => (
                    <MenuButton
                        key={category.id}
                        src={"/"+ category.name + ".jpg"}
                        href={`/menu/${category.id}`}
                        title={category.name}
                    />
                ))}
            </div>
        </div>

    )
}