import { UsuarioController } from "./Usuario.controller";
import { UsuarioService } from "./Usuario.service";


const service: UsuarioService = new UsuarioService()
const controller = new UsuarioController(service)

export { controller, service }