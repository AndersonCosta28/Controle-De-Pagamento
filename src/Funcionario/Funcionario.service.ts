import { getRepository } from "typeorm";
import { Funcionario } from "./Funcionario.entity";
import { IService } from "../interface/service.interface";
import { ContratoService } from "../Contrato/Contrato.service";
import { CargoService } from "../Cargo/Cargo.service";

export class FuncionarioService implements IService<Funcionario> {
    constructor(private cargoService: CargoService, private contratoService: ContratoService) { }

    async findAll(): Promise<Funcionario[]> {
        return await getRepository(Funcionario).find({ order: { id: "ASC" } });
    }

    async findOne(id: number): Promise<Funcionario> {
        try {
            const Repositorio = await getRepository(Funcionario).findOne(id)

            if (!Repositorio) throw 'Funcionario não encontrado'

            return Repositorio;
        } catch (error) {
            throw 'Erro findOne: ' + error
        }
    }

    async save(body: Funcionario): Promise<Funcionario> {
        try {
            body = await this.PreencherForeignKey(body);

            const model: Funcionario = await getRepository(Funcionario).create(body);
            return await getRepository(Funcionario).save(model)
        } catch (error) {
            throw 'Erro save: ' + error
        }
    }

    async delete(id: number): Promise<Boolean> {
        try {
            await this.findOne(id)

            const resultado = await getRepository(Funcionario).delete(id)
            if (!!resultado.affected)
                return true;
            else
                return false
        }
        catch (error) {
            throw 'Erro delete: ' + error
        }
    }

    async update(id: number, body: Funcionario): Promise<Funcionario> {
        try {
            await this.findOne(id)

            body.id = id;
            body = await this.PreencherForeignKey(body);
            const model = await getRepository(Funcionario).create(body);
            return await getRepository(Funcionario).save(model);;
        } catch (error) {
            throw 'Erro update: ' + error
        }
    }

    private async PreencherForeignKey(body: Funcionario): Promise<Funcionario> {
        body.cargo = await this.cargoService.findOne(Number(body.cargo.id));
        body.contrato = await this.contratoService.findOne(Number(body.contrato.id));
        return body;
    }
}