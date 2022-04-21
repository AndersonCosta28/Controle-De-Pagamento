import { SetorController } from "./Setor.controller";
import { SetorService } from "./Setor.service";

const service: SetorService = new SetorService()
const controller = new SetorController(service)

export { controller, service }