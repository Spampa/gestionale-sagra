import { Router } from "express";
import { getFoods, getFoodById, getFoodByCategory, createFood, updateFood, deleteFood } from "@/controllers/food.controller";
import { checkFoodNameAlreadyExist, checkFoodObj } from "@/middlewares/checkObjects/checkFood";
import { validateIdParam } from "@/middlewares/validateIdParam";
import { checkRole } from "@/middlewares/authMiddleware";

const router = Router();

router.get(
    "/",
    getFoods
);

router.post(
    "/",
    checkRole(["admin"]),
    checkFoodObj,
    checkFoodNameAlreadyExist,
    createFood
);

router.put(
    "/:id",
    checkRole(["admin"]),
    validateIdParam,
    checkFoodObj,
    updateFood
);

router.delete(
    "/:id",
    checkRole(["admin"]),
    validateIdParam,
    deleteFood
);

router.get(
    "/:id",
    validateIdParam,
    getFoodById
);

router.get(
    "/categories/:id",
    validateIdParam,
    getFoodByCategory
)

export default router;