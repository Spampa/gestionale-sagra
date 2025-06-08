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
import { NavMain } from "../ui/navMain"

import { Gauge, ChartArea, Pizza, Receipt } from "lucide-react"
import Logo from "../logo"

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
            title: "Foods",
            url: "#",
            icon: Pizza,
        },
        {
            title: "Orders",
            url: "#",
            icon: Receipt,
        }
    ]
}

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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

            </SidebarFooter>
        </Sidebar>
    )
}