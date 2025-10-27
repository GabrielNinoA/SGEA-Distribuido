import { Product } from "../../domain/models/Product";
import { ProductRepository } from "../../domain/repositories/ProductRepository";

export class CreateProduct{
    private currentId = 1;
    constructor(private productRepo: ProductRepository){}

    execute(data: Omit<Product, "id">): Product{
        const newProduct = new Product(this.currentId++, data.name, data.cantidad, data.tipoProducto, data.unidadMedida, data.fechaVencimiento);
        return this.productRepo.save(newProduct);
    }
}