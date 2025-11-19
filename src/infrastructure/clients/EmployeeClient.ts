export class EmployeeClient {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.EMPLOYEE_MS_URL || "http://localhost:3001";
    }

    async getEmployeeById(id: number) {
        const response = await fetch(`${this.baseUrl}/employees/${id}`);

        if (!response.ok) {
            throw new Error(`Error consultando empleado ${id}: ${response.statusText}`);
        }

        return await response.json();
    }

    async validateEmployeeExists(id: number): Promise<boolean> {
        try {
            const emp = await this.getEmployeeById(id);
            return emp ? true : false;
        } catch {
            return false;
        }
    }
}
