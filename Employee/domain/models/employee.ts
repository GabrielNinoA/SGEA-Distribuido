
export interface Employee {
    id_empleado: number;
    id_usuario: number;
    nombre: string;
    documento: string;
    estado: 'ACTIVO' | 'INACTIVO';
    fecha_ingreso: Date;
    salario: number;
}