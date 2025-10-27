import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

export const createEmployeeRouter = (employeeController: EmployeeController): Router => {
    const router = Router();

    // Aplicar middleware de logging a todas las rutas
    router.use(AuthMiddleware.logAuth);

    // Rutas públicas (no requieren autenticación)
    router.get('/public/count', AuthMiddleware.optionalAuth, (req, res) => employeeController.getAllEmployees(req, res));

    // Rutas protegidas (requieren autenticación)
    router.use(AuthMiddleware.verifyToken);

    // Rutas para todos los usuarios autenticados
    router.get('/:id', (req, res) => employeeController.getEmployeeById(req, res));

    // Rutas para administradores
    router.post('/', AuthMiddleware.checkRole(['admin']), (req, res) => employeeController.createEmployee(req, res));
    router.put('/:id', AuthMiddleware.checkRole(['admin']), (req, res) => employeeController.updateEmployee(req, res));
    router.delete('/:id', AuthMiddleware.checkRole(['admin']), (req, res) => employeeController.deleteEmployee(req, res));
    
    // Rutas para administradores y supervisores
    router.get('/', AuthMiddleware.checkRole(['admin', 'supervisor']), (req, res) => employeeController.getAllEmployees(req, res));

    return router;
};