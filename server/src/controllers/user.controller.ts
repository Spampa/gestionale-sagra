import { Request, Response } from "express";

import prisma from "@/utils/prisma";
import hashPwd from "@/lib/hashPwd";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            role: true
        }
    });
    res.status(200).json(users);
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            username: true,
            role: true
        }
    });

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.status(200).json(user);
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password, roleId } = req.body;

    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                password: await hashPwd(password),
                roleId
            },
            select: {
                id: true,
                username: true,
                role: true
            }
        });

        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    try {
        await prisma.user.delete({
            where: {
                id
            }
        });

        res.status(200).json({
            message: "User deleted"
        });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}