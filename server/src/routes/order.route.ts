import { Router } from "express";
import { getOrders, getOrderById, createOrder, deleteOrder } from "@/controllers/order.controller";
import { checkOrderObj } from "@/middlewares/checkObjects/checkOrder";
import { validateIdParam } from "@/middlewares/validateIdParam";

const router = Router();

router.get(
    "/",
    getOrders
);

router.post(
    "/",
    checkOrderObj,
    createOrder
);

router.delete(
    "/:id",
    validateIdParam,
    deleteOrder
);

router.get(
    "/:id",
    validateIdParam,
    getOrderById
);

export default router;