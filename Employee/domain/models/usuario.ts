export interface Usuario {
    id_usuario: number;
    nickname: string;
    password: string;
    rol: 'ADMIN' | 'EMPLE';
}