import { Router } from "express";
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "@/controllers/category.controller";
import { checkCategoryNameAlreadyExist, checkCategoryObj} from "@/middlewares/checkObjects/checkCategory";
import { validateIdParam } from "@/middlewares/validateIdParam";

const router = Router();

router.get(
    "/",
    getCategories
);

router.post(
    "/",
    checkCategoryObj,
    checkCategoryNameAlreadyExist,
    createCategory
);

router.put(
    "/:id",
    validateIdParam,
    checkCategoryObj,
    checkCategoryNameAlreadyExist,
    updateCategory
);

router.delete(
    "/:id",
    validateIdParam,
    deleteCategory
);

router.get(
    "/:id",
    validateIdParam,
    getCategoryById
);

export default router;