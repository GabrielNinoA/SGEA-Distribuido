import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export class AuthMiddleware {
    static verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers["authorization"]?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token no proporcionado" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
            (req as any).user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Token inválido" });
        }
    }

    static allowRoles(roles: string[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            const user = (req as any).user;

            if (!roles.includes(user.rol)) {
                return res.status(403).json({ message: "Acceso denegado" });
            }

            next();
        };
    }
}
