import express from "express";
import cors from "cors";
import { json } from "body-parser";

import { sequelize } from "./infrastructure/db/database";
import "./infrastructure/db/models/ActivityModel";
import "./infrastructure/db/models/ActivityEmployeeModel";
import "./infrastructure/db/models/ActivityProductModel";
import "./infrastructure/db/associations";

import { buildActivityModule } from "./app";

export async function startServer() {
    const app = express();
    const PORT = process.env.PORT || 3003;

    // Middlewares
    app.use(cors());
    app.use(json());

    // Rutas del microservicio
    const activityRoutes = buildActivityModule();
    app.use("/", activityRoutes);

    // Health check
    app.get("/health", (req, res) => {
        res.json({ status: "Activity Service OK" });
    });

    // Error global
    app.use((err: any, req: any, res: any, next: any) => {
        console.error("Error:", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        });
    });

    // Conexión BD y arranque
    try {
        await sequelize.authenticate();
        console.log("Conectado a la base de datos");

        await sequelize.sync({ alter: false });

        app.listen(PORT, () => {
            console.log(`Activity Service corriendo en puerto ${PORT}`);
        });

    } catch (err) {
        console.error("Error al conectar la BD:", err);
        process.exit(1);
    }
}
