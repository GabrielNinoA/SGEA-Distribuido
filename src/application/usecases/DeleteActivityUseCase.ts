import { ActivityRepository } from "../../domain/repositories/ActivityRepository";

export class DeleteActivityUseCase {
    constructor(private activityRepo: ActivityRepository) {}

    async execute(id: number) {
        const activity = await this.activityRepo.getActivityById(id);

        if (!activity) throw new Error("Actividad no encontrada");

        await this.activityRepo.deleteActivity(id);
    }
}
