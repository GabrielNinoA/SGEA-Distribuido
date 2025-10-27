import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

// Definición del modelo de datos para la entidad "Activity" utilizando Sequelize
export class ActivityModel extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public assignedTo!: number;
    public status!: string;
    public createdAt!: Date;
}

// Inicialización del modelo con sus atributos y configuración
ActivityModel.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        assignedTo: { type: DataTypes.INTEGER, allowNull: true },
        status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' },
    },
    {
        sequelize,
        tableName: 'activities',
        timestamps: true,
    }
);