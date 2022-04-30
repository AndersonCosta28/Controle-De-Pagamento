import { SwaggerUtil } from 'src/interface/swagger.interface';
import { TemplateSwaggerCrud, TemplateSwaggerUtils } from '../utils';

const entidade = 'funcionario'
const example = {
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
const propriedades = {
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

const CalcularSalarioProporcionalDTO: SwaggerUtil = {
    summary: 'Rota para calcular salário proporcional',
    description: 'Rota para calcular salário proporcional',
    entidade: 'funcionario',
    endpoint: 'calcularsalarioproporcional',
    tags: ['funcionario'],

    propriedades: {
        diastrabalhados: {
            type: "number"
        },
        vendas_a_vista: {
            type: "number"
        },
        vendas_a_prazo: {
            type: "number"
        },
        outras_deducoes: {
            type: "number"
        }
    },
    request: {
        parameters: [
            {
                "name": "id",
                "in": "path",
                "required": true,
                "description": `ID do funcionario para calcular o salário`
            }
        ],
        requestBody: {
            description: "Informar dados para cálculo",
            required: true,
            content: {
                "application/json": {
                    schema: {
                        properties: {
                            diastrabalhados: {
                                type: 'number'
                            },
                            vendas_a_vista: {
                                type: 'number'
                            },
                            vendas_a_prazo: {
                                type: 'number'
                            },
                            outras_deducoes: {
                                type: 'number'
                            }
                        }
                    },
                    example: { diastrabalhados: 26, vendas_a_vista: 5000, vendas_a_prazo: 5000, outras_deducoes: 100 },
                }
            }
        }
    },
    response: {
        201: {
            description: "Salário calculado",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/calcularsalarioproporcional"
                    }
                }
            }
        },
        400: {
            description: "Erro ao calcular o salário, verifique se o funcionário existe"
        }
    },
    required: ['diastrabalhados']
}

const CalcularSalarioLiquidoDTO: SwaggerUtil = {
    summary: 'Rota para calcular salário liquido',
    description: 'Rota para calcular salário liquido',
    entidade: 'funcionario',
    endpoint: 'calcularsalarioliquido',
    tags: ['funcionario'],

    propriedades: {
        diastrabalhados: {
            type: "number"
        },
        vendas_a_vista: {
            type: "number"
        },
        vendas_a_prazo: {
            type: "number"
        },
        outras_deducoes: {
            type: "number"
        }
    },
    request: {
        parameters: [
            {
                "name": "id",
                "in": "path",
                "required": true,
                "description": `ID do funcionario para calcular o salário`
            }
        ],
        requestBody: {
            description: "Informar dados para cálculo",
            required: true,
            content: {
                "application/json": {
                    schema: {
                        properties: {
                            vendas_a_vista: {
                                type: 'number'
                            },
                            vendas_a_prazo: {
                                type: 'number'
                            },
                            outras_deducoes: {
                                type: 'number'
                            }
                        }
                    },
                    example: { vendas_a_vista: 5000, vendas_a_prazo: 5000, outras_deducoes: 100 },
                }
            }
        }
    },
    response: {
        201: {
            description: "Salário calculado",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/calcularsalarioliquido"
                    }
                }
            }
        },
        400: {
            description: "Erro ao calcular o salário, verifique se o funcionário existe"
        }
    },
    required: []
}

const template = new TemplateSwaggerCrud(entidade, example, propriedades, required)
const template_calcularSalarioProporcional = new TemplateSwaggerUtils(CalcularSalarioProporcionalDTO);
const template_calcularSalarioLiquido = new TemplateSwaggerUtils(CalcularSalarioLiquidoDTO);

const component_funcionario = template.component()
const component_util_CalcularSalarioProporcionalDTO = template_calcularSalarioProporcional.component();
const component_util_CalcularSalarioLiquidoDTO = template_calcularSalarioLiquido.component();

const paht_CRUD_funcionairo = template.path()
const path_util_CalcularSalarioProporcionalDTO = template_calcularSalarioProporcional.pathComParametroByID('post');
const path_util_CalcularSalarioLiquidoDTO = template_calcularSalarioLiquido.pathComParametroByID('post');

export { paht_CRUD_funcionairo, component_funcionario, path_util_CalcularSalarioProporcionalDTO, component_util_CalcularSalarioProporcionalDTO, path_util_CalcularSalarioLiquidoDTO, component_util_CalcularSalarioLiquidoDTO }
