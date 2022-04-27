<h1 align="center">:file_cabinet: Controle de pagamento</h1>

## :memo: Descrição
API afim de gerenciar pagamento de funcionários a partir do seu cargo e contrato.

## :books: Funcionalidades
* **CRUD de cargos**: Manipulação de projetos.
* **CRUD de funcionarios**: Manipulação de colaboradores.
* **CRUD de contratos**: Manipulação de contratos.
* **CRUD de setores**: Manipulação de setores.
* **Cálculo de salário:** Calcular salário integral ou proporcional aos dias trabalhados descontando INSS e IRRF

## :wrench: Tecnologias utilizadas
* [PostgreSQL](https://www.postgresql.org/)
* [TypeORM](https://github.com/generalpiston/typeorm-encrypted)
* [Express](https://expressjs.com/)

## :rocket: <span id="rodando_o_projeto">Rodando o projeto</span>
Para rodar o repositório é necessário clonar o mesmo, e executar os seguintse comandos para iniciar o projeto:
```
<
npm i
npm run build
npm run start
>
```

<!-- ## :warning: Avisos
### Recomendável ter um arquivo .env na raiz do projeto com os seguintes campos:
* Aviso 1
* Aviso 2
 -->
## :soon: Implementações futuras
<!-- * CRUD de venda (controlar vendas de funcionarios comissionados)
* CRUD de venda_pagamento (controlar comissoões)
* CRUD de ponto_funcionario (controlar dias trabalhados) -->
* Documentação da API


## :runner: Como funciona:
1. Executar os <a href="#rodando_o_projeto">comandos para compilar e iniciar o projeto</a>
2. Com o [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/download), usar a rota `http://localhost:3000/`
3. Usando o endpoint no método `POST` respectivamente criar nessa sequência:
  * `contrato`
      * `nome`: Exemplo: CLT, PJ, CLT + Comissionado e etc...;
      * `comissionado`: Informando `true` deve-se informar o valor inteiro do `percentual_comissao_a_vista` e `percentual_comissao_a_prazo`. Caso seja `false` os campos de ambos campos serão definidos como 0;
      * `percentual_comissao_a_vista`: Informar o valor inteiro do % de comissao a vista. **Obs.: Não informar o valor fracionado;**
      * `percentual_comissao_a_prazo`: Informar o valor inteiro do % de comissao a prazo. **Obs.: Não informar o valor fracionado;**
      * `salario_base`: <span id="salario_base">este será o valor base para calcular o salário bruto do funcionário e com ele será levado em conta o [`percentual_reajuste`](#percentual_reajuste) no `cargo` do `funcionario`;</span>
      <br>

  * `setor`
    * `nome` por exemplo: 
    * `estoque`, financeiro, suporte, assistência, vendas;
    <br>
    
  * `cargo`
      * `nome`: por exemplo: desenvolvedor Jr 1, vendedor, estoquista, cirurgião chefe e etc...;
      * `setorId`: ID do setor ao qual pertence;
      * `percentual_reajuste`: <span id="percentual_reajuste">Informar o % que aquele cargo receberá sobre o [`salario_base`](#salario_base) para calcular o salário bruto;</span>

      <br>

  * `funcionario`
      * `nome`
      * `sobrenome`
      * `data_admissao`
      * `dependente`: Nº de dependentes para auxíliar a calcular o IRRF;
      * `contrato`: ID do contrato;
      * `cargo`: ID do cargo;
      * `optou_vale_transporte`: Default `false` permitindo que o este benefício não seja cobrado no calculo do salário líquido
      * `optou_plano_saude`: Default `false` permitindo que o este benefício não seja cobrado no calculo do salário líquido
      * `optou_plano_odontologico`: Default `false` permitindo que o este benefício não seja cobrado no calculo do salário líquido
      * `optou_vale_alimentacao`: Default `false` permitindo que o este benefício não seja cobrado no calculo do salário líquido


4. Após criação da sua "pequena Empresa" vamos consumir a API. Usando o método `GET` e rota http://localhost:3000/funcionario/calcularsalarioproporcional/:id, o `id` do funcionario e no `body` o seguinte formato:

* `{
    "diastrabalhados": 26,
    "vendas_a_vista": 5000,
    "vendas_a_prazo": 5000,
    "outras_deducoes": 100
}`

* **Obs.:** Se nenhum desses valores forem informados serão configurados como 0.
* **Obs 2.:** O mês e ano sempre será o atual (Hoje).
* **Obs 3.:** Disponibilizo a rota http://localhost:3000/funcionario/calcularsalarioliquido/:id dispensando a necessidade de informar os dias trabalhados.


## :handshake: Colaboradores
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Mert1s">
        <img src="https://avatars.githubusercontent.com/u/70107407?v=4" width="100px;" alt="Foto de Mert1s no GitHub"/><br>
        <sub>
          **Mert1s**
        </sub>
      </a>
    </td>
  </tr>
</table>

## :dart: Status do projeto
* ![](https://us-central1-progress-markdown.cloudfunctions.net/progress/99)
