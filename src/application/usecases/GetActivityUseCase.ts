import { ActivityRepository } from "../../domain/repositories/ActivityRepository";

export class GetActivityUseCase {
    constructor(
        private activityRepo: ActivityRepository
    ) {}

    async execute(id: number) {
        const activity = await this.activityRepo.getActivityById(id);

        if (!activity) throw new Error("Actividad no encontrada");

        const empleados = await this.activityRepo.getEmployeesByActivity(id);
        const productos = await this.activityRepo.getProductsByActivity(id);

        return {
            activity,
            empleados,
            productos
        };
    }
}
