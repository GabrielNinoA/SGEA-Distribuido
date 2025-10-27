import { Product } from "../../domain/models/Product";
import { ProductRepository } from "../../domain/repositories/ProductRepository";

export class GetByID {
  constructor(private repo: ProductRepository) {}

  execute(id: number): Product | null {
    const product = this.repo.getByID(id);
    return product || null;
  }
}
