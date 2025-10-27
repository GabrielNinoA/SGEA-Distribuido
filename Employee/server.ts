import express from 'express';
import { createEmployeeRouter } from './infrastructure/routers/employee.router';
import { createAuthRouter } from './infrastructure/routers/auth.router';
import { EmployeeRepositoryImpl } from './infrastructure/repositories/employee.repository.impl';
import { EmployeeUseCase } from './application/usecases/employee.usecase';
import { EmployeeController } from './infrastructure/controllers/employee.controller';

const app = express();
const port = 3307;

// Middleware para parsear JSON
app.use(express.json());

// Configuración del router de empleados
const employeeRepository = new EmployeeRepositoryImpl();
const employeeUseCase = new EmployeeUseCase(employeeRepository);
const employeeController = new EmployeeController(employeeUseCase);
const employeeRouter = createEmployeeRouter(employeeController);
const authRouter = createAuthRouter();

// Rutas
app.use('/auth', authRouter);
app.use('/employees', employeeRouter);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});