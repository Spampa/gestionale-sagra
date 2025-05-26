'use client'

import MenuButton from "@/components/menuButton";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/category";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

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
        <div className="flex place-content-center items-center min-h-screen py-20 ">
            <div className="flex flex-col gap-8 place-content-center w-full max-w-[600px] px-8 ">
                {categories.map((category) => (
                    <MenuButton
                        key={category.id}
                        src={"/category_images/" + category.id + ".jpg"}
                        href={`/menu/${category.id}`}
                        title={category.name}
                    />
                ))}
                <Link href={"/recap"}>
                    <Button variant={"outline"} className="w-full">
                        <ShoppingCart />
                        Vai al carrello
                    </Button>
                </Link>
            </div>
        </div>

    )
}