import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeUpdate, BeforeInsert } from "typeorm";
import { Funcionario } from "../Funcionario/Funcionario.entity";


@Entity()
export class Contrato {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    nome: string;

    @Column()
    comissionado: Boolean;

    @Column()
    salario_base: number;

    @Column({ default: 0 })
    percentual_comissao_a_vista: number;

    @Column({ default: 0 })
    percentual_comissao_a_prazo: number;

    @Column({ default: 0 })
    vale_alimentacao: number;

    @Column({ default: 0 })
    percentual_vale_alimentacao: number;

    @Column({ default: 0 })
    vale_transporte: number;

    @Column({ default: 0 })
    percentual_vale_transporte: number;

    @Column({ default: 0 })
    plano_odontologico: number;

    @Column({ default: 0 })
    percentual_plano_odontologico: number;

    @Column({ default: 0 })
    plano_saude: number;

    @Column({ default: 0 })
    percentual_plano_saude: number;

    @OneToMany(() => Funcionario, (funcionario) => funcionario.contrato)
    funcionario: Funcionario;

    @BeforeInsert()
    beforeinsert() {
        this.nome = this.nome.toUpperCase().trim();
        if (!this.comissionado) {
            this.percentual_comissao_a_vista = 0
            this.percentual_comissao_a_prazo = 0
        }

        if (!!this.comissionado && (!this.percentual_comissao_a_vista || !this.percentual_comissao_a_prazo))
            throw 'Erro beforeInsert contrato.entity: Os campos de percentuais de comissão devem ser informados '
    }

    @BeforeUpdate()
    beforeupdate() {
        this.nome = this.nome.toUpperCase().trim();
        if (!this.comissionado) {
            this.percentual_comissao_a_vista = 0
            this.percentual_comissao_a_prazo = 0
        }

        if (this.comissionado && (!this.percentual_comissao_a_vista || !this.percentual_comissao_a_prazo))
            throw 'Erro beforeInsert contrato.entity: Os campos de percentuais de comissão devem ser informados '
    }
}
