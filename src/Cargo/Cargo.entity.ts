import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany } from "typeorm";
import { Funcionario } from "../Funcionario/Funcionario.entity";
import { Setor } from "../Setor/Setor.entity";


@Entity()
export class Cargo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    nome: string;

    @Column()
    percentual_reajuste: number;

    @ManyToOne(() => Setor, (setor) => setor.cargo, {eager: true})
    setor: Setor | number;

    @OneToMany(() => Funcionario, funcionario => funcionario.cargo )
    funcionario: Funcionario | number;

    @BeforeInsert()
    beforeinsert(){
        this.nome = this.nome.toUpperCase().trim();
    }

    @BeforeUpdate()
    beforeupdate(){
        this.nome = this.nome.toUpperCase().trim();
    }
}
