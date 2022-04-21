import { ContratoController } from "./Contrato.controller";
import { ContratoService } from "./Contrato.service";
import { service as funcionarioService } from "../Funcionario";


const service: ContratoService = new ContratoService()
const controller = new ContratoController(service)

export { controller, service }