import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { buildActivityModule } from "../../app";
import { sequelize } from "../db/database";

export async function startServer() {
    const app = express();
    const PORT = process.env.PORT || 3003;

    app.use(cors());
    app.use(json());

    const routes = buildActivityModule();
    app.use("/activities", routes);

    app.get("/", (req, res) => {
        res.json({ message: "Activity Service Running" });
    });

    try {
        await sequelize.authenticate();
        console.log("Database connected.");

        app.listen(PORT, () => {
            console.log(`Activity service running on port ${PORT}`);
        });

    } catch (err) {
        console.error("DB connection error:", err);
        process.exit(1);
    }
}
