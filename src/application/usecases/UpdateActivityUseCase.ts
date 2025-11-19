import { UpdateActivityDTO } from "../../domain/dto/UpdateActivityDTO";
import { ActivityRepository } from "../../domain/repositories/ActivityRepository";

export class UpdateActivityUseCase {
    constructor(private activityRepo: ActivityRepository) {}

    async execute(id: number, data: UpdateActivityDTO) {
        const activity = await this.activityRepo.getActivityById(id);

        if (!activity) throw new Error("Actividad no encontrada");

        if (activity.estado === "COMPLETADA") {
            throw new Error("No se puede modificar una actividad completada");
        }

        return await this.activityRepo.updateActivity(id, data);
    }
}
