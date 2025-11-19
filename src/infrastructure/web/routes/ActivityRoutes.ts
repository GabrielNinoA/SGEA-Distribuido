import { Router } from "express";
import { ActivityController } from "../controllers/ActivityController";
import { AuthMiddleware } from "../middleware/auth.middleware";

export function ActivityRoutes(controller: ActivityController): Router {
    const router = Router();

    router.post(
        "/",
        AuthMiddleware.verifyToken,
        AuthMiddleware.allowRoles(["ADMIN"]),
        (req, res) => controller.create(req, res)
    );

    router.put(
        "/:id",
        AuthMiddleware.verifyToken,
        AuthMiddleware.allowRoles(["ADMIN"]),
        (req, res) => controller.update(req, res)
    );

    router.patch(
        "/:id/state",
        AuthMiddleware.verifyToken,
        AuthMiddleware.allowRoles(["ADMIN", "EMPLE"]),
        (req, res) => controller.changeState(req, res)
    );

    router.post(
        "/:id/employees",
        AuthMiddleware.verifyToken,
        AuthMiddleware.allowRoles(["ADMIN"]),
        (req, res) => controller.assignEmployees(req, res)
    );

    router.post(
        "/:id/products",
        AuthMiddleware.verifyToken,
        AuthMiddleware.allowRoles(["ADMIN"]),
        (req, res) => controller.addProducts(req, res)
    );

    router.get(
        "/",
        AuthMiddleware.verifyToken,
        (req, res) => controller.getAll(req, res)
    );

    router.get(
        "/:id",
        AuthMiddleware.verifyToken,
        (req, res) => controller.getById(req, res)
    );

    router.delete(
        "/:id",
        AuthMiddleware.verifyToken,
        AuthMiddleware.allowRoles(["ADMIN"]),
        (req, res) => controller.delete(req, res)
    );

    return router;
}
