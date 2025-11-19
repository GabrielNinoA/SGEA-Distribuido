import { AssignProductsDTO } from "../../domain/dto/AssignProductsDTO";
import { ActivityRepository } from "../../domain/repositories/ActivityRepository";
import { ProductClient } from "../../infrastructure/clients/ProductClient";

export class AddProductsToActivityUseCase {
    constructor(
        private activityRepo: ActivityRepository,
        private productClient: ProductClient
    ) {}

    async execute(data: AssignProductsDTO) {
        const activity = await this.activityRepo.getActivityById(data.id_actividad);
        if (!activity) throw new Error("Actividad no encontrada");

        if (activity.estado === "COMPLETADA") {
            throw new Error("No se pueden asignar productos a una actividad completada");
        }

        for (const prod of data.productos) {
            const p = await this.productClient.getProductById(prod.id_producto);
            
            if (!p) throw new Error(`Producto ${prod.id_producto} no existe`);

            if (p.cantidad < prod.cantidad_usada) {
                throw new Error(`Inventario insuficiente para producto ${prod.id_producto}`);
            }
        }

        await this.activityRepo.addProducts(data.id_actividad, data.productos);

        return { message: "Productos asignados correctamente" };
    }
}
