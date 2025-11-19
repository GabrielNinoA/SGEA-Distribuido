import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export class ActivityEmployeeModel extends Model {}

ActivityEmployeeModel.init(
{
    id_actividad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    id_empleado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
},
{
    sequelize,
    tableName: "Actividad_Empleado",
    timestamps: false,
});
