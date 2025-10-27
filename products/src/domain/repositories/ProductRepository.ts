import { Product } from "../models/Product";

export interface ProductRepository{
save(product: Product): Product;
findAll():Product[];
getByID(id: number):Product| null;
updateQuantity(product: Product):void;
}