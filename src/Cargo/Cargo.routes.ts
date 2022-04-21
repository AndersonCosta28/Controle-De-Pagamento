import { Router } from 'express'
import { controller } from '.';


const RouterCargo = Router();

RouterCargo.get('/', controller.getAll.bind(controller));
RouterCargo.get('/:id', controller.getById.bind(controller));
RouterCargo.post('/', controller.Create.bind(controller));
RouterCargo.put('/:id', controller.update.bind(controller));
RouterCargo.delete('/:id', controller.delete.bind(controller));

export { RouterCargo }