import { PrismaClient } from '../generated/prisma'
import hashPwd from "../src/lib/hashPwd"

const prisma = new PrismaClient()

async function main() {

    await prisma.role.create({
        data: {
            id: 1,
            name: "admin"
        }
    })

    await prisma.role.create({
        data: {
            id: 2,
            name: "operator"
        }
    })

    await prisma.user.create({
        data: {
            username: "admin",
            password: await hashPwd("admin"),
            roleId: 1
        }
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })