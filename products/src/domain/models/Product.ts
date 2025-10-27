export class  Product{
    constructor(
        public id: number,
        public name: string,
        public cantidad: number,
        public tipoProducto:string,
        public unidadMedida: string,
        public fechaVencimiento: string
    ){}
} 