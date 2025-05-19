import { Router } from "express";
import { getFoods, getFoodById, getFoodByCategory, createFood, updateFood, deleteFood } from "@/controllers/food.controller";
import { checkFoodNameAlreadyExist, checkFoodObj} from "@/middlewares/checkObjects/checkFood";
import { validateIdParam } from "@/middlewares/validateIdParam";

const router = Router();

router.get(
    "/",
    getFoods
);

router.post(
    "/",
    checkFoodObj,
    checkFoodNameAlreadyExist,
    createFood
);

router.put(
    "/:id",
    validateIdParam,
    checkFoodObj,
    checkFoodNameAlreadyExist,
    updateFood
);

router.delete(
    "/:id",
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