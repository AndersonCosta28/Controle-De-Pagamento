import { QntdDiasNoMes } from "../utils";
import { Contrato } from "../Contrato/Contrato.entity";
import { Cargo } from "../Cargo/Cargo.entity";
import { ArrayFaixasINSS, ArrayFaixasIRRF, OperacaesParaCalcularSalario, valor_por_dependentes_IRRF } from "./Funcionario.constantes";
import { Funcionario } from "./Funcionario.entity";
import { FuncionarioService } from "./Funcionario.service";

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
        for (const i in ArrayFaixasINSS) {
            if (this.salario_bruto - ArrayFaixasINSS[i].valor_teto <= 0) {
                ImpostoAPagar += (ArrayFaixasINSS[i].percentual / 100) * (this.salario_bruto - somaDasDiferencasDasFaixas)
                break;
            }
            else {
                DiferencaDaFaixa = ArrayFaixasINSS[i].valor_teto - ArrayFaixasINSS[i].valor_base;
                somaDasDiferencasDasFaixas += DiferencaDaFaixa;
                ImpostoAPagar += (ArrayFaixasINSS[i].percentual / 100) * (DiferencaDaFaixa)
            }
        }
        return ImpostoAPagar;
    }

    private retornarValorIRRF() {
        let ImpostoAPagar = 0;
        let DiferencaDaFaixa = 0;
        const deducoes = this.INSS + this.OutrasDeducoes + (valor_por_dependentes_IRRF * this.funcionario.dependentes);
        const base_calculo = this.salario_bruto - deducoes;

        for (const i in ArrayFaixasIRRF) {
            let FaixaIRRF = ArrayFaixasIRRF[i];

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
            case OperacaesParaCalcularSalario.Liquido:

                return {
                    salario_bruto: this.salario_bruto,
                    impostos: {
                        INSS: this.INSS,
                        IRRF: this.IRRF
                    },
                    beneficios_a_deduzir: this.Valor_de_beneficios_A_Deduzir_Do_Salario,
                    salario_liquido: this.salario_liquido,
                }

            case OperacaesParaCalcularSalario.Proporcional:
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