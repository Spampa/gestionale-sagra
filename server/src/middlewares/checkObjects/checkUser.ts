import { Request, Response, NextFunction } from "express";
import prisma from "@/utils/prisma";

export const checkUserObj = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password, roleId } = req.body;

    if(!(username && password && roleId)){
        res.status(400).json({ message: "Invalid request"});
        return;
    }

    next();
}

export const checkUsernameAlreadyExist = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    });

    if(user){
        res.status(409).json({ message: "User already exists"});
        return;
    }
    next();
}