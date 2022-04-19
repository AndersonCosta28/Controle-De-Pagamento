import "reflect-metadata"
import express from 'express';
import "./database"
import { UsuarioService } from "./Usuario/Usuario.service";
const app = express();

app.use(express.json());

const usuarioService = new UsuarioService()

app.get('/usuario', (request, response) => {    
    usuarioService.findAll().then(result => {
        return response.send(result)
    }).catch(e => response.send('Erro ao encontrar todos os usuários: \n' + e))
});

app.get('/usuario/:id', (request, response) => {
    const id = Number(request.params.id);
    if (!id) return response.send('ID inválido');

    usuarioService.findOne(id).then(result => {
        return response.send(result)
    }).catch(e => response.send('Erro ao encontrar o usuário pelo ID: \n' + e.message))
});

app.post('/usuario', (request, response) => {
    const user = request.body;
    usuarioService.save(user).then(result => {
        if (result)
            return response.send({ message: `Usuário salvo com sucesso`, });
        else
            return response.send({ message: 'Não foi possível inserir usuário' })
    }).catch(e => response.send('Erro ao salvar salvar o usuário. \n ' + e))
});

app.delete('/usuario/:id', (request, response) => {
    const id = Number(request.params.id);
    if (!id) return response.send('ID inválido');

    usuarioService.delete(id).then(result => {
        return response.send(result)
    }).catch(e => response.send('Erro ao deletar o usuário: \n' + e.message))
});

app.put('/usuario/:id', (request, response) => {
    const id = Number(request.params.id);
    if (!id) return response.send('ID inválido');

    const user = request.body;
    usuarioService.update(id, user).then(result => {
        if (result)
            return response.send({ message: `Usuário atualizado com sucesso`, });
        else
            return response.send({ message: 'Não foi possível atualizar usuário' })
    }).catch(e => response.send('Erro ao atualizar salvar o usuário \n' + e))
})

app.listen(3000, () => {

    console.log('Listening 3000')
});