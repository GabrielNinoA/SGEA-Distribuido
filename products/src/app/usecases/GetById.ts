import { Product } from "../../domain/models/Product";
import { ProductRepository } from "../../domain/repositories/ProductRepository";

export class GetByID {
  constructor(private repo: ProductRepository) {}

 async execute(id: number): Promise<Product | null>{
    const product = await this.repo.getByID(id);
    return product || null;
  }
}
