
import { component_cargo, path_cargo } from './Cargo/Cargo.swagger'
import { component_contrato, path_contrato } from './Contrato/Contrato.swagger'
import { component_funcionario, path_funcionario } from './Funcionario/Funcionario.swagger'
import { component_setor, path_setor } from './Setor/Setor.swagger'

const components = {
    schemas: {
        ...component_setor, ...component_funcionario, ...component_contrato, ...component_cargo
    }
}
const paths = { ...path_setor, ...path_funcionario, ...path_contrato, ...path_cargo }


const documento = {
    openapi: '3.0.0',
    info: {
        title: 'Gerenciamento de pagamento',
        description: 'API para cadastrar funcionarios, setores, cargos e contrato para calcular salários, promover e rebaixar com mais facilidade',
        version: '1.0.0',
        contact: {
            name: 'Anderson Costa',
            url: 'https://github.com/Mert1s',
            email: 'andgtsc@gmail.com'
        }
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'API de desenvolvimento'
        },
        {
            url: 'http://localhost:3000',
            description: 'API de produção'
        }
    ],
    paths,

    components
}

export default documento