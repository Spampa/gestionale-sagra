'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react";

interface MenuButtonProps {
    title: string,
    src: string,
    href: string
}

export default function MenuButton({ title, src, href }: MenuButtonProps) {
    const [imgSrc, setImgSrc] = useState(src);
    return (
        <Link href={href}>
            <div className="grid w-full">
                <div className="relative w-full h-[100px] rounded-t-md rounded-b-none overflow-hidden">
                    <Image
                        src={imgSrc}
                        alt={title}
                        fill
                        sizes="100"
                        className="object-cover"
                        onError={() => setImgSrc("/category_images/fallback.png")}
                    />
                </div>
                <div className="min-h-10 text-2xl bg-primary rounded-b-md rounded-t-none flex place-content-center items-center text-foreground font-semibold p-3">
                    {title.toUpperCase()}
                </div>
            </div>
        </Link>

    )
}