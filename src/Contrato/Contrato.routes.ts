import { Router } from 'express'
import { controller } from '.';


const RouterContrato = Router();

RouterContrato.get('/', controller.getAll.bind(controller));
RouterContrato.get('/:id', controller.getById.bind(controller));
RouterContrato.post('/', controller.Create.bind(controller));
RouterContrato.put('/:id', controller.update.bind(controller));
RouterContrato.delete('/:id', controller.delete.bind(controller));

export { RouterContrato }