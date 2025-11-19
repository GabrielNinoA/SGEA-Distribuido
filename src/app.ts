import { ActivityRepositorySequelize } from "./infrastructure/repositories/ActivityRepositorySequelize";

import { CreateActivityUseCase } from "./application/usecases/CreateActivityUseCase";
import { UpdateActivityUseCase } from "./application/usecases/UpdateActivityUseCase";
import { ChangeActivityStateUseCase } from "./application/usecases/ChangeActivityStateUseCase";
import { AssignEmployeesToActivityUseCase } from "./application/usecases/AssignEmployeesToActivityUseCase";
import { AddProductsToActivityUseCase } from "./application/usecases/AddProductsToActivityUseCase";
import { GetActivityUseCase } from "./application/usecases/GetActivityUseCase";
import { GetActivitiesUseCase } from "./application/usecases/GetActivitiesUseCase";
import { DeleteActivityUseCase } from "./application/usecases/DeleteActivityUseCase";

import { EmployeeClient } from "./infrastructure/clients/EmployeeClient";
import { ProductClient } from "./infrastructure/clients/ProductClient";

import { ActivityController } from "./infrastructure/web/controllers/ActivityController";
import { ActivityRoutes } from "./infrastructure/web/routes/ActivityRoutes";

export function buildActivityModule() {
    // Repositorios
    const activityRepo = new ActivityRepositorySequelize();

    // Clients (HTTP)
    const employeeClient = new EmployeeClient();
    const productClient = new ProductClient();

    // Use Cases
    const createActivity = new CreateActivityUseCase(activityRepo, employeeClient);
    const updateActivity = new UpdateActivityUseCase(activityRepo);
    const changeState = new ChangeActivityStateUseCase(activityRepo);
    const assignEmployees = new AssignEmployeesToActivityUseCase(
        activityRepo,
        employeeClient
    );
    const addProducts = new AddProductsToActivityUseCase(
        activityRepo,
        productClient
    );
    const getActivity = new GetActivityUseCase(activityRepo);
    const getActivities = new GetActivitiesUseCase(activityRepo);
    const deleteActivity = new DeleteActivityUseCase(activityRepo);

    // Controller
    const controller = new ActivityController(
        createActivity,
        updateActivity,
        changeState,
        assignEmployees,
        addProducts,
        getActivities,
        getActivity,
        deleteActivity
    );

    // Retornar rutas construidas
    return ActivityRoutes(controller);
}
