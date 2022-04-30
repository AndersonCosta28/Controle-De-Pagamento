export interface SwaggerCrud {
    entidade: string;
    example: Object;
    propriedades: Object;
    required: Array<String>;
}

export interface SwaggerUtil {
    entidade: string;
    endpoint: string;
    tags: Array<String>;
    summary: string;
    description: string;
    request: {
        parameters: Array<Object>;
        requestBody: Object;
    }
    response: Object;
    propriedades: Object;
    required: Array<string>;
}