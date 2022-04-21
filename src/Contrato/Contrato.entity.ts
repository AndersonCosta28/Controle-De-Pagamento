import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeUpdate, BeforeInsert } from "typeorm";
import { Funcionario } from "../Funcionario/Funcionario.entity";


@Entity()
export class Contrato {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    nome: string;

    @Column()
    comissionado: Boolean;

    @Column()
    salario_base: number;

    @Column({ default: 0, nullable: true })
    percentual_comissao_a_vista: number;

    @Column({ default: 0, nullable: true })
    percentual_comissao_a_prazo: number;

    @OneToMany(() => Funcionario, (funcionario) => funcionario.contrato)
    funcionario: Funcionario;

    @BeforeInsert()
    beforeinsert() {
        this.nome = this.nome.toUpperCase().trim();
        if (!this.comissionado) {
            this.percentual_comissao_a_vista = 0
            this.percentual_comissao_a_prazo = 0
        }
        else {
            this.salario_base = 0
        }
    }

    @BeforeUpdate()
    beforeupdate() {
        this.nome = this.nome.toUpperCase().trim();
        if (!this.comissionado) {
            this.percentual_comissao_a_vista = 0
            this.percentual_comissao_a_prazo = 0
        }
        else {
            this.salario_base = 0
        }
    }
}
