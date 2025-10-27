import { Product } from "../../domain/models/Product";

export class ProductRepositoryInMemory{
    private products: Product[] = [];


    save(product: Product): Product{
        this.products.push(product);
        return product;
    }
    findAll():Product[]{
        return this.products;
    }
    getByID(id: number): Product | null{
        return this.products.find(p => p.id === id ) || null;
    }
    updateQuantity(product: Product):void{
        const index = this.products.findIndex(P => P.id === product.id);
        if(index !== -1){
            this.products[index] = product;
        }
    }
}