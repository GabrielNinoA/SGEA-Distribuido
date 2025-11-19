import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export class EmployeeModel extends Model {}

EmployeeModel.init(
{
    id_empleado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    nombre: {
        type: DataTypes.STRING(100),
    },
    estado: {
        type: DataTypes.ENUM("ACTIVO", "INACTIVO"),
    }
},
{
    sequelize,
    tableName: "Empleados",
    timestamps: false,
});
