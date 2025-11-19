export interface UpdateActivityDTO {
    id_actividad: number;
    titulo?: string;
    descripcion?: string;
    fecha_inicio?: Date;
    fecha_fin?: Date | null;
}
