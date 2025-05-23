import { Router } from "express";
import { getUsers, getUserById, createUser, deleteUser } from "@/controllers/user.controller";
import { checkUsernameAlreadyExist, checkUserObj } from "@/middlewares/checkObjects/checkUser";
import { validateIdParam } from "@/middlewares/validateIdParam";
import { checkRole } from "@/middlewares/authMiddleware";

const router = Router();

router.get(
    "/",
    checkRole(["admin"]),
    getUsers
);

router.post(
    "/",
    checkRole(["admin"]),
    checkUserObj,
    checkUsernameAlreadyExist,
    createUser
);

router.delete(
    "/:id",
    checkRole(["admin"]),
    validateIdParam,
    deleteUser
);

router.get(
    "/:id",
    checkRole(["admin"]),
    validateIdParam,
    getUserById
);

export default router;