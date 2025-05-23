import { Router } from "express";
import { getRoles, getRoleById, createRole, updateRole, deleteRole } from "@/controllers/role.controller";
import { checkRoleNameAlreadyExist, checkRoleObj } from "@/middlewares/checkObjects/checkRole";
import { validateIdParam } from "@/middlewares/validateIdParam";
import { checkRole } from "@/middlewares/authMiddleware";

const router = Router();

router.get(
    "/",
    checkRole(["admin", "operator"]),
    getRoles
);

router.post(
    "/",
    checkRole(["admin"]),
    checkRoleObj,
    checkRoleNameAlreadyExist,
    createRole
);

router.put(
    "/:id",
    checkRole(["admin"]),
    validateIdParam,
    checkRoleObj,
    checkRoleNameAlreadyExist,
    updateRole
);

router.delete(
    "/:id",
    checkRole(["admin"]),
    validateIdParam,
    deleteRole
);

router.get(
    "/:id",
    checkRole(["admin", "operator"]),
    validateIdParam,
    getRoleById
);

export default router;