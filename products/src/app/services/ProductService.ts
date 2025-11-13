import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { AddProductQuantity } from "../usecases/AddQuantity";
import { CreateProduct } from "../usecases/CreateProduct";
import { GetAllProducts } from "../usecases/GetAllProducts";
import { GetByID } from "../usecases/GetById";

export class ProductService{
    private createProduct: CreateProduct;
    private getAllProducts: GetAllProducts;
    private getById : GetByID;
    private addQuantity: AddProductQuantity;
    
    constructor(repo: ProductRepository){
        this.createProduct = new CreateProduct(repo);
        this.getAllProducts = new GetAllProducts(repo);
        this.getById = new GetByID(repo);
        this.addQuantity = new AddProductQuantity(repo);
    }
    async registrarProducto(data:any){
        return await this.createProduct.execute(data);
    }
    async getProducts(){
        return await this.getAllProducts.execute(); 
    }
    async getByID(id: number){
        return await this.getById.execute(id);
    }
    async addQuantityProduct(id: number, cantidad: number){
        return await this.addQuantity.execute(id, cantidad);
    }
    
}