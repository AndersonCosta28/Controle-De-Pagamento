
import express from 'express';
import { RouterUsuario } from './Usuario/Usuario.routes';
import "./database"
import "./Usuario"

const app = express();

app.use(express.json());
app.use('/usuario', RouterUsuario)

app.listen(3000, () => {
    console.log('Listening 3000')
});