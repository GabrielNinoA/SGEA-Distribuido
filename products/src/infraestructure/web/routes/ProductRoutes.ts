import express from "express";
import { Request, Response } from "express";
import { ProductRepositoryInMemory } from "../../repositories/ProductRepositoryInMemory";
import { ProductService } from "../../../app/services/ProductService";

const router  = express.Router();
const repo = new ProductRepositoryInMemory();
const service = new ProductService(repo);

router.post("/", (req: Request, res: Response)=> {
    try{const product = service.registrarProducto(req.body);
    res.status(201).json({mensaje: "Producto Registrado correctamente", product});
    }catch(error){
        res.status(400).json({mensaje: "Error al registrar producto"});
    }
    
} );

router.get("/", (req: Request, res: Response)=> {
    try{
        const products = service.getProducts();
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({mensaje: "Error al obtener los productos"})

    }
});

router.get("/:id", (req:Request, res: Response)=>{
    try{
        const id = parseInt(req.params.id);
        const product = service.getByID(id);
        if(!product){
            return res.status(404).json({mensaje: "Producto no encontrado!!!"})
        }
        res.status(200).json(product);
    }catch(error){
        return res.status(500).json({mensaje: "Error al obtener producto!!"})
    }
});
router.patch("/:id/add", (req: Request, res: Response)=>{
    try{
        const id = parseInt(req.params.id);
        const {cantidad} = req.body;
        const product = service.addQuantityProduct(id, cantidad);
        if(!product){
            return  res.status(404).json({mensaje:"Producto no encontrado "});
        }
        res.status(200).json({mensaje: "Cantidad Actualizada", producto: product});
        
    }catch(error){
        res.status(500).json({mensaje: "Error al actualizar cantidad"});

    }
});
export default router;