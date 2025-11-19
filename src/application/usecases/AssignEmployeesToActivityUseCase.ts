import { AssignEmployeesDTO } from "../../domain/dto/AssignEmployeesDTO";
import { ActivityRepository } from "../../domain/repositories/ActivityRepository";
import { EmployeeClient } from "../../infrastructure/clients/EmployeeClient";

export class AssignEmployeesToActivityUseCase {
    constructor(
        private activityRepo: ActivityRepository,
        private employeeClient: EmployeeClient
    ) {}

    async execute(data: AssignEmployeesDTO) {
        const activity = await this.activityRepo.getActivityById(data.id_actividad);
        if (!activity) throw new Error("Actividad no encontrada");

        if (activity.estado === "COMPLETADA") {
            throw new Error("No se pueden asignar empleados a una actividad completada");
        }

        for (const id_empleado of data.empleados) {
            const emp = await this.employeeClient.getEmployeeById(id_empleado);
            if (!emp) throw new Error(`Empleado ${id_empleado} no existe`);
        }

        await this.activityRepo.assignEmployees(data.id_actividad, data.empleados);

        return { message: "Empleados asignados correctamente" };
    }
}
