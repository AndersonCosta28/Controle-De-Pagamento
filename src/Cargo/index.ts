import { CargoController } from "./Cargo.controller";
import { CargoService } from "./Cargo.service";
import { service as setorService } from "../Setor";

const service: CargoService = new CargoService(setorService)
const controller = new CargoController(service)

export { controller, service }