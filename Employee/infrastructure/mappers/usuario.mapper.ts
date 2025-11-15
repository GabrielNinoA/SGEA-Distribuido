import { Usuario } from '../database/entities/usuario.entity';
import { UsuarioDTO, UsuarioResponseDTO } from '../../domain/dto/usuario.dto';

export class UsuarioMapper {
    static toDomain(usuarioEntity: Usuario): UsuarioResponseDTO {
        return {
            id_usuario: usuarioEntity.id_usuario,
            nickname: usuarioEntity.nickname,
            rol: usuarioEntity.rol
        };
    }

    static toEntity(usuarioDTO: UsuarioDTO): Usuario {
        const usuario = new Usuario();
        usuario.nickname = usuarioDTO.nickname;
        usuario.password = usuarioDTO.password;
        usuario.rol = usuarioDTO.rol;
        return usuario;
    }

    static toDomainArray(usuarios: Usuario[]): UsuarioResponseDTO[] {
        return usuarios.map(usuario => this.toDomain(usuario));
    }
}