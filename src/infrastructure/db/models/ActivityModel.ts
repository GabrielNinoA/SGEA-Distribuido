import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export class ActivityModel extends Model {
    declare id_actividad: number;
    declare titulo: string;
    declare descripcion: string | null;
    declare fecha_inicio: Date;
    declare fecha_fin: Date | null;
    declare estado: "PENDIENTE" | "EN_PROCESO" | "COMPLETADA";
    declare creado_por: number;
}

ActivityModel.init(
{
    id_actividad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    estado: {
        type: DataTypes.ENUM("PENDIENTE", "EN_PROCESO", "COMPLETADA"),
        defaultValue: "PENDIENTE",
    },
    creado_por: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{
    sequelize,
    tableName: "Actividades",
    timestamps: false,
});
