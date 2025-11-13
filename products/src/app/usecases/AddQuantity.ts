import { ProductRepository } from "../../domain/repositories/ProductRepository";

export class AddProductQuantity {
  constructor(private repo: ProductRepository) {}

  async execute(id: number, cantidad: number) {
    const product = await this.repo.getByID(id);
    if (!product) {
      return null;
    }
    product.cantidad += cantidad;
    await this.repo.updateQuantity(product);
    return product;
  }
}
