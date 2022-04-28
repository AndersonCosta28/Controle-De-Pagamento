import { TemplateSwaggerCrud } from '../utils';

const entidade = 'funcionario'
export const example = {
    nome: 'BRAD',
    sobrenome: 'BODNICK',
    data_admissao: '2020-03-17T00:00:00.000Z',
    dependentes: 0,
    optou_vale_transporte: false,
    optou_plano_saude: false,
    optou_plano_odontologico: false,
    optou_vale_alimentacao: false,
    contrato: {
        id: 1
    },
    cargo: {
        id: 1
    }
}
export const propriedades = {
    nome: {
        type: 'string'
    },
    sobrenome: {
        type: 'string'
    },
    data_admissao: {
        type: 'string',
        format: 'date'
    },
    dependentes: {
        type: 'number'
    },
    optou_vale_transporte: {
        type: 'boolean'
    },
    optou_plano_saude: {
        type: 'boolean'
    },
    optou_plano_odontologico: {
        type: 'boolean'
    },
    optou_vale_alimentacao: {
        type: 'boolean'
    },
    contratoId: {
        $ref: '#/components/schemas/contrato'
    },
    cargoId: {
        $ref: '#/components/schemas/cargo'
    }
}

const required = [
    "nome",
    "sobrenome",
    "data_admissao",
    "contrato",
    "cargo"
]
const template = new TemplateSwaggerCrud(entidade, example, propriedades, required)
const component_funcionario = template.component()
const path_funcionario = template.path()

export { path_funcionario, component_funcionario }