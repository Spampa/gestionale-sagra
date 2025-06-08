import { Router } from "express";
import { getFoods, getFoodById, getFoodByCategory, createFood, updateFood, deleteFood, getAvailableFoods, getAvailableFoodByCategory, patchFoodAvailable } from "@/controllers/food.controller";
import { checkFoodNameAlreadyExist, checkFoodObj } from "@/middlewares/checkObjects/checkFood";
import { validateIdParam } from "@/middlewares/validateIdParam";
import { checkRole } from "@/middlewares/authMiddleware";

const router = Router();

router.get(
    "/",
    getFoods
);

router.get(
    "/available/",
    getAvailableFoods
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

router.patch(
    "/available/:id",
    checkRole(["admin"]),
    validateIdParam,
    patchFoodAvailable
)

router.get(
    "/available/categories/:id",
    validateIdParam,
    getAvailableFoodByCategory
);

router.get(
    "/categories/:id",
    validateIdParam,
    getFoodByCategory
)

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



export default router;