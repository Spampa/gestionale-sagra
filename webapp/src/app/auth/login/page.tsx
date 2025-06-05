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

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ShieldAlert } from "lucide-react";
import Logo from "@/components/logo";

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
            const data = await res.json();
            if (!res.ok) {
                form.reset();
                toast(
                    <div className="flex flex-row gap-1.5 items-start">
                        <ShieldAlert />
                        <div className="flex flex-col gap-0.5 text-left">
                            <p className=" text-sm">Username or password not correct</p>
                            <p className="text-black/60">{data?.error || ""}</p>
                        </div>
                        
                    </div>
                )
                return;
            }
            localStorage.setItem("user", JSON.stringify(data));
            router.push("/operator/dashboard");
        }).catch(async res => {
            console.log(await res.json());
        })
    }
    return (
        <div className="h-screen w-full flex place-content-center items-center bg-secondary-foreground">
            <h1 className="text-primary absolute top-0 p-3 md:left-0 font-bold text-lg">My Sagra</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="h-screen w-full flex flex-col items-center place-content-center">
                        <Card className="w-[350px]">
                            <CardHeader>
                                <div className="relative flex w-full place-content-center pb-6">
                                    <Logo className="h-28" />
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
            <div className=" absolute bottom-0 text-sm text-white">
                <Link href={"https://www.nicolospampa.it/"} target="_blank" rel="noopener noreferrer">
                    Powered by
                    <Button variant={"link"} className="p-1.5">
                        Spampatti Nicolò
                    </Button>
                </Link>
            </div>
        </div>
    );
}
