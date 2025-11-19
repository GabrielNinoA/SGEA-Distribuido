export interface Activity {
    id_actividad: number;
    titulo: string;
    descripcion?: string;
    fecha_inicio: Date;
    fecha_fin?: Date | null;
    estado: "PENDIENTE" | "EN_PROCESO" | "COMPLETADA";
    creado_por: number; // id_usuario
}
