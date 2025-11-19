export interface CreateActivityDTO {
    titulo: string;
    descripcion?: string;
    fecha_inicio: Date;
    fecha_fin?: Date | null;
    creado_por: number;  // usuario creador (ADMIN o EMPLE)
}
