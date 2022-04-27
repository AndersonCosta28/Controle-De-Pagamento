import { Response } from "express"
import { QntdDiasNoMes } from "../utils"
import { Contrato } from "../Contrato/Contrato.entity";
import { Cargo } from "../Cargo/Cargo.entity";
import { Funcionario } from "./Funcionario.entity";
import { FuncionarioService } from "./Funcionario.service";
import { Faixas_INSS, Faixas_IRRF } from "./Funcionario.type";

export function validar_campo_diastrabalhados(diastrabalhados: Number, response: Response) {
    if (diastrabalhados === 0) { return 'Tudo OK' }
    else if (!diastrabalhados || diastrabalhados < 0) return response.send('Dias trabalhados inválido')
    else if (diastrabalhados > QntdDiasNoMes()) return response.send('A quantidade de dias não pode ser maior da quantidade de dias do mês')
    else return 'Tudo OK';
}


export enum OperacoesParaCalcularSalario {
    Liquido = 1,
    Proporcional = 2
}

abstract class Faixas {
    static INSS: Array<Faixas_INSS> = [
        { valor_base: 0, valor_teto: 1212, percentual: 7.5 },
        { valor_base: 1212.01, valor_teto: 2427.35, percentual: 9 },
        { valor_base: 2427.36, valor_teto: 3641.03, percentual: 12 },
        { valor_base: 3641.04, valor_teto: 7087.22, percentual: 14 },
    ];

    static IRRF: Array<Faixas_IRRF> = [
        { valor_base: 1903.99, valor_teto: 2826.65, percentual: 7.5, valor_a_deduzir: 142.80 },
        { valor_base: 2826.66, valor_teto: 3751.05, percentual: 15, valor_a_deduzir: 354.80 },
        { valor_base: 3751.06, valor_teto: 4664.68, percentual: 22.5, valor_a_deduzir: 636.13 },
        { valor_base: 4664.69, valor_teto: 999999.99, percentual: 27.5, valor_a_deduzir: 869.36 }
    ];

    static valor_por_dependentes_IRRF: number = 189.59;
}

export class CalcularSalario {

    constructor(private funcionarioService: FuncionarioService) { }

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
    private OutrasDeducoes: number;

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
        return salario_base + valor_reajuste + this.comissao;
    }

    private retornarComissao(): number {
        if (!this.funcionario.contrato.comissionado) return 0

        const { percentual_comissao_a_prazo, percentual_comissao_a_vista } = this.contrato
        return (this.TotalVendasAPrazo * percentual_comissao_a_prazo / 100) + (this.TotalVendasAVista * percentual_comissao_a_vista / 100);
    }

    private retornarValorINSS() {
        let ImpostoAPagar = 0;
        let somaDasDiferencasDasFaixas = 0;
        let DiferencaDaFaixa = 0;
        for (const i in Faixas.INSS) {
            if (this.salario_bruto - Faixas.INSS[i].valor_teto <= 0) {
                ImpostoAPagar += (Faixas.INSS[i].percentual / 100) * (this.salario_bruto - somaDasDiferencasDasFaixas)
                break;
            }
            else {
                DiferencaDaFaixa = Faixas.INSS[i].valor_teto - Faixas.INSS[i].valor_base;
                somaDasDiferencasDasFaixas += DiferencaDaFaixa;
                ImpostoAPagar += (Faixas.INSS[i].percentual / 100) * (DiferencaDaFaixa)
            }
        }
        return ImpostoAPagar;
    }

    private retornarValorIRRF() {
        let ImpostoAPagar = 0;
        let DiferencaDaFaixa = 0;
        const deducoes = this.INSS + this.OutrasDeducoes + (Faixas.valor_por_dependentes_IRRF * this.funcionario.dependentes);
        const base_calculo = this.salario_bruto - deducoes;

        for (const i in Faixas.IRRF) {
            let FaixaIRRF = Faixas.IRRF[i];

            if (base_calculo - FaixaIRRF.valor_teto <= 0) {
                ImpostoAPagar += (FaixaIRRF.percentual / 100) * (base_calculo - FaixaIRRF.valor_base)
                break;
            }
            else {
                DiferencaDaFaixa = FaixaIRRF.valor_teto - FaixaIRRF.valor_base;
                ImpostoAPagar += (FaixaIRRF.percentual / 100) * (DiferencaDaFaixa)
            }
        }
        return ImpostoAPagar;
    }

    private async preencherCampos(id: number, body: any) {
        this.funcionario = await this.funcionarioService.findOne(id);
        this.cargo = this.funcionario.cargo
        this.contrato = this.funcionario.contrato
        this.DiasTrabalhados = body.diastrabalhados == undefined ? 0 : body.diastrabalhados;
        this.TotalVendasAPrazo = body.vendas_a_prazo == undefined ? 0 : body.vendas_a_prazo;
        this.TotalVendasAVista = body.vendas_a_vista == undefined ? 0 : body.vendas_a_vista;
        this.comissao = this.retornarComissao();
        this.OutrasDeducoes = body.outras_deducoes == undefined ? 0 : body.outras_deducoes;
        this.salario_bruto = this.retornarSalarioBruto()
        this.INSS = this.retornarValorINSS();
        this.IRRF = this.retornarValorIRRF()
        this.Valor_de_beneficios_A_Deduzir_Do_Salario = this.retornarValorDeBeneficiosParaDeduzirDoSalario();
        this.salario_liquido = this.retornarSalarioLiquido()
        this.salario_proporcional = this.RetornarSalarioProporcional();
    }

    public async calcularSalario(id: number, operacao: number, body: any): Promise<any> {
        await this.preencherCampos(id, body)

        switch (operacao) {
            case OperacoesParaCalcularSalario.Liquido:

                return {
                    salario_bruto: this.salario_bruto.toFixed(2),
                    impostos: {
                        INSS: this.INSS.toFixed(2),
                        IRRF: this.IRRF.toFixed(2)
                    },
                    beneficios_a_deduzir: this.Valor_de_beneficios_A_Deduzir_Do_Salario.toFixed(2),
                    Comissao: this.comissao.toFixed(2),
                    salario_liquido: this.salario_liquido.toFixed(2),
                }

            case OperacoesParaCalcularSalario.Proporcional:
                return {
                    salario_bruto: this.salario_bruto.toFixed(2),
                    impostos: {
                        INSS: this.INSS.toFixed(2),
                        IRRF: this.IRRF.toFixed(2)
                    },
                    beneficios_a_deduzir: this.Valor_de_beneficios_A_Deduzir_Do_Salario.toFixed(2),
                    salario_liquido: this.salario_liquido.toFixed(2),
                    DiasTrabalhados: `${this.DiasTrabalhados}/${QntdDiasNoMes()}`,
                    Comissao: this.comissao.toFixed(2),
                    salario_proporcional: this.salario_proporcional.toFixed(2),
                }

            default:
                return 0;
        }
    }

}