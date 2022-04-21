import { getRepository } from "typeorm";
import { Contrato } from "./Contrato.entity";
import { IService } from "../interface/service.interface";

export class ContratoService implements IService<Contrato> {

    async findAll(): Promise<Contrato[]> {
        return await getRepository(Contrato).find({ order: { id: "ASC" } });
    }

    async findOne(id: number): Promise<Contrato> {
        try {
            const Repositorio = await getRepository(Contrato).findOne(id)

            if (!Repositorio) throw 'Contrato não encontrado'

            return Repositorio;
        } catch (error) {
            throw 'Erro findOne: ' + error
        }
    }

    async save(body: Contrato): Promise<Contrato> {
        try {
            const model = await getRepository(Contrato).create(body);
            return await getRepository(Contrato).save(model)
        } catch (error) {
            throw 'Erro save: ' + error
        }
    }

    async delete(id: number): Promise<Boolean> {
        try {
            await this.findOne(id)

            const resultado = await getRepository(Contrato).delete(id)
            if (!!resultado.affected)
                return true;
            else
                return false
        }
        catch (error) {
            throw 'Erro delete: ' + error
        }
    }

    async update(id: number, body: Contrato): Promise<Contrato> {
        try {
            await this.findOne(id)

            body.id = id;
            const model = await getRepository(Contrato).create(body);
            return await getRepository(Contrato).save(model);;
        } catch (error) {
            throw 'Erro update: ' + error
        }
    }
}