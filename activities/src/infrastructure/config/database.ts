import { Sequelize } from 'sequelize';
import { env } from './env';

// Configuración de la instancia de Sequelize para conectarse a la base de datos MySQL
export const sequelize = new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASSWORD,
    {
        host: env.DB_HOST,
        dialect: 'mysql',
        logging: false,
    }
);

// Función para conectar a la base de datos y manejar errores de conexión
export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};