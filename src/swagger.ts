import { readFileSync, writeFileSync } from "fs";
import { component_cargo, path_cargo } from './Cargo/Cargo.swagger'
import { component_contrato, path_contrato } from './Contrato/Contrato.swagger'
import { component_funcionario, path_funcionario } from './Funcionario/Funcionario.swagger'
import { component_util_CalcularSalarioLiquidoDTO, component_util_CalcularSalarioProporcionalDTO, path_util_CalcularSalarioLiquidoDTO, path_util_CalcularSalarioProporcionalDTO } from "./Funcionario/Funcionario.util";
import { component_setor, path_setor } from './Setor/Setor.swagger';

const pkgjson = JSON.parse(readFileSync(process.env.npm_package_json, 'utf-8'));

const components = {
    schemas: {
        ...component_setor, ...component_funcionario, ...component_contrato, ...component_cargo, ...component_util_CalcularSalarioProporcionalDTO, ...component_util_CalcularSalarioLiquidoDTO
    }
}
const paths = { ...path_setor, ...path_funcionario, ...path_contrato, ...path_cargo, ...path_util_CalcularSalarioProporcionalDTO, ...path_util_CalcularSalarioLiquidoDTO }


const documento = {
    openapi: '3.0.0',
    info: {
        title: pkgjson.name,
        description: pkgjson.description,
        version: pkgjson.version,
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
writeFileSync('swaggerDocument.json', JSON.stringify(documento))
export default documento