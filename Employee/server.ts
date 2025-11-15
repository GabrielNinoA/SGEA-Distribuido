import 'reflect-metadata';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

import express from 'express';
import { AppDataSource } from './infrastructure/database/data-source';
import { setupRoutes } from './app';

const app = express();
const port = parseInt(process.env.PORT || '3307', 10);

// Inicializar TypeORM y luego iniciar el servidor
AppDataSource.initialize()
    .then(() => {
        console.log('Database connection established');

        // Configurar rutas
        setupRoutes(app, AppDataSource);

        // Iniciar el servidor
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error('Error during Data Source initialization:', error);
        process.exit(1);
    });