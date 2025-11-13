import { Product } from "../../domain/models/Product";
import { ProductRepository } from "../../domain/repositories/ProductRepository";

export class CreateProduct{
    constructor(private productRepo: ProductRepository){}

    async execute(data: Omit<Product, "id">): Promise<Product>{
        const newProduct = new Product(0, data.name, data.cantidad, data.tipoProducto, data.unidadMedida, data.fechaVencimiento);
        const saveProduct = await this.productRepo.save(newProduct);
        return saveProduct; 
    }
}