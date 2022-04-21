import { Request, Response } from 'express'
import { Funcionario } from './Funcionario.entity';
import { IService } from '../interface/service.interface';
import { FuncionarioService } from './Funcionario.service';

export class FuncionarioController {

    constructor(private funcionarioService: FuncionarioService) { }

    async getAll(request: Request, response: Response): Promise<Response> {
        try {
            return response.status(201).send(await this.funcionarioService.findAll())
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    };

    async getById(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);
        if (!id) return response.send('ID com caracter inválido');

        try {
            return response.status(201).send(await this.funcionarioService.findOne(id))
        } catch (error) {
            return response.status(400).json(error)
        }
    };

    async Create(request: Request, response: Response): Promise<Response> {
        const user = request.body as Funcionario;

        try {
            return response.status(201).send(await this.funcionarioService.save(user))
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);
        
        try {            
            return response.status(204).send(await this.funcionarioService.delete(id))
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async update(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);
        const user = request.body
        if (!id) return response.send('ID com caracter inválido');

        try {
            return response.status(201).send(await this.funcionarioService.update(id, user))
        } catch (error) {
            return response.status(400).json(error)
        }
    }
    async FazerPagamento(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);
        if (!id) return response.send('ID com caracter inválido');

        try {
            return response.status(201).send(await this.funcionarioService.FazerPagamento(id))
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    };
}