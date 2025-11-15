import 'reflect-metadata';
import { Repository, DataSource } from 'typeorm';
import { Employee } from "../../domain/models/employee";
import { RequestEmployee } from "../../domain/dto/requestemployee";
import { EmployeeRepository } from "../../domain/repositories/employeerepository";
import { Empleado } from '../database/entities/empleado.entity';
import { Usuario } from '../database/entities/usuario.entity';
import { EmpleadoMapper } from '../mappers/empleado.mapper';
import { UsuarioMapper } from '../mappers/usuario.mapper';

export class EmployeeRepositoryImpl implements EmployeeRepository {
    private empleadoRepository: Repository<Empleado>;
    private usuarioRepository: Repository<Usuario>;
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.empleadoRepository = dataSource.getRepository(Empleado);
        this.usuarioRepository = dataSource.getRepository(Usuario);
    }

    async createEmployee(employee: RequestEmployee): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Crear usuario
            const usuario = UsuarioMapper.toEntity({
                nickname: employee.nickname,
                password: employee.password,
                rol: 'EMPLE'
            });

            const usuarioCreado = await queryRunner.manager.save(usuario);

            // Crear empleado
            const empleado = EmpleadoMapper.toEntity(employee, usuarioCreado.id_usuario);
            await queryRunner.manager.save(empleado);

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async getEmployeeById(id: number): Promise<Employee | null> {
        const empleado = await this.empleadoRepository.findOne({
            where: {
                id_empleado: id,
                estado: 'ACTIVO'
            },
            relations: ['usuario']
        });

        if (!empleado) return null;
        return EmpleadoMapper.toDomain(empleado);
    }

    async updateEmployee(id: number, employee: Partial<RequestEmployee>): Promise<void> {
        const empleado = await this.empleadoRepository.findOne({
            where: { id_empleado: id }
        });

        if (!empleado) {
            throw new Error(`Empleado con id ${id} no encontrado`);
        }

        const empleadoActualizado = EmpleadoMapper.toUpdateEntity(empleado, employee);
        await this.empleadoRepository.save(empleadoActualizado);
    }

    async deleteEmployee(id: number): Promise<void> {
        const empleado = await this.empleadoRepository.findOne({
            where: { id_empleado: id }
        });

        if (!empleado) {
            throw new Error(`Empleado con id ${id} no encontrado`);
        }

        empleado.estado = 'INACTIVO';
        await this.empleadoRepository.save(empleado);
    }

    async getAllEmployees(): Promise<Employee[]> {
        const empleados = await this.empleadoRepository.find({
            where: { estado: 'ACTIVO' },
            relations: ['usuario']
        });

        return EmpleadoMapper.toDomainArray(empleados);
    }
}
