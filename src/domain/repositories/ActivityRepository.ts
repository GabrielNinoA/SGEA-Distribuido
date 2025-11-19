import { Activity } from "../models/Activity";

export interface ActivityRepository {
    createActivity(data: any): Promise<Activity>;
    updateActivity(id_actividad: number, data: any): Promise<Activity | null>;
    deleteActivity(id_actividad: number): Promise<void>;
    getActivityById(id_actividad: number): Promise<Activity | null>;
    getAllActivities(): Promise<Activity[]>;

    assignEmployees(id_actividad: number, empleados: number[]): Promise<void>;

    addProducts(
        id_actividad: number,
        productos: {
            id_producto: number;
            cantidad_usada: number;
            unidad?: string;
        }[]
    ): Promise<void>;

    getEmployeesByActivity(id_actividad: number): Promise<any[]>;

    getProductsByActivity(id_actividad: number): Promise<any[]>;
}
