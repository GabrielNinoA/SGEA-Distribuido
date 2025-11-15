import { Router, Request, Response } from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware';

export const createAuthRouter = () => {
    const router = Router();

    // Ruta de prueba para generar un token
    router.post('/generate-test-token', (req: Request, res: Response) => {
        const testUser = {
            id_usuario: 1,
            nickname: "test.user",
            rol: "ADMIN" as const
        };

        const token = AuthMiddleware.generateToken(testUser);
        
        res.json({
            message: "Token de prueba generado",
            token,
            headerFormat: `Bearer ${token}`,
            instructions: "Copia el valor de 'headerFormat' en el header 'Authorization' de tus requests"
        });
    });

    return router;
};