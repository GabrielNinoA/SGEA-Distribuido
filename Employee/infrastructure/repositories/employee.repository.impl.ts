import { Employee } from "../../domain/models/employee";
import { RequestEmployee } from "../../domain/dto/requestemployee";
import { EmployeeRepository } from "../../domain/repositories/employeerepository";
import mysql, { Pool, RowDataPacket } from 'mysql2/promise';

export class EmployeeRepositoryImpl implements EmployeeRepository {
    private pool: Pool;

    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'employee_db',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    async createEmployee(employee: RequestEmployee): Promise<void> {
        const query = `
            INSERT INTO employees (
                firstName, lastName, phone, email, 
                rol, incomeDate, isActive, username, password
            ) VALUES (?, ?, ?, ?, ?, ?, true, ?, ?)
        `;
        
        await this.pool.execute(query, [
            employee.firstName,
            employee.lastName,
            employee.phone,
            employee.email,
            employee.rol,
            employee.incomeDate,
            employee.username,
            employee.password
        ]);
    }

    async getEmployeeById(id: number): Promise<Employee | null> {
        const query = 'SELECT * FROM employees WHERE id = ? AND isActive = true';
        const [rows] = await this.pool.execute<RowDataPacket[]>(query, [id]);
        
        if (rows.length === 0) {
            return null;
        }
        
        return rows[0] as Employee;
    }

    async updateEmployee(id: number, employee: Partial<RequestEmployee>): Promise<void> {
        const entries = Object.entries(employee);
        if (entries.length === 0) return;

        const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
        const values = entries.map(([_, value]) => value);

        const query = `UPDATE employees SET ${setClause} WHERE id = ?`;
        await this.pool.execute(query, [...values, id]);
    }

    async deleteEmployee(id: number): Promise<void> {
        const query = 'UPDATE employees SET isActive = false WHERE id = ?';
        await this.pool.execute(query, [id]);
    }

    async getAllEmployees(): Promise<Employee[]> {
        const query = 'SELECT * FROM employees WHERE isActive = true';
        const [rows] = await this.pool.execute<RowDataPacket[]>(query);
        return rows as Employee[];
    }
}