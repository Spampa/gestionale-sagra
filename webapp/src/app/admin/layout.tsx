'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

import { AdminSidebar } from "@/components/admin/layout/admin-sidebar";

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
        if (!user || user.role != "admin") {
            router.replace("/auth/login");
        }
    }, [router]);

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AdminSidebar variant="inset" />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}