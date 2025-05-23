import { Request, Response, NextFunction } from "express";

import logger from "@/utils/logger";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration
        }, 'HTTP Request');
    });

    next();
}