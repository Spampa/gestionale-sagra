import { Router } from "express";
import { getOrders, getOrderById, createOrder, deleteOrder, searchOrder, searchDailyOrder, getDailyOrders } from "@/controllers/order.controller";
import { checkOrderObj } from "@/middlewares/checkObjects/checkOrder";
import { checkRole } from "@/middlewares/authMiddleware";

const router = Router();

router.get(
    "/",
    checkRole(["admin", "operator"]),
    getOrders
);

router.post(
    "/",
    checkOrderObj,
    createOrder
);

router.delete(
    "/:id",
    checkRole(["admin", "operator"]),
    deleteOrder
);

router.get(
    "/:id",
    checkRole(["admin", "operator"]),
    getOrderById
);

router.get(
    "/search/daily/:value",
    checkRole(["admin", "operator"]),
    searchDailyOrder
);

router.get(
    "/search/:value",
    checkRole(["admin"]),
    searchOrder
);

router.get(
    "/day/today",
    checkRole(["admin", "operator"]),
    getDailyOrders
);

export default router;