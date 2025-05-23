import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

interface MenuButtonProps {
    title: string,
    src: string,
    href: string
}

export default function MenuButton({ title, src, href }: MenuButtonProps) {
    return (
        <Link href={href}>
            <div className="grid grid-cols-5 h-[80px] md:max-w-[400px]">
                <div className="relative col-span-2 h-full rounded-s-md overflow-hidden">
                    <Image
                        src={src}
                        alt={title}
                        fill
                        sizes="80"
                        className="object-cover"
                        style={{ borderTopLeftRadius: '0.375rem', borderBottomLeftRadius: '0.375rem' }}
                    />
                </div>
                <div className="col-span-3 text-3xl bg-primary rounded-r-md flex place-content-center items-center text-foreground font-semibold p-3">
                    {title.toUpperCase()}
                </div>
            </div>
        </Link>

    )
}