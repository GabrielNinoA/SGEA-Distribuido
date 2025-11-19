import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Crear instancia de Sequelize
export const sequelize = new Sequelize(
    process.env.DB_NAME || "",
    process.env.DB_USER || "",
    process.env.DB_PASSWORD || "",
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        dialect: "mysql",
        logging: process.env.NODE_ENV === "development" ? console.log : false,
    }
);

// Importar todos los modelos
import "./models/ActivityModel";
import "./models/ActivityEmployeeModel";
import "./models/ActivityProductModel";
import "./models/EmployeeModel";
import "./models/ProductModel";

import "./associations";

// Función para conectar BD
export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Base de datos conectadas correctamente (Activities MS)");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        process.exit(1);
    }
};
