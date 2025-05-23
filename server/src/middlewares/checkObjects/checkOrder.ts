import { Request, Response, NextFunction } from "express";

export const checkOrderObj = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { table, customer, foodsOrdered } = req.body;

    if(!(table && customer && foodsOrdered)){
        res.status(400).json({ message: "Invalid request"});
        return;
    }

    next();
}