import { ProductService } from "./services/ProductService";
import { ProductRepositorySequelize } from "../infraestructure/repositories/ProductRepositorySequelize";
import { connectBD } from "../infraestructure/repositories/database";
import { startServer } from "../infraestructure/web/server";


export async function boostrap() {
    await connectBD();

    const repo = new ProductRepositorySequelize();
    const service = new ProductService(repo);

    startServer(service);


}
boostrap();
