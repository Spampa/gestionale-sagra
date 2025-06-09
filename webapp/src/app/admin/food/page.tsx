"use client"

import { AdminHeader } from "@/components/admin/layout/header"

export default function Food() {
    return (
        <>
            <AdminHeader title={"Food management"} />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <div className="px-4 lg:px-6">
                            <h1>working siummico</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
