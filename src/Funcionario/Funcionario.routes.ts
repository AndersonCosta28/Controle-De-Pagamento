import { Router } from 'express'
import { controller } from '.';


const RouterFuncionario = Router();
RouterFuncionario.get('/', controller.getAll.bind(controller));
RouterFuncionario.get('/:id', controller.getById.bind(controller));
RouterFuncionario.post('/', controller.create.bind(controller));
RouterFuncionario.put('/:id', controller.update.bind(controller));
RouterFuncionario.delete('/:id', controller.delete.bind(controller));
RouterFuncionario.get('/calcularSalario/:id', controller.calcularSalario.bind(controller))
export { RouterFuncionario }