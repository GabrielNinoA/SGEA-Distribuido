import { Request, Response } from "express";

import { AddProductsToActivityUseCase } from "../../../application/usecases/AddProductsToActivityUseCase";
import { AssignEmployeesToActivityUseCase } from "../../../application/usecases/AssignEmployeesToActivityUseCase";
import { ChangeActivityStateUseCase } from "../../../application/usecases/ChangeActivityStateUseCase";
import { CreateActivityUseCase } from "../../../application/usecases/CreateActivityUseCase";
import { DeleteActivityUseCase } from "../../../application/usecases/DeleteActivityUseCase";
import { GetActivityUseCase } from "../../../application/usecases/GetActivityUseCase";
import { GetActivitiesUseCase } from "../../../application/usecases/GetActivitiesUseCase";
import { UpdateActivityUseCase } from "../../../application/usecases/UpdateActivityUseCase";

export class ActivityController {
    constructor(
        private createActivityUseCase: CreateActivityUseCase,
        private updateActivityUseCase: UpdateActivityUseCase,
        private changeActivityStateUseCase: ChangeActivityStateUseCase,
        private assignEmployeesToActivityUseCase: AssignEmployeesToActivityUseCase,
        private addProductsToActivityUseCase: AddProductsToActivityUseCase,
        private getActivitiesUseCase: GetActivitiesUseCase,
        private getActivityUseCase: GetActivityUseCase,
        private deleteActivityUseCase: DeleteActivityUseCase
    ) {}

    async create(req: Request, res: Response) {
        try {
            const activity = await this.createActivityUseCase.execute(req.body);
            res.status(201).json(activity);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const activity = await this.updateActivityUseCase.execute(
                parseInt(req.params.id),
                req.body
            );
            res.status(200).json(activity);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async changeState(req: Request, res: Response) {
        try {
            const activity = await this.changeActivityStateUseCase.execute({
                id_actividad: parseInt(req.params.id),
                estado: req.body.estado
            });
            res.status(200).json(activity);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
    async assignEmployees(req: Request, res: Response) {
        try {
            const activity = await this.assignEmployeesToActivityUseCase.execute({
                id_actividad: parseInt(req.params.id),
                empleados: req.body.employeeIds
            });
            res.status(200).json(activity);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async addProducts(req: Request, res: Response) {
        try {
            const activity = await this.addProductsToActivityUseCase.execute({
                id_actividad: parseInt(req.params.id),
                productos: req.body.productIds
            });
            res.status(200).json(activity);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const activities = await this.getActivitiesUseCase.execute();
            res.status(200).json(activities);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }   

    async getById(req: Request, res: Response) {
        try {
            const activity = await this.getActivityUseCase.execute(parseInt(req.params.id));
            res.status(200).json(activity);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }   
    }

    async delete(req: Request, res: Response) {
        try {
            await this.deleteActivityUseCase.execute(parseInt(req.params.id));
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
}