import { Router } from 'express'
import { controller } from '.';


const RouterUsuario = Router();

RouterUsuario.get('/', controller.getAll.bind(controller));
RouterUsuario.get('/:id', controller.getById.bind(controller));
RouterUsuario.post('/', controller.Create.bind(controller));
RouterUsuario.put('/:id', controller.update.bind(controller));
RouterUsuario.delete('/:id', controller.delete.bind(controller));

export { RouterUsuario }