import { Employee } from "../../domain/models/employee";
import { RequestEmployee } from "../../domain/dto/requestemployee";
import { EmployeeRepository } from "../../domain/repositories/employeerepository";

export class EmployeeUseCase {
    constructor(private employeeRepository: EmployeeRepository) {}

    async createEmployee(employeeData: RequestEmployee): Promise<void> {
        await this.employeeRepository.createEmployee(employeeData);
    }

    async getEmployeeById(id: number): Promise<Employee | null> {
        return await this.employeeRepository.getEmployeeById(id);
    }

    async updateEmployee(id: number, employeeData: Partial<RequestEmployee>): Promise<void> {
        await this.employeeRepository.updateEmployee(id, employeeData);
    }

    async deleteEmployee(id: number): Promise<void> {
        await this.employeeRepository.deleteEmployee(id);
    }

    async getAllEmployees(): Promise<Employee[]> {
        return await this.employeeRepository.getAllEmployees();
    }
}