import 'reflect-metadata';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { Usuario } from './entities/usuario.entity';

// Cargar variables de entorno
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'gestion_actividades',
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    entities: [Empleado, Usuario],
    migrations: [],
    subscribers: [],
});