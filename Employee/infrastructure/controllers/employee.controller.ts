import { Request, Response } from 'express';
import { EmployeeUseCase } from '../../application/usecases/employee.usecase';
import { RequestEmployee } from '../../domain/dto/requestemployee';

export class EmployeeController {
    constructor(private employeeUseCase: EmployeeUseCase) {}

    async createEmployee(req: Request, res: Response): Promise<void> {
        try {
            const employeeData: RequestEmployee = req.body;
            await this.employeeUseCase.createEmployee(employeeData);
            res.status(201).json({ message: 'Employee created successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error creating employee' });
        }
    }

    async getEmployeeById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const employee = await this.employeeUseCase.getEmployeeById(id);
            if (employee) {
                res.json(employee);
            } else {
                res.status(404).json({ error: 'Employee not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving employee' });
        }
    }

    async updateEmployee(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const employeeData: Partial<RequestEmployee> = req.body;
            await this.employeeUseCase.updateEmployee(id, employeeData);
            res.json({ message: 'Employee updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error updating employee' });
        }
    }

    async deleteEmployee(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await this.employeeUseCase.deleteEmployee(id);
            res.json({ message: 'Employee deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting employee' });
        }
    }

    async getAllEmployees(req: Request, res: Response): Promise<void> {
        try {
            const employees = await this.employeeUseCase.getAllEmployees();
            res.json(employees);
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving employees' });
        }
    }
}