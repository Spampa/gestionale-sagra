import { Request, Response, NextFunction } from "express";
import prisma from "@/utils/prisma";

export const checkCategoryObj = (req: Request, res: Response, next: NextFunction): void => {
    const { name, position } = req.body;
    
    if(!name || !position || isNaN(position)){
        res.status(400).json({ message: "Invalid request"});
        return;
    }
    next();
}

export const checkCategoryNameAlreadyExist = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body;

    const category = await prisma.category.findUnique({
        where: {
            name
        }
    });

    if(category){
        res.status(409).json({ message: "Category already exists"});
        return;
    }
    next();
}