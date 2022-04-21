import { Request, Response } from 'express'
import { Usuario } from './Usuario.entity';
import { UsuarioService } from './Usuario.service';

export class UsuarioController {

    constructor(private usuarioService: UsuarioService) { }

    async getAll(request: Request, response: Response): Promise<Response> {
        try {
            return response.status(201).send(await this.usuarioService.findAll())
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    };

    async getById(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);
        if (!id) return response.send('ID com caracter inválido');

        try {
            return response.status(201).send(await this.usuarioService.findOne(id))
        } catch (error) {
            return response.status(400).json(error)
        }
    };

    async Create(request: Request, response: Response): Promise<Response> {
        const user = request.body as Usuario;

        try {
            return response.status(201).send(await this.usuarioService.save(user))
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);
        
        try {            
            return response.status(204).send(await this.usuarioService.delete(id))
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async update(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);
        const user = request.body
        if (!id) return response.send('ID com caracter inválido');

        try {
            return response.status(201).send(await this.usuarioService.update(id, user))
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}