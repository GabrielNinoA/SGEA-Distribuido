import express from 'express';
import { connectToDatabase } from '../config/database';
import { SequelizeActivityRepository } from '../repositories/activity.repository.impl';
import { ActivityService } from '../../domain/services/activity.service';

const app = express();
app.use(express.json());

const activityRepository = new SequelizeActivityRepository();
const activityService = new ActivityService(activityRepository);

// Endpints 

// Crear una nueva actividad 
app.post('/activities/createActivity', async (req, res) => {
    try {
        const activity = await activityService.createActivity(req.body);
        res.status(201).json(activity);
    } catch (error) {
        res.status(300).json({ message: 'Error al crear la actividad', error });
    }
});

// Asignar una actividad a un empleado
app.post('/activities/addActivity', async (req, res) => {
    const { ActivityId, EmployeeId } = req.body;
    await activityService.assignActivity(ActivityId, EmployeeId);
    res.json({ message: 'Actividad asignada correctamente' });
});


// Obtener todas las actividades
app.get('/activities/getAllActivities', async (req, res) => {
    const activities = await activityService.getAllActivities();
    res.json(activities);
});

// Obtener una actividad por su ID
app.get('/activities/getActivityById/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const activity = await activityService.getActivityById(Number(id));
        res.json(activity);
    } catch (error) {
        res.status(404).json({ message: 'Actividad no encontrada' });
    }
});

// Función para iniciar el servidor 
export const startServer = async (port: number) => {
    await connectToDatabase();
    app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${port}`);
    });
}
