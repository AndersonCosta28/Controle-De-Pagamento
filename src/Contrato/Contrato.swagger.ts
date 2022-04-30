import { TemplateSwaggerCrud } from '../utils'

const entidade = 'contrato'
const example =
{
    nome: 'CLT',
    comissionado: false,
    salario_base: 2000,
    percentual_comissao_a_vista: 0,
    percentual_comissao_a_prazo: 0,
    vale_alimentacao: 0,
    percentual_vale_alimentacao: 6,
    vale_transporte: 0,
    percentual_vale_transporte: 3,
    plano_odontologico: 0,
    percentual_plano_odontologico: 3,
    plano_saude: 0,
    percentual_plano_saude: 3
}

const propriedades = {
    nome: {
        type: 'string'
    },
    comissionado: {
        type: 'boolean'
    },
    salario_base: {
        type: 'number'
    },
    percentual_comissao_a_vista: {
        type: 'number'
    },
    percentual_comissao_a_prazo: {
        type: 'number'
    },
    vale_alimentacao: {
        type: 'number'
    },
    percentual_vale_alimentacao: {
        type: 'number'
    },
    vale_transporte: {
        type: 'number'
    },
    percentual_vale_transporte: {
        type: 'number'
    },
    plano_odontologico: {
        type: 'number'
    },
    percentual_plano_odontologico: {
        type: 'number'
    },
    plano_saude: {
        type: 'number'
    },
    percentual_plano_saude: {
        type: 'number'
    },
}

const required = [
    "nome",
    "comissionado",
    "salario_base",
]

const template = new TemplateSwaggerCrud(entidade, example, propriedades, required)
const component_contrato = template.component()
const paht_CRUD_contrato = template.path()

export { paht_CRUD_contrato, component_contrato }