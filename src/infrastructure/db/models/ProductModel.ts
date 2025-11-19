import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export class ProductModel extends Model {}

ProductModel.init(
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
    },
    cantidad: {
        type: DataTypes.INTEGER,
    },
    tipoProducto: {
        type: DataTypes.STRING(50),
    },
    unidadMedida: {
        type: DataTypes.STRING(20),
    },
    fechaVencimiento: {
        type: DataTypes.DATE,
    }
},
{
    sequelize,
    tableName: "Productos",
    timestamps: false,
});
