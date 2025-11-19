import { ActivityModel } from "./models/ActivityModel";
import { ActivityEmployeeModel } from "./models/ActivityEmployeeModel";
import { ActivityProductModel } from "./models/ActivityProductModel";

ActivityModel.hasMany(ActivityEmployeeModel, {
    foreignKey: "id_actividad",
    as: "empleados",
});

ActivityEmployeeModel.belongsTo(ActivityModel, {
    foreignKey: "id_actividad",
});

ActivityModel.hasMany(ActivityProductModel, {
    foreignKey: "id_actividad",
    as: "productos",
});

ActivityProductModel.belongsTo(ActivityModel, {
    foreignKey: "id_actividad",
});
