// Pessoa.ts

import { ObjectId } from "mongodb";
import Pagamento from "./pagamento";
import Promocao from "./promocao";
import Dojo from "./dojo";

/**
 * Dados da pessoa.
 * 
 * @author Andre Fettermann
 */
export default class Pessoa {

    private _id?: ObjectId;
    private nome: string;
    private cpf: string = "";
    private aniversario: string = "";
    private matricula: string = "";
    private situacao: string;
    private data_inicio_aikido: string = "";
    private data_matricula: string = "";
    private pagamentos: Pagamento[] = [];
    private promocoes: Promocao[] = [];
    private graduacao_atual: string = "";
    private dojo?: Dojo;

    constructor(nome: string, aSituacao: string) {
        this.nome = nome;
        this.situacao = aSituacao;
    }

    public setNome(oNome: string) {
        this.nome = oNome;
    }
    public getNome() {
        return this.nome;
    }

    public setCpf(oCpf: string) {
        this.cpf = oCpf;
    }
    public getCpf() {
        return this.cpf;
    }

    public setAniversario(oAniversario: string) {
        this.aniversario = oAniversario;
    }
    public getAniversario() {
        return this.aniversario;
    }

    public setMatricula(aMatricula: string) {
        this.matricula = aMatricula;
    }
    public getMatricula() {
        return this.matricula;
    }

    public setSituacao(aSituacao: string) {
        this.situacao = aSituacao;
    }
    public getSituacao() {
        return this.situacao;
    }

    public setDataInicio(aData: string) {
        this.data_inicio_aikido = aData;
    }
    public getDataInicio() {
        return this.data_inicio_aikido;
    }

    public setDataMatricula(aData: string) {
        this.data_matricula = aData;
    }
    public getDataMatricula() {
        return this.data_matricula;
    }

    public setPagamentos(osPagamentos: Pagamento[]) {
        this.pagamentos = osPagamentos;
    }
    public getPagamentos() {
        return this.pagamentos;
    }
    public addPagamento(oPagamento: Pagamento) {
        this.pagamentos.push(oPagamento);
    }

    public setPromocoes(asPromocoes: Promocao[]) {
        this.promocoes = asPromocoes;
    }
    public getPromocoes() {
        return this.promocoes;
    }
    public addPromocao(aPromocao: Promocao) {
        this.promocoes.push(aPromocao);
    }

    public getGraduacaoAtual() {
        this.graduacao_atual
    }
    public setGraduacaoAtual(aGraduacao: string) {
        if (aGraduacao) {
            this.graduacao_atual = aGraduacao;
        } else {
            if (this.promocoes.length > 0) {
                this.graduacao_atual = this.promocoes[this.promocoes.length-1].getGraduacao();
            } else {
                this.graduacao_atual = "";
            }
        }
    }

    public getDojo() {
        return this.dojo;
    }
    public setDojo(oDojo: Dojo) {
        this.dojo = oDojo;
    }
}
