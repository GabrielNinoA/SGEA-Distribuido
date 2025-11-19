import { CreateActivityDTO } from "../../domain/dto/CreateActivityDTO";
import { ActivityRepository } from "../../domain/repositories/ActivityRepository";
import { EmployeeClient } from "../../infrastructure/clients/EmployeeClient";

export class CreateActivityUseCase {
    constructor(
        private activityRepo: ActivityRepository,
        private employeeClient: EmployeeClient
    ) {}

    async execute(data: CreateActivityDTO) {

        if (!data.titulo || data.titulo.trim() === "") {
            throw new Error("El título es obligatorio");
        }

        if (isNaN(Date.parse(data.fecha_inicio.toString()))) {
            throw new Error("La fecha_inicio no es válida");
        }

        // validar que el creador exista
        const creador = await this.employeeClient.getEmployeeById(data.creado_por);
        if (!creador) throw new Error("El empleado creador no existe");

        return await this.activityRepo.createActivity(data);
    }
}
