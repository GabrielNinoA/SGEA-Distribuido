import { Product } from "../models/Product";

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  getByID(id: number): Promise<Product | null>;
  updateQuantity(product: Product): Promise<void>;
}