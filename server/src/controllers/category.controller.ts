import { Request, Response } from "express";

import prisma from "@/utils/prisma";

export const getCategories = async (req: Request, res: Response): Promise<void> => {
    const categories = await prisma.category.findMany({
        orderBy: {
            id: "asc"
        }
    });
    res.status(200).json(categories);
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
    const { name } = req.body;

    try {
        const newCategory = await prisma.category.create({
            data: {
                name
            }
        });

        res.status(201).json(newCategory);
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    try {
        const updatedCategory = await prisma.category.update({
            where: {
                id
            },
            data: {
                name
            }
        });

        if (!updatedCategory) {
            res.status(404).json({ message: "Category not found" });
            return;
        }

        res.status(201).json(updatedCategory);
    }
    catch (err) {
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