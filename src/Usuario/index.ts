import { UsuarioController } from "./Usuario.controller";
import { Usuario } from "./Usuario.entity";
import { IService } from "../interface/service.interface";
import { UsuarioService } from "./Usuario.service";


const service: IService<Usuario> = new UsuarioService()
const controller = new UsuarioController(service)

export { controller, service }