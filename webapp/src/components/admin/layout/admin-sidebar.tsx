"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"

import { Gauge, ChartArea, Pizza, Receipt, Martini, Users, ArrowLeftRight, Ticket } from "lucide-react"
import Logo from "@/components/logo"
import { NavUser } from "./nav-user"
import { useEffect, useState } from "react"

const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: Gauge,
        },
        {
            title: "Analytics",
            url: "#",
            icon: ChartArea,
        },
        {
            title: "Manage Users",
            url: "#",
            icon: Users,
        },
        {
            title: "Event",
            url: "#",
            icon: Ticket,
        },
        {
            title: "Categories",
            url: "/admin/categories",
            icon: Martini,
        },
        {
            title: "Foods",
            url: "/admin/food",
            icon: Pizza,
        },
        {
            title: "Orders",
            url: "/admin/orders",
            icon: Receipt,
        },
        {
            title: "Operator View",
            url: "/operator/dashboard",
            icon: ArrowLeftRight,
        }
    ]
}

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [user, setUser] = useState({ username: "", role: ""});

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if(!userStr) return;
        setUser(JSON.parse(userStr));
    }, [])

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="#">
                                <Logo className="!size-5" />
                                <span className="text-base font-semibold text-primary">{process.env.NEXT_PUBLIC_APP_NAME}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}