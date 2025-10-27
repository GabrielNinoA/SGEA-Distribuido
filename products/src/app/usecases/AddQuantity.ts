import { Product } from "../../domain/models/Product";
import { ProductRepository } from "../../domain/repositories/ProductRepository";

export class AddProductQuantity {
    constructor( private repo: ProductRepository){}

    execute(id: number, cantidad: number ): Product | null {
        const product =  this.repo.getByID(id);
        if(!product){
            return null;
        }
        product.cantidad += cantidad;
        this.repo.updateQuantity(product);
        return product;

    }
}