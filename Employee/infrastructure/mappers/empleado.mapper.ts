import { Empleado } from '../database/entities/empleado.entity';
import { RequestEmployee } from '../../domain/dto/requestemployee';
import { Employee } from '../../domain/models/employee';

export class EmpleadoMapper {
    static toDomain(empleadoEntity: Empleado): Employee {
        return {
            id_empleado: empleadoEntity.id_empleado,
            id_usuario: empleadoEntity.id_usuario,
            nombre: empleadoEntity.nombre,
            documento: empleadoEntity.documento,
            estado: empleadoEntity.estado,
            fecha_ingreso: empleadoEntity.fecha_ingreso,
            salario: Number(empleadoEntity.salario)
        };
    }

    static toEntity(requestEmployee: RequestEmployee, usuarioId: number): Empleado {
        const empleado = new Empleado();
        empleado.nombre = requestEmployee.nombre;
        empleado.documento = requestEmployee.documento;
        empleado.fecha_ingreso = requestEmployee.fecha_ingreso;
        empleado.salario = requestEmployee.salario;
        empleado.id_usuario = usuarioId;
        empleado.estado = 'ACTIVO';
        return empleado;
    }

    static toUpdateEntity(empleado: Empleado, requestEmployee: Partial<RequestEmployee>): Empleado {
        if (requestEmployee.nombre) empleado.nombre = requestEmployee.nombre;
        if (requestEmployee.salario) empleado.salario = requestEmployee.salario;
        if (requestEmployee.fecha_ingreso) empleado.fecha_ingreso = requestEmployee.fecha_ingreso;
        return empleado;
    }

    static toDomainArray(empleados: Empleado[]): Employee[] {
        return empleados.map(empleado => this.toDomain(empleado));
    }
}