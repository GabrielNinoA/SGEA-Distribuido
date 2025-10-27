import { ActivityRepository } from "../repositories/activity.repository";
import { Activity } from "../entities/activity.entity";

// Esta clase maneja la lógica de negocio relacionada con las actividades.
export class ActivityService {

    // Inyección de la dependencia del repositorio de actividades.
    constructor(private activityRepository: ActivityRepository) { }

    // Crea una nueva actividad.
    async createActivity(activity: Activity): Promise<Activity> {
        return this.activityRepository.create(activity);
    }

    // Asigna una actividad a un empleado.
    async assignActivity(activityId: number, employeeId: number): Promise<void> {
        return this.activityRepository.assignActivity(activityId, employeeId);
    }

    // Obtiene todas las actividades.
    async getAllActivities(): Promise<Activity[]> {
        return this.activityRepository.getAll();
    }

    // Obtiene una actividad por su ID.
    async getActivityById(id: number): Promise<Activity | null> {
        const activity = await this.activityRepository.getById(id);
        if (!activity) throw new Error('Actividad no encontrada');
        return activity;
    }
}