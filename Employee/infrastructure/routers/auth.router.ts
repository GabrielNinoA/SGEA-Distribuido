import { Router } from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware';

export const createAuthRouter = () => {
    const router = Router();

    // Ruta de prueba para generar un token
    router.post('/generate-test-token', (req, res) => {
        const testUser = {
            id: 1,
            username: "test.user",
            rol: "admin"
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