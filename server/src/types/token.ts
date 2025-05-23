import { Role } from "@generated/prisma"

export type Token = {
    userId: number,
    role: Role,
    iat: number,
    exp: number
}