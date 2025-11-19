export interface UpdateActivityStatusDTO {
    id_actividad: number;
    estado: "PENDIENTE" | "EN_PROCESO" | "COMPLETADA";
}
