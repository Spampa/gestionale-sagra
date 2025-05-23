import { Router } from "express";

const router = Router();

import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import hashPwd, { checkPwd } from "@/lib/hashPwd";
import { generateJwt } from "@/lib/JWT";

router.post("/", async (req: Request, res: Response) => {
    const { username, password } = req.body

    if (!(username && password)) {
        res.status(400).json({
            message: "Bad request"
        });
        return;
    }

    const user = await prisma.user.findUnique({
        where: {
            username
        },
        include: {
            role: true
        }
    });

    if (!user) {
        res.status(404).json({
            message: "User not exists"
        });
        return;
    }

    if (await checkPwd(password, user.password)) {
        res.status(200).json({
            user: {
                username: user.username,
                role: user.role.name
            },
            token: generateJwt(user)
        });
    }
    else {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
});

export default router;