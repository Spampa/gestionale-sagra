"use client"

import { LogOut } from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import {
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function NavUser({
    user,
}: {
    user: {
        username: string
        role: string
    }
}) {
    const router = useRouter();

    function logOut() {
        fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include"
        }).then(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            router.replace("/auth/login");
        });
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem className="flex flex-row gap-3 items-center">
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                    <AvatarImage alt={user.username} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.username}</span>
                    <span className="text-muted-foreground truncate text-xs">
                        {user.role}
                    </span>
                </div>
                <Button variant={"destructive"} size={"icon"} className="size-7" onClick={() => logOut()}>
                    <LogOut />
                </Button>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
