import { ActivityModel } from "../../infrastructure/db/models/ActivityModel";
import { Activity } from "../../domain/models/Activity";

export class ActivityMapper {
    static toDomain(activityModel: ActivityModel): Activity {
        return {
            id_actividad: activityModel.id_actividad,
            titulo: activityModel.titulo,
            descripcion: activityModel.descripcion || undefined,
            fecha_inicio: activityModel.fecha_inicio,
            fecha_fin: activityModel.fecha_fin || null,
            estado: activityModel.estado,
            creado_por: activityModel.creado_por
        };
    }

    static toResponseDto(activity: Activity) {
        return {
            id_actividad: activity.id_actividad,
            titulo: activity.titulo,
            descripcion: activity.descripcion,
            fecha_inicio: activity.fecha_inicio,
            fecha_fin: activity.fecha_fin,
            estado: activity.estado,
            creado_por: activity.creado_por
        };
    }

    static toDomainList(activityModels: ActivityModel[]): Activity[] {
        return activityModels.map(this.toDomain);
    }
}