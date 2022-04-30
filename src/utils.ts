import { SwaggerUtil } from "./interface/swagger.interface";

export function QntdDiasNoMes(): number {
    const data = new Date();
    const diasDoMes = new Date(data.getFullYear(), data.getMonth() + 1, 0).getDate();
    return diasDoMes;
}

export function Quantidade_de_dias_do_mes_exceto_domingo(): number {
    const Array_De_Datas_Exceto_Domingo = [];
    const data = new Date();
    const ano = data.getFullYear();
    const mes = data.getMonth() + 1;
    const Ultima_data_do_mes = new Date(ano, mes, 0).getDate();

    for (let index = 1; index <= Ultima_data_do_mes; index++) {
        let data_index = new Date(ano, mes, index);
        if (data_index.getDay() != 0)
            Array_De_Datas_Exceto_Domingo.push(data_index.toLocaleDateString('pt-br'));
    }

    //    console.log(Array_De_Datas_Exceto_Domingo.length)
    return Array_De_Datas_Exceto_Domingo.length;
}

export class TemplateSwaggerCrud {

    tags = [`${this.entidade}`];
    parameters = [
        {
            "name": "id",
            "in": "path",
            "required": true,
            "description": `ID do ${this.entidade} para consulta`
        }
    ]

    constructor(private entidade: string, private example: any, private propriedades: any, private required: any) { }

    path() {
        const RotaSemParametro = `/${this.entidade}`;
        const RotaComParametro = `/${this.entidade}/{id}`
        const JSONParaRotaSemParametro = '{"' + RotaSemParametro.concat(`":{  }}`)
        const ObjetoParaRotaSemParametro = JSON.parse(JSONParaRotaSemParametro);
        ObjetoParaRotaSemParametro[RotaSemParametro].post = this.post();
        ObjetoParaRotaSemParametro[RotaSemParametro].get = this.getAll();

        const JSONParaRotaComParametro = '{"' + RotaComParametro.concat(`":{ }}`)
        const ObjetoParaComParametro = JSON.parse(JSONParaRotaComParametro);

        ObjetoParaComParametro[RotaComParametro].get = this.getById();
        ObjetoParaComParametro[RotaComParametro].put = this.put();
        ObjetoParaComParametro[RotaComParametro].delete = this.deletar();
        return { ...ObjetoParaRotaSemParametro, ...ObjetoParaComParametro }
    }
    component() {
        const component_JSON = '{"' + this.entidade.concat(`":{}}`)
        const component_Objeto = JSON.parse(component_JSON)
        component_Objeto[this.entidade].type = 'object';
        component_Objeto[this.entidade].properties = this.propriedades;
        component_Objeto[this.entidade].required = this.required;
        return component_Objeto
    }

    post() {
        return {
            summary: `Cadastro de ${this.entidade}`,
            description: `Rota responsável para cadastrar um novo ${this.entidade}`,
            tags: this.tags,
            requestBody: {
                description: `Informar dados de cadastro do ${this.entidade}`,
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: `#/components/schemas/${this.entidade}`
                        },
                        example: this.example
                    }
                }
            },
            responses: {
                201: {
                    description: `Um funcionario ${this.entidade}`,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: `#/components/schemas/${this.entidade}`
                            }
                        }
                    }
                },
                400: {
                    description: `Erro ao gravar ${this.entidade}, verifique os dados e envie novamente`
                }
            }
        }
    }

    getAll() {
        return {
            description: `Busca todos ${this.entidade}s`,
            summary: `Busca todos ${this.entidade}s`,
            tags: this.tags,
            responses: {
                200: {
                    description: `Varios ${this.entidade} retornados`,
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: `#/components/schemas/${this.entidade}`
                                }
                            }
                        }
                    }
                },
                400: {
                    description: `Erro ao consultar ${this.entidade}, tente novamente`
                }
            }
        }
    }

    getById() {
        return {
            description: `Busca de ${this.entidade} pelo ID`,
            summary: `Busca de ${this.entidade} pelo ID`,
            tags: this.tags,
            parameters: this.parameters,
            responses: {
                200: {
                    description: `Um ${this.entidade} retornado`,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                $ref: `#/components/schemas/${this.entidade}`
                            }
                        }
                    }
                },
                400: {
                    description: `Erro buscar ${this.entidade}, verifique os dados e envie novamente`
                }
            }
        }
    }

    put() {
        return {
            summary: `Rota responsável para atualizar ${this.entidade}`,
            description: `Rota responsável para atualizar ${this.entidade}`,
            tags: this.tags,
            parameters: this.parameters,
            requestBody: {
                description: `Informar dados de cadastro do ${this.entidade}`,
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: `#/components/schemas/${this.entidade}`
                        },
                        example: this.example
                    }
                }
            },
            responses: {
                201: {
                    description: `Um ${this.entidade} retornado`,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: `#/components/schemas/${this.entidade}`
                            }
                        }
                    }
                },
                400: {
                    description: `Erro ao gravar ${this.entidade}, verifique os dados e envie novamente`
                }
            }
        }
    }

    deletar() {
        return {
            summary: `Deleta um ${this.entidade}`,
            description: `Rota responsável para deletar um ${this.entidade}`,
            tags: this.tags,
            parameters: this.parameters,
            responses: {
                204: {
                    description: `${this.entidade} removido`
                },
                400: {
                    description: `Ocorreu um erro ao deletar o ${this.entidade}`
                }
            }
        }
    }
}

export class TemplateSwaggerUtils {

    constructor(private util: SwaggerUtil) {

    }

    arrayGetId: Array<any>;
    arrayGetAll: Array<any>;
    arrayPut: Array<any>;
    arrayPost: Array<any>;
    arrayDeletar: Array<any>;
    //TO-DO
    // pathSemParametro() {
    // const RotaSemParametro = `/${this.util.entidade}/${this.util.endpoint}`;
    // const JSONParaRotaSemParametro = '{"' + RotaSemParametro.concat(`":{ }}`);
    //     const ObjetoParaRotaSemParametro = JSON.parse(JSONParaRotaSemParametro);

    //     // ObjetoParaRotaSemParametro[RotaSemParametro].post = this.post();
    //     // ObjetoParaRotaSemParametro[RotaSemParametro].get = this.getAll();

    //     return { ...ObjetoParaRotaSemParametro }
    // }

    pathComParametroByID(metodo: string) {
        const RotaComParametro = `/${this.util.entidade}/${this.util.endpoint}/{id}`
        const JSONParaRotaComParametro = '{"' + RotaComParametro.concat(`":{ }}`);
        const conteudo = {
            description: this.util.description,
            summary: this.util.summary,
            tags: this.util.tags,
            parameters: this.util.request.parameters,
            requestBody:this.util.request.requestBody,
            responses: {
                200: {
                    description: `Um ${this.util.entidade} retornado`,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                $ref: `#/components/schemas/${this.util.entidade}`
                            }
                        }
                    }
                },
                400: {
                    description: `Erro buscar ${this.util.entidade}, verifique os dados e envie novamente`
                }
            }
        }
        const ObjetoParaRotaComParametro = JSON.parse(JSONParaRotaComParametro);
        ObjetoParaRotaComParametro[RotaComParametro][`${metodo}`] = conteudo;
        return { ...ObjetoParaRotaComParametro}

    }
    component() {
        const component_JSON = '{"' + this.util.endpoint.concat(`":{}}`)
        const component_Objeto = JSON.parse(component_JSON)
        component_Objeto[this.util.endpoint]['type'] = 'object';
        component_Objeto[this.util.endpoint].properties = this.util.propriedades;
        component_Objeto[this.util.endpoint].required = this.util.required;
        return component_Objeto
    }
}