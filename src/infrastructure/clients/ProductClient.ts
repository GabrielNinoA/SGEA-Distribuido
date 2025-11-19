export class ProductClient {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.PRODUCT_MS_URL || "http://localhost:3002";
    }

    async getProductById(id: number) {
        const response = await fetch(`${this.baseUrl}/products/${id}`);

        if (!response.ok) {
            throw new Error(`Error consultando producto ${id}: ${response.statusText}`);
        }

        return await response.json();
    }

    async validateProduct(id: number): Promise<boolean> {
        try {
            const product = await this.getProductById(id);
            return product ? true : false;
        } catch {
            return false;
        }
    }

    async checkInventory(id: number, cantidad: number): Promise<boolean> {
        try {
            const product = await this.getProductById(id);

            if (!product || !product.cantidad) return false;

            return product.cantidad >= cantidad;
        } catch {
            return false;
        }
    }
}
