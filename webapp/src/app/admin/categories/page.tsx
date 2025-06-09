"use client"

import { useEffect, useState } from "react";
import CategoriesList from "@/components/admin/components/category/categoriesList"
import { AdminHeader } from "@/components/admin/layout/header"
import { Category } from "@/types/category";
import CategoryDialog from "@/components/admin/components/category/categoryDialog";

export default function Food() {
    const [categories, setCategories] = useState<Array<Category>>([]);

    useEffect(() => {
        async function fetchCategories() {
            const data = await fetch("/api/categories").then(res => res.json());
            setCategories(data);
        }
        fetchCategories();
    }, []);

    return (
        <>
            <AdminHeader title={"Categories management"} />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <div className="px-4 lg:px-6 flex flex-col gap-3">
                            <CategoryDialog setCategories={setCategories} />
                            <CategoriesList categories={categories} setCategories={setCategories}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
