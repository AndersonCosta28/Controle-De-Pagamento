import { UsuarioController } from "./Usuario.controller";
import { IUsuarioService } from "./Usuario.interface";
import { UsuarioService } from "./Usuario.service";


const service: IUsuarioService = new UsuarioService()
const controller = new UsuarioController(service)

export { controller, service }