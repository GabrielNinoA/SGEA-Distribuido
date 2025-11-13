import { DataTypes, Model } from "sequelize";
import {sequelize} from "../../infraestructure/repositories/database";


export class ProductModel extends Model {
    declare id: number;
    declare name: string;
    declare cantidad: number;
    declare tipoProducto: string;
    declare unidadMedida: string;
    declare fechaVencimiento: string;
}

ProductModel.init(
    {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipoProducto: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    unidadMedida: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    fechaVencimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Productos",
    timestamps: false,
  }
)