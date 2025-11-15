import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('Empleados')
export class Empleado {
    @PrimaryGeneratedColumn('increment', { name: 'id_empleado' })
    id_empleado!: number;

    @Column({ name: 'id_usuario' })
    id_usuario!: number;

    @Column({ type: 'varchar', length: 100 })
    nombre!: string;

    @Column({ type: 'varchar', length: 20, unique: true })
    documento!: string;

    @Column({ type: 'enum', enum: ['ACTIVO', 'INACTIVO'], default: 'ACTIVO' })
    estado: 'ACTIVO' | 'INACTIVO' = 'ACTIVO';

    @Column({ type: 'date' })
    fecha_ingreso!: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    salario!: number;

    @OneToOne(() => Usuario, usuario => usuario.empleado)
    @JoinColumn({ name: 'id_usuario' })
    usuario!: Usuario;
}