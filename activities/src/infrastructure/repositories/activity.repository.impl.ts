import { ActivityRepository } from "../../domain/repositories/activity.repository";
import { Activity } from "../../domain/entities/activity.entity";
import { ActivityModel } from "../models/activity.model";

// Implementación del repositorio de actividades utilizando Sequelize
export class SequelizeActivityRepository implements ActivityRepository {

    // Crea una nueva actividad en la base de datos.
    async create(activity: Activity): Promise<Activity> {
        const createdActivity = await ActivityModel.create({
            title: activity.title,
            description: activity.description,
            assignedTo: activity.assignedTo || null,
            status: activity.status || 'pending',
        });
        return createdActivity.toJSON() as Activity;
    }

    // Asigna una actividad a un empleado específico en la base de datos.
    async assignActivity(activityId: number, employeeId: number): Promise<void> {
        await ActivityModel.update(
            { assignedTo: employeeId },
            { where: { id: activityId } }
        );
    }

    // Obtiene todas las actividades desde la base de datos.
    async getAll(): Promise<Activity[]> {
        const activities = await ActivityModel.findAll();
        return activities.map(activity => activity.toJSON() as Activity);
    }

    // Obtiene una actividad por su ID desde la base de datos.
    async getById(id: number): Promise<Activity | null> {
        const activity = await ActivityModel.findByPk(id);
        return activity ? (activity.toJSON() as Activity) : null;
    }
}