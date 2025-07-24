// Dojo.ts

import { ObjectId } from "mongodb";

/**
 * Dados do dojo.
 * 
 * @author Andre Fettermann
 */
export default class Dojo {

    private _id?: ObjectId;
    private codigo: string;
    private nome: string = "";
    private endereco: string = "";
    private bairro: string = "";
    private cidade: string = "";
    private uf: string = "";
    private pais: string = "";
    private url: string = "";
    private email: string = "";
    private professor_id?: ObjectId;
    private horarios: String[] = [];

    constructor(oCodigo: string, oNome: string) {
        this.nome = oNome;
        this.codigo = oCodigo;
    }

    public setNome(oNome: string) {
        this.nome = oNome;
    }
    public getNome() {
        return this.nome;
    }

    public setCodigo(oCodigo: string) {
        this.codigo = oCodigo;
    }
    public getCodigo() {
        return this.codigo;
    }

    public setEndereco(oEndereco: string) {
        this.endereco = oEndereco;
    }
    public getEndereco() {
        return this.endereco;
    }

    public setBairro(oBairro: string) {
        this.bairro = oBairro;
    }
    public getBairro() {
        return this.bairro;
    }

    public setCidade(aCidade: string) {
        this.cidade = aCidade;
    }
    public getCidade() {
        return this.cidade;
    }

    public setUf(aUf: string) {
        this.uf = aUf;
    }
    public getUf() {
        return this.uf;
    }

    public setPais(oPais: string) {
        this.pais = oPais;
    }
    public getPais() {
        return this.pais;
    }

    public setUrl(aUrl: string) {
        this.url = aUrl;
    }
    public getUrl() {
        return this.url;
    }

    public setEmail(oEmail: string) {
        this.email = oEmail;
    }
    public getEmail() {
        return this.email;
    }

    public setProfessorId(oId: ObjectId) {
        this.professor_id = oId;
    }
    public getProfessorId() {
        return this.professor_id;
    }

    public setHorarios(osHorarios: String[]) {
        this.horarios = osHorarios;
    }
    public getHorarios() {
        return this.horarios;
    }
    public addHorario(oHorario: String) {
        this.horarios.push(oHorario);
    }

}
