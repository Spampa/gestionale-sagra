import { Request, Response } from "express";

import prisma from "@/utils/prisma";

export const getCategories = async (req: Request, res: Response): Promise<void> => {
    const categories = await prisma.category.findMany({
        orderBy: {
            position: "asc"
        }
    });
    res.status(200).json(categories);
}

export const getAvailableCategories = async (req: Request, res: Response): Promise<void> => {
    const categories = await prisma.category.findMany({
        where: {
            available: true
        },
        orderBy: {
            position: "asc"
        }
    });
    res.status(200).json(categories);
}

export const patchAvailableCategory = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    const oldCategory = await prisma.category.findUnique({ where: { id } });

    if (!oldCategory) {
        res.status(404).json({ message: "Food not found" });
        return;
    }

    const patchCategory = await prisma.category.update({
        where: {
            id
        },
        data: {
            ...oldCategory,
            available: !oldCategory?.available
        }
    });
    res.status(200).json(patchCategory);
}

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    const category = await prisma.category.findUnique({
        where: {
            id
        }
    });

    if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
    }

    res.status(200).json(category);
}

export const createCategory = async (req: Request, res: Response): Promise<void> => {
    const { name, position, available } = req.body;
    try {
        const newCategory = await prisma.category.create({
            data: {
                name,
                position: parseInt(position),
                available: available || true
            }
        });

        res.status(201).json(newCategory);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { name, position, available } = req.body;

    try {
        const updatedCategory = await prisma.category.update({
            where: {
                id
            },
            data: {
                name,
                position: parseInt(position),
                available
            }
        });

        if (!updatedCategory) {
            res.status(404).json({ message: "Category not found" });
            return;
        }

        res.status(201).json(updatedCategory);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    try {
        await prisma.category.delete({
            where: {
                id
            }
        });

        res.status(200).json({
            message: "Category deleted"
        });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}