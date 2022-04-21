import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne } from "typeorm";
import { Cargo } from "../Cargo/Cargo.entity";
import { Contrato } from "../Contrato/Contrato.entity";

@Entity()
export class Funcionario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    sobrenome: string;
    
    @Column()
    data_admissao: Date;
    
    @ManyToOne(() => Contrato, (contrato) => contrato.funcionario, {eager: true})
    contrato : Contrato;
    
    @ManyToOne(() => Cargo, (cargo) => cargo.funcionario, {eager: true})
    cargo: Cargo;

    @BeforeInsert()
    beforeinsert() {
        this.nome = this.nome.toUpperCase().trim();
        this.sobrenome = this.sobrenome.toUpperCase().trim();        
    }

    @BeforeUpdate()
    beforeupdate() {
        this.nome = this.nome.toUpperCase().trim();
        this.sobrenome = this.sobrenome.toUpperCase().trim();
    }
}
