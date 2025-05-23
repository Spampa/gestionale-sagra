import { Request, Response } from "express";

import prisma from "@/utils/prisma";

export const getRoles = async (req: Request, res: Response): Promise<void> => {
    const roles = await prisma.role.findMany();
    res.status(200).json(roles);
}

export const getRoleById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    const role = await prisma.role.findUnique({
        where: {
            id
        }
    });

    if (!role) {
        res.status(404).json({ message: "Role not found" });
        return;
    }

    res.status(200).json(role);
}

export const createRole = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;

    try {
        const newRole = await prisma.role.create({
            data: {
                name
            }
        });

        res.status(201).json(newRole);
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateRole = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    try {
        const updatedRole = await prisma.role.update({
            where: {
                id
            },
            data: {
                name
            }
        });

        if (!updatedRole) {
            res.status(404).json({ message: "Role not found" });
            return;
        }

        res.status(201).json(updatedRole);
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteRole = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    try {
        await prisma.role.delete({
            where: {
                id
            }
        });

        res.status(200).json({
            message: "Role deleted"
        });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}