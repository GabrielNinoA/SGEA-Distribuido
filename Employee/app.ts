import express, { Express } from 'express';
import { DataSource } from 'typeorm';
import { EmployeeRepositoryImpl } from './infrastructure/repositories/employee.repository.impl';
import { EmployeeUseCase } from './application/usecases/employee.usecase';
import { EmployeeController } from './infrastructure/controllers/employee.controller';
import { createEmployeeRouter } from './infrastructure/routers/employee.router';
import { createAuthRouter } from './infrastructure/routers/auth.router';

export function setupRoutes(app: Express, dataSource: DataSource): void {
    // Middleware
    app.use(express.json());

    // Dependency injection
    const employeeRepository = new EmployeeRepositoryImpl(dataSource);
    const employeeUseCase = new EmployeeUseCase(employeeRepository);
    const employeeController = new EmployeeController(employeeUseCase);

    // Routes
    app.use('/employees', createEmployeeRouter(employeeController));
    app.use('/auth', createAuthRouter());
}
