import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Empleado } from './empleado.entity';

@Entity('Usuarios')
export class Usuario {
    @PrimaryGeneratedColumn('increment', { name: 'id_usuario' })
    id_usuario!: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    nickname!: string;

    @Column({ type: 'varchar', length: 255 })
    password!: string;

    @Column({ type: 'enum', enum: ['ADMIN', 'EMPLE'] })
    rol!: 'ADMIN' | 'EMPLE';

    @OneToOne(() => Empleado, empleado => empleado.usuario, { nullable: true })
    empleado?: Empleado;
}