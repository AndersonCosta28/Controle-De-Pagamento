import { getRepository } from "typeorm";
import { Funcionario } from "./Funcionario.entity";
import { IService } from "../interface/service.interface";
import { ContratoService } from "../Contrato/Contrato.service";
import { CargoService } from "../Cargo/Cargo.service";
import { QntdDiasNoMes } from "../utils";
import { Contrato } from "../Contrato/Contrato.entity";
import { Cargo } from "../Cargo/Cargo.entity";
import { Faixas_INSS, Faixas_IRRF } from "../interface/outros.type";
import { FuncionarioConstantes } from "./Funcionario.constantes";

export class FuncionarioService implements IService<Funcionario> {
    private funcionario: Funcionario;
    private DiasTrabalhados: number;
    private cargo: Cargo

    private contrato: Contrato

    private salario_liquido: number

    private salario_proporcional: number

    private salario_bruto: number

    private IRRF: number

    private INSS: number

    private Valor_de_beneficios_A_Deduzir_Do_Salario: number

    private comissao: number

    private TotalVendasAVista: number;
    private TotalVendasAPrazo: number;

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

    private RetornarSalarioProporcional(): number {
        const valor_diaria: number = this.salario_liquido / QntdDiasNoMes();
        return Number((this.DiasTrabalhados * valor_diaria + this.comissao).toFixed(2));
    }

    private retornarSalarioLiquido() {
        return this.salario_bruto - this.INSS - this.IRRF - this.Valor_de_beneficios_A_Deduzir_Do_Salario;
    }

    private retornarValorDeBeneficiosParaDeduzirDoSalario(): number {
        const { percentual_plano_odontologico, percentual_plano_saude, percentual_vale_transporte, percentual_vale_alimentacao } = this.contrato
        const { optou_plano_odontologico, optou_plano_saude, optou_vale_alimentacao, optou_vale_transporte } = this.funcionario
        const percentuais =
            (optou_plano_odontologico == true ? percentual_plano_odontologico : 0) +
            (optou_plano_saude == true ? percentual_plano_saude : 0) +
            (optou_vale_alimentacao == true ? percentual_vale_alimentacao : 0) +
            (optou_vale_transporte == true ? percentual_vale_transporte : 0);
        return this.salario_bruto * (percentuais / 100)
    }

    private retornarSalarioBruto(): number {
        const salario_base = this.contrato.salario_base;
        const valor_reajuste = (this.cargo.percentual_reajuste / 100) * salario_base;
        return salario_base + valor_reajuste;
    }
    // Será efetivamente usado quando for implemetando Vendas e título
    private retornarComissao(): number {
        if (!this.funcionario.contrato.comissionado) return 0

        const { percentual_comissao_a_prazo, percentual_comissao_a_vista } = this.contrato
        return (this.TotalVendasAPrazo * percentual_comissao_a_prazo/100) + (this.TotalVendasAVista * percentual_comissao_a_vista/100);
    }

    private retornarValorINSS() {
        const faixa_1: Faixas_INSS = { valor_base: 0, valor_teto: 1212, percentual: 7.5 };
        const faixa_2: Faixas_INSS = { valor_base: 1212.01, valor_teto: 2427.35, percentual: 9 };
        const faixa_3: Faixas_INSS = { valor_base: 2427.36, valor_teto: 3641.03, percentual: 12 };
        const faixa_4: Faixas_INSS = { valor_base: 3641.04, valor_teto: 7087.22, percentual: 14 };
        const descontar: Array<Faixas_INSS> = [faixa_1, faixa_2, faixa_3, faixa_4]
        let ImpostoAPagar = 0;
        let somaDasDiferencasDasFaixas = 0;
        let DiferencaDaFaixa = 0;
        for (const i in descontar) {
            DiferencaDaFaixa = descontar[i].valor_teto - descontar[i].valor_base;
            if (this.salario_bruto - descontar[i].valor_teto <= 0) {
                ImpostoAPagar += (descontar[i].percentual / 100) * (this.salario_bruto - somaDasDiferencasDasFaixas)
                break;
            }
            else {
                somaDasDiferencasDasFaixas += DiferencaDaFaixa;
                ImpostoAPagar += (descontar[i].percentual / 100) * (DiferencaDaFaixa)
            }
        }
        return ImpostoAPagar;
    }

    private retornarValorIRRF() {
        let resultado: number;

        const valor_por_dependentes = 189.59;
        const salario_deduzido = this.salario_bruto - this.INSS - (valor_por_dependentes * this.funcionario.dependentes);
        const faixa_1: Faixas_IRRF = { valor_base: 1903.99, valor_teto: 2826.65, percentual: 7.5, valor_a_deduzir: 142.80 }
        const faixa_2: Faixas_IRRF = { valor_base: 2826.66, valor_teto: 3751.05, percentual: 15, valor_a_deduzir: 354.80 }
        const faixa_3: Faixas_IRRF = { valor_base: 3751.06, valor_teto: 4664.68, percentual: 22, valor_a_deduzir: 636.13 } //869.36
        const faixa_4: Faixas_IRRF = { valor_base: 4664.69, valor_teto: 999999.99, percentual: 27, valor_a_deduzir: 869.36 }

        if (salario_deduzido < faixa_1.valor_teto)
            resultado = 0;
        else if (salario_deduzido >= faixa_1.valor_base && salario_deduzido <= faixa_1.valor_teto)
            resultado = (salario_deduzido * faixa_1.percentual / 100) - faixa_1.valor_a_deduzir
        else if (salario_deduzido >= faixa_2.valor_base && salario_deduzido <= faixa_2.valor_teto)
            resultado = (salario_deduzido * faixa_2.percentual / 100) - faixa_2.valor_a_deduzir
        else if (salario_deduzido >= faixa_3.valor_base && salario_deduzido <= faixa_3.valor_teto)
            resultado = (salario_deduzido * faixa_3.percentual / 100) - faixa_3.valor_a_deduzir
        else
            resultado = (salario_deduzido * faixa_4.percentual / 100) - faixa_4.valor_a_deduzir
        return resultado;
    }

    private async preencherCampos(id: number, body: any) {
        this.funcionario = await this.findOne(id);
        this.cargo = this.funcionario.cargo
        this.contrato = this.funcionario.contrato
        this.DiasTrabalhados = body.diastrabalhados == undefined ? 0 : body.diastrabalhados;
        this.TotalVendasAPrazo = body.vendas_a_prazo == undefined ? 0 : body.vendas_a_prazo;
        this.TotalVendasAVista = body.vendas_a_vista == undefined ? 0 : body.vendas_a_vista;
        this.salario_bruto = this.retornarSalarioBruto()
        this.INSS = this.retornarValorINSS();
        this.IRRF = this.retornarValorIRRF()
        this.Valor_de_beneficios_A_Deduzir_Do_Salario = this.retornarValorDeBeneficiosParaDeduzirDoSalario();
        this.comissao = this.retornarComissao();
        this.salario_liquido = this.retornarSalarioLiquido()
        this.salario_proporcional = this.RetornarSalarioProporcional();
    }

    public async calcularSalario(id: number, operacao: number, body: any): Promise<any> {
        console.log(body)
        await this.preencherCampos(id, body)

        switch (operacao) {
            case FuncionarioConstantes.Calcular_Salario_liquido:

                return {
                    salario_bruto: this.salario_bruto,
                    impostos: {
                        INSS: this.INSS,
                        IRRF: this.IRRF
                    },
                    beneficios_a_deduzir: this.Valor_de_beneficios_A_Deduzir_Do_Salario,
                    salario_liquido: this.salario_liquido,

                }

            case FuncionarioConstantes.Calcular_Salario_Proporcional:
                return {
                    salario_bruto: this.salario_bruto,
                    impostos: {
                        INSS: this.INSS,
                        IRRF: this.IRRF
                    },
                    beneficios_a_deduzir: this.Valor_de_beneficios_A_Deduzir_Do_Salario,
                    salario_liquido: this.salario_liquido,
                    DiasTrabalhados: `${this.DiasTrabalhados}/${QntdDiasNoMes()}`,
                    Comissao: this.comissao,
                    salario_proporcional: this.salario_proporcional,
                }

            default:
                return 0;
        }
    }
}