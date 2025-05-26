import { Request, Response } from "express";

import prisma from "@/utils/prisma";

import { Food } from "@generated/prisma";

export const getFoods = async (req: Request, res: Response): Promise<void> => {
    const foods = await prisma.food.findMany();
    res.status(200).json(foods);
}

export const getAvailableFoods = async (req: Request, res: Response): Promise<void> => {
    const foods = await prisma.food.findMany({
        where: {
            available: true
        }
    });
    res.status(200).json(foods);
}

export const getFoodById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    const food = await prisma.food.findUnique({
        where: {
            id
        }
    });

    if (!food) {
        res.status(404).json({ message: "Food not found" });
        return;
    }

    res.status(200).json(food);
}

export const getFoodByCategory = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    const food = await prisma.food.findMany({
        where: {
            categoryId: id
        }
    });

    if (!food) {
        res.status(404).json({ message: "Food not found" });
        return;
    }

    res.status(200).json(food);
}

export const getAvailableFoodByCategory = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    const food = await prisma.food.findMany({
        where: {
            categoryId: id,
            available: true
        },
        orderBy: {
            name: "asc"
        }
    });

    if (!food) {
        res.status(404).json({ message: "Food not found" });
        return;
    }

    res.status(200).json(food);
}

export const createFood = async (req: Request, res: Response): Promise<void> => {
    const food: Food = req.body;

    try {
        const newFood = await prisma.food.create({
            data: food
        });

        res.status(201).json(newFood);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateFood = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const food: Food = req.body;

    try {
        const updatedFood = await prisma.food.update({
            where: {
                id
            },
            data: food
        });

        if (!updatedFood) {
            res.status(404).json({ message: "Food not found" });
            return;
        }

        res.status(200).json(updatedFood);
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const patchFoodAvailable = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    const food = await prisma.food.findUnique({ where: { id }})

    if (!food) {
        res.status(404).json({ message: "Food not found" });
        return;
    }

    try {
        const patchFood = await prisma.food.update({
            where: {
                id
            },
            data: {
                available: !food.available
            }
        });

        res.status(200).json(patchFood);
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteFood = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    try {
        await prisma.food.delete({
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