import {Sequelize} from "sequelize";

export const sequelize = new Sequelize("gestion_actividades", "root", "root123",{
    host: "localhost",
    port: 3310,
    dialect: "mysql",
    logging: false,
});
export async function connectBD() {
    try{
        await sequelize.authenticate();
        console.log("Conexion con la base de datos establecida");

    }catch(error){
        console.log("No se pudo conectar :(");
    }
    
}