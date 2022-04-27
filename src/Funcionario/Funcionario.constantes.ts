import { Faixas_INSS, Faixas_IRRF } from "../interface/outros.type";

export enum OperacaesParaCalcularSalario{
    Liquido  = 1,
    Proporcional = 2
}

const faixa_1_INSS: Faixas_INSS = { valor_base: 0, valor_teto: 1212, percentual: 7.5 };
const faixa_2_INSS: Faixas_INSS = { valor_base: 1212.01, valor_teto: 2427.35, percentual: 9 };
const faixa_3_INSS: Faixas_INSS = { valor_base: 2427.36, valor_teto: 3641.03, percentual: 12 };
const faixa_4_INSS: Faixas_INSS = { valor_base: 3641.04, valor_teto: 7087.22, percentual: 14 };
export const ArrayFaixasINSS: Array<Faixas_INSS> = [faixa_1_INSS, faixa_2_INSS, faixa_3_INSS, faixa_4_INSS]

const faixa_1_IRRF: Faixas_IRRF = { valor_base: 1903.99, valor_teto: 2826.65, percentual: 7.5, valor_a_deduzir: 142.80 }
const faixa_2_IRRF: Faixas_IRRF = { valor_base: 2826.66, valor_teto: 3751.05, percentual: 15, valor_a_deduzir: 354.80 }
const faixa_3_IRRF: Faixas_IRRF = { valor_base: 3751.06, valor_teto: 4664.68, percentual: 22.5, valor_a_deduzir: 636.13 }
const faixa_4_IRRF: Faixas_IRRF = { valor_base: 4664.69, valor_teto: 999999.99, percentual: 27.5, valor_a_deduzir: 869.36 }
export const ArrayFaixasIRRF: Array<Faixas_IRRF> = [faixa_1_IRRF, faixa_2_IRRF, faixa_3_IRRF, faixa_4_IRRF]
export const valor_por_dependentes_IRRF = 189.59;