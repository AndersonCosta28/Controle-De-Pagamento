<h1 align="center">:file_cabinet: Controle de pagamento</h1>

## :memo: Descrição
API afim de gerenciar pagamento de funcionários a partir do seu cargo e contrato.

## :books: Funcionalidades
* <b>CRUD de cargos</b>: Manipulação de projetos.
* <b>CRUD de funcionarios</b>: Manipulação de colaboradores.
* <b>CRUD de contratos</b>: Manipulação de contratos.
* <b>CRUD de setores</b>: Manipulação de setores.

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
* CRUD de venda (controlar vendas de funcionarios comissionados)
* CRUD de venda_pagamento (controlar comissoões)
* CRUD de ponto_funcionario (controlar dias trabalhados)
* Documentação da API


## :runner: Como funciona:
1. Executar os <a href="#rodando_o_projeto">comandos para compilar e iniciar o projeto</a>
2. Com o [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/download), usar a rota `http://localhost:3000/`
3. <span id="etapa_3">Usando o endpoint no verbo POST respectivamente criar nessa sequência:
  * contrato -> Informar esses parâmetros: 
      * eComissionado: se for true deverá informar o % de comissao a vista e a prazo (exemplo de vendedores). Caso seja false os campos de % será 0;
      * salario_base: valor em que o cargo do funcionário irá se basear para calcular o pagamento do salário, em situações de reajustes anuais, será necessário somente alterar o salário base do contrato sem mexer no cargo ou funcionário
  * setor -> nome do setor, por exemplo: estoque, financeiro, suporte, assistência, vendas;
  * cargo -> Informar esses parâmetros: 
      * nome do cargo, por exemplo: desenvolvedor Jr 1, vendedor, estoquista, cirurgião chefe e etc...;
      * Referenciando o setor ao qual pertence;
      * Informar o % que aquele cargo receberá sobre o salário base para calcular o salário;
  * funcionario -> Informar esses parâmetros:
      * nome
      * sobrenome
      * data_admissao
      * contrato -> Passar o ID do contrato criado (Quando montar o front-end provavelmente irá passar o objeto inteiro)
      * cargo -> Passar o ID do cargo criado (Quando montar o front-end provavelmente irá passar o objeto inteiro)
</span>
4. Consumir a rota GET http://localhost:3000/funcionario/FazerPagamento/:id passando o ID do funcionario

## :handshake: Colaboradores
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Mert1s">
        <img src="https://avatars.githubusercontent.com/u/70107407?v=4" width="100px;" alt="Foto de Mert1s no GitHub"/><br>
        <sub>
          <b>Mert1s</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## :dart: Status do projeto
* Andamento
