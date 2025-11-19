import { UpdateActivityStatusDTO } from "../../domain/dto/UpdateActivityStatusDTO";
import { ActivityRepository } from "../../domain/repositories/ActivityRepository";

export class ChangeActivityStateUseCase {
    constructor(private activityRepo: ActivityRepository) {}

    async execute(data: UpdateActivityStatusDTO) {
        const activity = await this.activityRepo.getActivityById(data.id_actividad);

        if (!activity) throw new Error("Actividad no encontrada");

        const transitions: any = {
            PENDIENTE: ["EN_PROCESO"],
            EN_PROCESO: ["COMPLETADA"],
            COMPLETADA: []
        };

        if (!transitions[activity.estado].includes(data.estado)) {
            throw new Error(`No se puede cambiar de ${activity.estado} a ${data.estado}`);
        }

        return await this.activityRepo.updateActivity(data.id_actividad, {
            estado: data.estado
        });
    }
}
