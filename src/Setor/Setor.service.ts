import { getRepository } from "typeorm";
import { Setor } from "./Setor.entity";

export class SetorService implements SetorService {

    async findAll(): Promise<Setor[]> {
        return await getRepository(Setor).find({ order: { id: "ASC" } });
    }

    async findOne(id: number): Promise<Setor> {
        try {
            const Repositorio = await getRepository(Setor).findOne(id)

            if (!Repositorio) throw 'Usuário não encontrado'

            return Repositorio;
        } catch (error) {
            throw 'Erro findOne: ' + error
        }
    }

    async save(body: Setor): Promise<Setor> {
        try {
            const model = await getRepository(Setor).create(body);
            return await getRepository(Setor).save(model)
        } catch (error) {
            throw 'Erro save: ' + error
        }
    }

    async delete(id: number): Promise<Boolean> {
        try {
            await this.findOne(id)

            const resultado = await getRepository(Setor).delete(id)
            if (!!resultado.affected)
                return true;
            else
                return false
        }
        catch (error) {
            throw 'Erro delete: ' + error
        }
    }

    async update(id: number, body: Setor): Promise<Setor> {
        try {
            await this.findOne(id)

            body.id = id;
            const model = await getRepository(Setor).create(body);
            return await getRepository(Setor).save(model);;
        } catch (error) {
            throw 'Erro update: ' + error
        }
    }
}