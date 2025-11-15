export interface UsuarioDTO {
    id_usuario?: number;
    nickname: string;
    password: string;
    rol: 'ADMIN' | 'EMPLE';
}

export interface UsuarioResponseDTO {
    id_usuario: number;
    nickname: string;
    rol: 'ADMIN' | 'EMPLE';
}