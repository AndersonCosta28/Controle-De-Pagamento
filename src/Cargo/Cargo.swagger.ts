import { TemplateSwaggerCrud } from '../utils';

const entidade = 'cargo'
const example = {
    nome: 'DESENVOLVEDOR PLENO 3',
    percentual_reajuste: 100,
    setor: { 'id': 1, }
}
const propriedades = {
    nome: {
        type: 'string'
    },
    percentual_reajuste: {
        type: 'number'
    },
    setor: {
        $ref: '#/components/schemas/setor'
    }
}
const required = [
    "nome",
    "percentual_reajuste",
    "setor",
]
const template = new TemplateSwaggerCrud(entidade, example, propriedades, required)
const component_cargo = template.component()
const paht_CRUD_cargo = template.path()

export { paht_CRUD_cargo, component_cargo }