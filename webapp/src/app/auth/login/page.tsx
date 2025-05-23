"use client"

import React from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import Image from "next/image";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

const formSchema = z.object({
    username: z.string({ required_error: "Il campo è obbligatorio" }),
    password: z.string({ required_error: "Il campo è obbligatorio" })
});

export default function Login() {
    const router = useRouter();

    const form = useForm<z.input<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        fetch('/api/auth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: values.username, password: values.password })
        }).then(async res => {
            const user = await res.json();
            localStorage.setItem("user", JSON.stringify(user));
            router.push("/operator/dashboard");
        }).catch(async res => {
            console.log(await res.json());
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="h-screen w-full flex flex-col items-center place-content-center">
                    <Card className="w-[350px]">
                        <CardHeader>
                            <div className="relative flex w-full place-content-center pb-6">
                                <Image src={"/logo.jpg"} alt="logo" priority width={100} height={100} style={{ width: 'auto', height: 'auto' }} />
                            </div>
                            <CardTitle className="text-center">Login</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nome utente" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => form.reset()}
                            >
                                Cancella
                            </Button>
                            <Button type="submit">Avanti</Button>
                        </CardFooter>
                    </Card>
                </div >
            </form>
        </Form >
    );
}
