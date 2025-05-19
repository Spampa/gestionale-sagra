import { Request, Response, NextFunction } from "express";

export const checkOrderObj = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { table, customer, foodOrdered } = req.body;

    if(!(table && customer && foodOrdered)){
        res.status(400).json({ message: "Invalid request"});
        return;
    }

    next();
}