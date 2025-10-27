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
    registrarProducto(data:any){
        return this.createProduct.execute(data);
    }
    getProducts(){
        return this.getAllProducts.execute(); 
    }
    getByID(id: number){
        return this.getById.execute(id);
    }
    addQuantityProduct(id: number, cantidad: number){
        return this.addQuantity.execute(id, cantidad);
    }
    
}