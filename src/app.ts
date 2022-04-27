
import express from 'express';
import { RouterUsuario } from './Usuario/Usuario.routes';
import { RouterFuncionario } from './Funcionario/Funcionario.routes';
import { RouterContrato } from './Contrato/Contrato.routes';
import { RouterCargo } from './Cargo/Cargo.routes';
import { RouterSetor } from './Setor/Setor.routes';



const app = express();

app.use(express.json());
app.use('/usuario', RouterUsuario)
app.use('/funcionario', RouterFuncionario)
app.use('/contrato', RouterContrato)
app.use('/cargo', RouterCargo)
app.use('/setor', RouterSetor)

export { app }