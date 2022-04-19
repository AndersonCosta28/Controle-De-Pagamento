import { getRepository, Repository } from "typeorm";
import { Usuario } from "./Usuario.entity";

export class UsuarioService {
    async findAll(): Promise<Usuario[]> {
        return await getRepository(Usuario).find();
    }

    async findOne(id: number): Promise<Usuario | undefined> {
        try {
            const Repositorio = await getRepository(Usuario).findOne(id)
            return Repositorio;
        } catch (error) {
            throw Error('Deu ruim' + error)
        }
    }

    async save(user: Usuario): Promise<Usuario> {
        try {
            return await getRepository(Usuario).save(user)
        } catch (error) {
            throw Error('Deu ruim' + error)
        }
    }

    async delete(id: number): Promise<Boolean> {
        if (!!this.findOne(id)) {
            try {
                const resultado = await getRepository(Usuario).delete(id)
                if (!!resultado.affected)
                    return true;
                else
                    return false
            } catch (error) {

                throw Error('Deu ruim' + error)
            }
        }
        else
            return false;
    }

    async update(id: number, user: Usuario): Promise<Usuario | undefined> {
        if (!!this.findOne(id)) {
            try {
                return await getRepository(Usuario).save(user);;
            } catch (error) {
                throw new Error('Deu ruim' + error)
            }
        }
    }

}