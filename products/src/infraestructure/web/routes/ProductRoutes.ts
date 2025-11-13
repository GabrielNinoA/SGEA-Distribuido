import express from "express";
import { Request, Response } from "express";
import { ProductService } from "../../../app/services/ProductService";

export default function ProductRoutes(productService: ProductService) {
  const router = express.Router();
  router.post("/", async (req: Request, res: Response) => {
    try {
      const product = await productService.registrarProducto(req.body);
      res
        .status(201)
        .json({ mensaje: "Producto Registrado correctamente", product });
    } catch (error) {
      res.status(400).json({ mensaje: "Error al registrar producto" });
    }
  });

  router.get("/", async (req: Request, res: Response) => {
    try {
      const products = await productService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener los productos" });
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const product = await productService.getByID(id);
      if (!product) {
        return res.status(404).json({ mensaje: "Producto no encontrado!!!" });
      }
      res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ mensaje: "Error al obtener producto!!" });
    }
  });
  router.patch("/:id/add", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { cantidad } = req.body;
      const product = await productService.addQuantityProduct(id, cantidad);
      if (!product) {
        return res.status(404).json({ mensaje: "Producto no encontrado " });
      }
      res
        .status(200)
        .json({ mensaje: "Cantidad Actualizada", producto: product });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar cantidad" });
    }
  });

  return router;
}
