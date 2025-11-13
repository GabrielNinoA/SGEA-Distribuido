import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { Product } from "../../domain/models/Product";

export class GetAllProducts {
  constructor(private repo: ProductRepository) {}

  async execute(): Promise<Product[]> {
    const products = await this.repo.findAll();

    return products;
  }
}
