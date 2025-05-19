import { Request, Response, NextFunction } from "express";

export const validateIdParam = (req: Request, res: Response, next: NextFunction): void => {
    const { id } = req.params;
    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
        res.status(400).json({ error: "ID non valido" });
        return;
    }
    next();
}