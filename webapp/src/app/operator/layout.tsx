'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { Toaster } from "sonner";

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        let user: User | null = null;
        if (typeof window !== "undefined") {
            const userStr = localStorage.getItem("user");
            if (userStr) {
                try {
                    user = JSON.parse(userStr) as User;
                } catch {
                    user = null;
                }
            }
        }
        if (!user) {
            router.replace("/auth/login");
        }
    }, [router]);

    return (
        <>
            {children}
            <Toaster />
        </>
    )
}