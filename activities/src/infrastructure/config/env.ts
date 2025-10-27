import dotenv from 'dotenv'; // Importa y configura dotenv para cargar variables de entorno desde un archivo .env
dotenv.config();

// Exporta un objeto con las variables de entorno necesarias para la configuración de la aplicación
export const env = {
    PORT: process.env.PORT || 3001,
    DB_NAME: process.env.DB_NAME || 'activities_db',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_DIALECT: process.env.DB_DIALECT || 'mysql',
};
