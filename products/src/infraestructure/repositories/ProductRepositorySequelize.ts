import { Product } from "../../domain/models/Product";
import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { ProductModel } from "../../domain/models/ProductModel";

export class ProductRepositorySequelize {
  async save(product: Product): Promise<Product> {
    const created = await ProductModel.create(product as any);
    return created.toJSON() as Product;
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();
    return products.map((p) => p.toJSON() as Product);
  }

  async getByID(id: number): Promise<Product | null> {
    const product = await ProductModel.findByPk(id);
    return product ? (product.toJSON() as Product) : null;
  }
  async updateQuantity(product: Product): Promise<void> {
    await ProductModel.update(
      { cantidad: product.cantidad },
      { where: { id: product.id } }
    );
  }
}
