import { getRepository } from "typeorm";
import { Funcionario } from "./Funcionario.entity";
import { IService } from "../interface/service.interface";
import { ContratoService } from "../Contrato/Contrato.service";
import { CargoService } from "../Cargo/Cargo.service";
import { diasNoMes } from "../utils";

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
        body.cargo = await this.cargoService.findOne(Number(body.cargo));
        body.contrato = await this.contratoService.findOne(Number(body.contrato));
        return body;
    }
    async FazerPagamento(id: number): Promise<String> {
        const funcionario: Funcionario = await this.findOne(Number(id));
        const diasTrabalhados: number = 25;
        const salario_base = funcionario.contrato.salario_base
        const valor_reajuste = (funcionario.cargo.percentual_reajuste / 100) * salario_base;
        const salario_reajustado = salario_base + valor_reajuste

        const VendasAPrazo: number = 0;
        const VendasAVista: number = 0;

        const valor_diaria: number = salario_reajustado / diasNoMes();
        const comissao = (VendasAPrazo * funcionario.contrato.percentual_comissao_a_prazo) + (VendasAVista * funcionario.contrato.percentual_comissao_a_vista)

        return (diasTrabalhados * valor_diaria + comissao).toFixed(2);
    }
}