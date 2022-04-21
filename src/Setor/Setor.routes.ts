import { Router } from 'express'
import { controller } from '.';


const RouterSetor = Router();

RouterSetor.get('/', controller.getAll.bind(controller));
RouterSetor.get('/:id', controller.getById.bind(controller));
RouterSetor.post('/', controller.Create.bind(controller));
RouterSetor.put('/:id', controller.update.bind(controller));
RouterSetor.delete('/:id', controller.delete.bind(controller));

export { RouterSetor }