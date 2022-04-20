import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";


@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    sobrenome: string;

    @Column()
    idade: number;

    @BeforeInsert()
    beforeinsert(){
        this.nome = this.nome.toUpperCase().trim();
        this.sobrenome = this.sobrenome.toUpperCase().trim();
    }

    @BeforeUpdate()
    beforeupdate(){
        this.nome = this.nome.toUpperCase().trim();
        this.sobrenome = this.sobrenome.toUpperCase().trim();
    }
}
