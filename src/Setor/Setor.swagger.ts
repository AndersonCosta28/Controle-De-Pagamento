import { TemplateSwaggerCrud } from '../utils';

const entidade = 'setor'
const example = {
    nome: 'desenvolvimento'
}
const propriedades = {
    nome: {
        type: 'string'
    }
}

const required = [
    "nome",
]

const template = new TemplateSwaggerCrud(entidade, example, propriedades, required)
const component_setor = template.component()
const paht_CRUD_setor = template.path()

export { paht_CRUD_setor, component_setor }