import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import { Cargo } from "../Cargo/Cargo.entity";


@Entity()
export class Setor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    nome: string;

    @OneToMany(() => Cargo, (cargo) => cargo.setor)
    cargo: Cargo;

    @BeforeInsert()
    beforeinsert(){
        this.nome = this.nome.toUpperCase().trim();
    }

    @BeforeUpdate()
    beforeupdate(){
        this.nome = this.nome.toUpperCase().trim();
    }
}
