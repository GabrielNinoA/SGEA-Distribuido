import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export class ActivityProductModel extends Model {}

ActivityProductModel.init(
{
    id_actividad_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_actividad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad_usada: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unidad: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
},
{
    sequelize,
    tableName: "Actividad_Producto",
    timestamps: false,
});
