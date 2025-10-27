import { Activity } from '../entities/activity.entity';

// Esta interfaz define los métodos que debe implementar cualquier repositorio de actividades.
export interface ActivityRepository {
    create(activity: Activity): Promise<Activity>;
    assignActivity(activityId: number, employeeId: number): Promise<void>;
    getAll(): Promise<Activity[]>;
    getById(id: number): Promise<Activity | null>;
}