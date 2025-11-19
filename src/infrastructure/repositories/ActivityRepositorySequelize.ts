import { ActivityRepository } from "../../domain/repositories/ActivityRepository";

import { ActivityModel } from "../db/models/ActivityModel";
import { ActivityEmployeeModel } from "../db/models/ActivityEmployeeModel";
import { ActivityProductModel } from "../db/models/ActivityProductModel";
import { Activity } from "../../domain/models/Activity";

export class ActivityRepositorySequelize implements ActivityRepository {

    async createActivity(data: any): Promise<Activity> {
        const activity = await ActivityModel.create(data);
        return activity.get({ plain: true }) as Activity;
    }

    async updateActivity(id_actividad: number, data: any): Promise<Activity | null> {
        const activity = await ActivityModel.findByPk(id_actividad);
        if (!activity) return null;

        await activity.update(data);
        return activity.get({ plain: true }) as Activity;
    }

    async deleteActivity(id_actividad: number): Promise<void> {
        await ActivityModel.destroy({ where: { id_actividad } });
    }

    async getActivityById(id_actividad: number): Promise<Activity | null> {
        const activity = await ActivityModel.findByPk(id_actividad, {
            include: [
                { model: ActivityEmployeeModel, as: "empleados" },
                { model: ActivityProductModel, as: "productos" }
            ]
        });

        if (!activity) return null;

        return activity.get({ plain: true }) as Activity;
    }

    async getAllActivities(): Promise<Activity[]> {
        const activities = await ActivityModel.findAll({
            include: [
                { model: ActivityEmployeeModel, as: "empleados" },
                { model: ActivityProductModel, as: "productos" }
            ]
        });

        return activities.map(a => a.get({ plain: true }) as Activity);
    }

    async assignEmployees(id_actividad: number, empleados: number[]): Promise<void> {
        const registros = empleados.map(id_empleado => ({
            id_actividad,
            id_empleado
        }));

        await ActivityEmployeeModel.bulkCreate(registros, {
            ignoreDuplicates: true
        });
    }

    async addProducts(
        id_actividad: number,
        productos: {
            id_producto: number;
            cantidad_usada: number;
            unidad?: string;
        }[]
    ): Promise<void> {

        const registros = productos.map(p => ({
            id_actividad,
            id_producto: p.id_producto,
            cantidad_usada: p.cantidad_usada,
            unidad: p.unidad
        }));

        await ActivityProductModel.bulkCreate(registros);
    }

    async getEmployeesByActivity(id_actividad: number): Promise<any[]> {
        return ActivityEmployeeModel.findAll({
            where: { id_actividad },
            raw: true
        });
    }

    async getProductsByActivity(id_actividad: number): Promise<any[]> {
        return ActivityProductModel.findAll({
            where: { id_actividad },
            raw: true
        });
    }
}
