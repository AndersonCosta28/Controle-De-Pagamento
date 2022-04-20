import express, { Request, Response } from 'express'
import { Usuario } from './Usuario.entity';
import { IUsuarioService } from './Usuario.interface';
import { UsuarioService } from './Usuario.service';

const usuarioService: IUsuarioService = new UsuarioService()
const RouterUsuario = express.Router();

RouterUsuario.get('/', (request: Request, response: Response) => {
    usuarioService.findAll()
        .then(result => response.send(result))
        .catch(e => response.send(e))
});

RouterUsuario.get('/:id', (request: Request, response: Response) => {
    const id = Number(request.params.id);
    if (!id) return response.send('ID com caracter inválido');

    usuarioService.findOne(id)
        .then(result => response.send(result))
        .catch(e => response.send(e))
});

RouterUsuario.post('/', (request: Request, response: Response) => {
    const user = request.body as Usuario;
    usuarioService.save(user)
        .then(result => response.send(result))
        .catch(e => response.send('Erro ao salvar salvar o usuário. \n ' + e))
});

RouterUsuario.delete('/:id', (request: Request, response: Response) => {
    const id = Number(request.params.id);
    if (!id) return response.send('ID inválido');

    usuarioService.delete(id)
        .then(result => response.send(result))
        .catch(e => response.send(e))
});

RouterUsuario.put('/:id', (request: Request, response: Response) => {
    const id = Number(request.params.id);
    if (!id) return response.send('ID com caracter inválido');

    const user = request.body as Usuario;
    usuarioService.update(id, user)
        .then(result => response.send(result))
        .catch(e => response.send(e))
});

export default RouterUsuario