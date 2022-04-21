import { getRepository } from "typeorm";
import { Cargo } from "./Cargo.entity";
import { IService } from "../interface/service.interface";
import { SetorService } from "../Setor/Setor.service";
import { Setor } from "../Setor/Setor.entity";

export class CargoService implements IService<Cargo> {

    constructor(private setorService: SetorService) { }

    async findAll(): Promise<Cargo[]> {
        return await getRepository(Cargo).find({ order: { id: "ASC" } });
    }

    async findOne(id: number): Promise<Cargo> {
        try {
            const Repositorio = await getRepository(Cargo).findOne(id)

            if (!Repositorio) throw 'Cargo não encontrado'

            return Repositorio;
        } catch (error) {
            throw 'Erro findOne: ' + error
        }
    }

    async save(body: Cargo): Promise<Cargo> {
        try {
            body = await this.PreencherForeignKey(body);

            const model = await getRepository(Cargo).create(body);
            return await getRepository(Cargo).save(model)
        } catch (error) {
            throw 'Erro save: ' + error
        }
    }

    async delete(id: number): Promise<Boolean> {
        try {
            await this.findOne(id)

            const resultado = await getRepository(Cargo).delete(id)
            if (!!resultado.affected)
                return true;
            else
                return false
        }
        catch (error) {
            throw 'Erro delete: ' + error
        }
    }

    async update(id: number, body: Cargo): Promise<Cargo> {
        try {
            await this.findOne(id)

            body.id = id;
            body = await this.PreencherForeignKey(body);

            const model = await getRepository(Cargo).create(body);
            return await getRepository(Cargo).save(model);;
        } catch (error) {
            throw 'Erro update: ' + error
        }
    }

    private async PreencherForeignKey(body: Cargo): Promise<Cargo>{
        body.setor = await this.setorService.findOne(Number(body.setor));
        return body;
    }
}