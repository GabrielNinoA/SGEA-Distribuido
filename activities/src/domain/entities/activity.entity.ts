// Este archivo define la estructura de la entidad "Activity" en el dominio de la aplicación
export interface Activity {
    id?: string;
    title: string;
    description: string;
    assignedTo?: number;
    status?: 'pending' | 'in_progress' | 'completed';
    createdAt?: Date;
}
