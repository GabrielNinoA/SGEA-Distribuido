export interface AssignProductsDTO {
    id_actividad: number;
    productos: {
        id_producto: number;
        cantidad_usada: number;
        unidad: string;
    }[];
}
