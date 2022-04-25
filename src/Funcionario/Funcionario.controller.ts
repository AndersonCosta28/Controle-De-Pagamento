import { NextFunction, Request, Response } from 'express'
import { Funcionario } from './Funcionario.entity';
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

    async getById(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const id = Number(request.params.id);
        if (!id) return response.send('ID com caracter inválido');

        try {
            return response.status(201).send(await this.funcionarioService.findOne(id))
        } catch (error) {
            return response.status(400).json(error)
        }
    };

    async create(request: Request, response: Response): Promise<Response> {
        const user = request.body as Funcionario;

        try {
            return response.status(201).send(await this.funcionarioService.save(user))
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);
        if (!id) return response.send('ID com caracter inválido');

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
    async calcularSalario(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);
        if (!id) return response.send('ID com caracter inválido');

        try {
            const result = await this.funcionarioService.calcularSalario(id, 1);
            return response.status(201).send(result.toFixed(2))
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    }
}