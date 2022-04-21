import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";


@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    usuario: string;

    @Column()
    senha: string;

    @BeforeInsert()
    beforeinsert(){
        this.usuario = this.usuario.toUpperCase().trim();
    }

    @BeforeUpdate()
    beforeupdate(){
        this.usuario = this.usuario.toUpperCase().trim();
    }
}
