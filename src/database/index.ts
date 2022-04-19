import { createConnection } from "typeorm";

createConnection().then(async( connection ) => {
    console.log('Banco de dados conectado com sucesso')
}).catch(e => console.log(e))