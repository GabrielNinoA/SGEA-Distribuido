import express from "express";
import ProductRoutes from "./routes/ProductRoutes";
const app = express();
const PORT  = 7674;

app.use(express.json());
app.use("/products", ProductRoutes);

export const startServer = () => {
    app.listen(PORT, ()=> {
         console.log(`🚀 Microservicio de productos corriendo en http://localhost:${PORT}`);
    })
}