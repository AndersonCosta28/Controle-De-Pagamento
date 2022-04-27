import { FuncionarioController } from "./Funcionario.controller";
import { FuncionarioService } from "./Funcionario.service";
import { service as cargoService } from "../Cargo";
import { service as contratoService } from "../Contrato";
import { CalcularSalario } from "./Funcionario.util";

const service: FuncionarioService = new FuncionarioService(cargoService, contratoService)
const calcularsalario = new CalcularSalario(service);
const controller = new FuncionarioController(service, calcularsalario)

export { controller, service, calcularsalario }