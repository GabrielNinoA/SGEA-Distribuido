import { Employee } from "../models/employee";
import { RequestEmployee } from "../dto/requestemployee";

export interface EmployeeRepository {
    createEmployee(employee: RequestEmployee): Promise<void>;
    getEmployeeById(id: number): Promise<Employee | null>;
    updateEmployee(id: number, employee: Partial<RequestEmployee>): Promise<void>;
    deleteEmployee(id: number): Promise<void>;
    getAllEmployees(): Promise<Employee[]>;
}