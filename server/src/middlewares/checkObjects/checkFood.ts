import { Request, Response, NextFunction } from "express";
import prisma from "@/utils/prisma";

export const checkFoodObj = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, price, categoryId } = req.body;

    if(!(name && price && categoryId)){
        res.status(400).json({ message: "Invalid request"});
        return;
    }

    const category = await prisma.category.findUnique({
        where: {
            id: parseInt(categoryId)
        }
    })

    if(!category){
        res.status(400).json({ message: "Category not exists"});
        return;
    }
    next();
}

export const checkFoodNameAlreadyExist = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body;

    const food = await prisma.food.findUnique({
        where: {
            name
        }
    });

    if(food){
        res.status(409).json({ message: "Food already exists"});
        return;
    }
    next();
}