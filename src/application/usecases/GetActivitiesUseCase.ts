import { ActivityRepository } from "../../domain/repositories/ActivityRepository";

export class GetActivitiesUseCase {
    constructor(private activityRepo: ActivityRepository) {}

    async execute() {
        return await this.activityRepo.getAllActivities();
    }
}
