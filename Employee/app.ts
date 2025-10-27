import express from 'express';
import { EmployeeRepositoryImpl } from './infrastructure/repositories/employee.repository.impl';
import { EmployeeUseCase } from './application/usecases/employee.usecase';
import { EmployeeController } from './infrastructure/controllers/employee.controller';
import { createEmployeeRouter } from './infrastructure/routers/employee.router';

const app = express();

// Middleware
app.use(express.json());

// Dependency injection
const employeeRepository = new EmployeeRepositoryImpl();
const employeeUseCase = new EmployeeUseCase(employeeRepository);
const employeeController = new EmployeeController(employeeUseCase);

// Routes
app.use('/api/employees', createEmployeeRouter(employeeController));

export default app;
