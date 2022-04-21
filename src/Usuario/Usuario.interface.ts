import { Usuario } from "./Usuario.entity";

export interface IUsuarioService {
    findAll(): Promise<Usuario[]>
    findOne(id: number): Promise<Usuario>;
    save(user: Usuario): Promise<Usuario>;
    delete(id: number): Promise<Boolean>
    update(id: number, user: Usuario): Promise<Usuario>
}

// export interface IUsuarioController {

// }