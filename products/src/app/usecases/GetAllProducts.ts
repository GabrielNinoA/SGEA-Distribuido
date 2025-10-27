import { ProductRepository } from "../../domain/repositories/ProductRepository";

export class GetAllProducts{
    constructor(private repo: ProductRepository){}
    
    execute(){
        return this.repo.findAll();
    }
}