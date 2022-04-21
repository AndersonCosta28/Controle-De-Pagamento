import { Request, Response } from 'express'
import { Cargo } from './Cargo.entity';
import { IService } from '../interface/service.interface';
import { CargoService } from './Cargo.service';

export class CargoController {

    constructor(private cargoService: CargoService) { }

    async getAll(request: Request, response: Response): Promise<Response> {
        try {
            return response.status(201).send(await this.cargoService.findAll())
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    };

    async getById(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);
        if (!id) return response.send('ID com caracter inválido');

        try {
            return response.status(201).send(await this.cargoService.findOne(id))
        } catch (error) {
            return response.status(400).json(error)
        }
    };

    async Create(request: Request, response: Response): Promise<Response> {
        const user = request.body as Cargo;

        try {
            return response.status(201).send(await this.cargoService.save(user))
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);
        
        try {            
            return response.status(204).send(await this.cargoService.delete(id))
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async update(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);
        const user = request.body
        if (!id) return response.send('ID com caracter inválido');

        try {
            return response.status(201).send(await this.cargoService.update(id, user))
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}