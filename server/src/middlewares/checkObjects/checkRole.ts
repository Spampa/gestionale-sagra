import { Request, Response, NextFunction } from "express";
import prisma from "@/utils/prisma";

export const checkRoleObj = (req: Request, res: Response, next: NextFunction): void => {
    const { name } = req.body;

    if(!name){
        res.status(400).json({ message: "Invalid request"});
        return;
    }
    next();
}

export const checkRoleNameAlreadyExist = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body;

    const role = await prisma.role.findUnique({
        where: {
            name
        }
    });

    if(role){
        res.status(409).json({ message: "Role already exists"});
        return;
    }
    next();
}