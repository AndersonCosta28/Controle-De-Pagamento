import { Response } from "express"
import { QntdDiasNoMes } from "../utils"

export function validar_campo_diastrabalhados(diastrabalhados: Number, response: Response) {
    if (diastrabalhados === 0) { return 'Tudo OK'}
    else if (!diastrabalhados || diastrabalhados < 0) return response.send('Dias trabalhados inválido').end()
    else if (diastrabalhados > QntdDiasNoMes()) return response.send('A quantidade de dias não pode ser maior da quantidade de dias do mês').end()
}


// export function validar_campo_diastrabalhados(diastrabalhados: any) {
//     if (diastrabalhados === 0) return {resultado: true}
//     else if (!diastrabalhados || diastrabalhados < 0) return {resultado: false, mensagem: 'Dias trabalhados inválido'}
//     else if (diastrabalhados > QntdDiasNoMes()) return {resultado: false, mensagem: 'A quantidade de dias não pode ser maior da quantidade de dias do mês'}
// }