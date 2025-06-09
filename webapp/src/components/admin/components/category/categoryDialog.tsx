"use client"

import { Button } from "@/components/ui/button"
import { Pencil, PlusCircle } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@/types/category";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    position: z.string({ required_error: "Field required" })
        .refine(val => !isNaN(Number(val)), {
            message: "Required a number"
        }),
    available: z.boolean()
})

interface CategoryDialog {
    category?: Category
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

export default function CategoryDialog({ category, setCategories }: CategoryDialog) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: category?.name || "",
            position: category?.position !== undefined ? String(category.position) : "",
            available: category?.available || true
        },
    })

    function createCategory(values: z.infer<typeof formSchema>) {
        fetch("/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        }).then(async res => {
            const data = await res.json();
            if (!res.ok) return;
            form.reset();
            setCategories(prev =>
                [...prev, data].sort((a, b) => Number(a.position) - Number(b.position))
            );
        })
    }

    function updateCategory(values: z.infer<typeof formSchema>) {
        fetch(`/api/categories/${category?.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        }).then(async res => {
            const data = await res.json();
            if (!res.ok) return
            setCategories(prev =>
                prev.map(c => c.id === data.id ? { ...c, ...data } : c)
            );

        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {
                    category ?
                        <Button size={"icon"} className="size-7 bg-blue-500 hover:bg-blue-500/80 text-white">
                            <Pencil />
                        </Button>
                        :
                        <Button className="w-min">
                            <PlusCircle />
                            Create new category
                        </Button>
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {
                            category ? "Update " : "New "
                        }
                        Category
                    </DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <CategoryForm
                    form={form}
                    onSubmit={
                        category ? updateCategory : createCategory
                    }
                    category={category}
                />
            </DialogContent>
        </Dialog>
    )
}

interface CategoryFormProps {
    form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
    category?: Category
}

function CategoryForm({ form, onSubmit, category }: CategoryFormProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Restaurant" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is category display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                                <Input placeholder="1" {...field} />
                            </FormControl>
                            <FormDescription>
                                Category display order.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="available"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center gap-2 space-y-0">
                            <FormLabel>Available</FormLabel>
                            <FormControl>
                                <Checkbox
                                    id="available"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="size-5 accent-primary"
                                />
                            </FormControl>
                            <FormDescription>
                                Show category as available.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    {
                        category ?
                            <Button type="submit" className="bg-blue-500 hover:bg-blue-500/80 text-white">Edit</Button>
                            :
                            <Button type="submit">Create</Button>
                    }
                </DialogFooter>
            </form>
        </Form>
    )
}