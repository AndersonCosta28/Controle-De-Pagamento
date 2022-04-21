import { Request, Response } from 'express'
import { Contrato } from './Contrato.entity';
import { ContratoService } from './Contrato.service';

export class ContratoController {

    constructor(private contratoService: ContratoService) { }

    async getAll(request: Request, response: Response): Promise<Response> {
        try {
            return response.status(201).send(await this.contratoService.findAll())
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    };

    async getById(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);
        if (!id) return response.send('ID com caracter inválido');

        try {
            return response.status(201).send(await this.contratoService.findOne(id))
        } catch (error) {
            return response.status(400).json(error)
        }
    };

    async Create(request: Request, response: Response): Promise<Response> {
        const user = request.body as Contrato;

        try {
            return response.status(201).send(await this.contratoService.save(user))
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);
        
        try {            
            return response.status(204).send(await this.contratoService.delete(id))
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async update(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);
        const user = request.body
        if (!id) return response.send('ID com caracter inválido');

        try {
            return response.status(201).send(await this.contratoService.update(id, user))
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}