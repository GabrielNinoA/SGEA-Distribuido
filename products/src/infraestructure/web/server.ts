import express from "express";
import ProductRoutes from "./routes/ProductRoutes";
import { ProductService } from "../../app/services/ProductService";

export const startServer = (productService : ProductService) => {
    const app = express();
    const PORT  = 7674;
    app.use(express.json());

    app.use("/products", ProductRoutes(productService));
    app.listen(PORT, ()=> {
         console.log(`Microservicio de productos corriendo en http://localhost:${PORT}`);
    })
}