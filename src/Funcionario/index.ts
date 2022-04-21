import { FuncionarioController } from "./Funcionario.controller";
import { FuncionarioService } from "./Funcionario.service";
import { service as cargoService } from "../Cargo";
import { service as contratoService } from "../Contrato";

const service: FuncionarioService = new FuncionarioService(cargoService, contratoService)
const controller = new FuncionarioController(service)

export { controller, service }