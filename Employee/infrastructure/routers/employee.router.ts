import { Router, Request, Response } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

export const createEmployeeRouter = (employeeController: EmployeeController): Router => {
    const router = Router();

    // Aplicar middleware de logging a todas las rutas
    router.use(AuthMiddleware.logAuth);

    // Rutas públicas (no requieren autenticación)
    router.get('/public/count', AuthMiddleware.optionalAuth, (req: Request, res: Response) => {
        employeeController.getAllEmployees(req, res);
    });

    // Rutas protegidas (requieren autenticación)
    router.use(AuthMiddleware.verifyToken);

    // Rutas para todos los usuarios autenticados
    router.get('/:id', (req: Request, res: Response) => {
        employeeController.getEmployeeById(req, res);
    });

    // Rutas para administradores
    router.post('/', AuthMiddleware.checkRole(['ADMIN']), (req: Request, res: Response) => {
        employeeController.createEmployee(req, res);
    });

    router.put('/:id', AuthMiddleware.checkRole(['ADMIN']), (req: Request, res: Response) => {
        employeeController.updateEmployee(req, res);
    });

    router.delete('/:id', AuthMiddleware.checkRole(['ADMIN']), (req: Request, res: Response) => {
        employeeController.deleteEmployee(req, res);
    });
    
    // Rutas para administradores y empleados
    router.get('/', AuthMiddleware.checkRole(['ADMIN', 'EMPLE']), (req: Request, res: Response) => {
        employeeController.getAllEmployees(req, res);
    });

    return router;
};