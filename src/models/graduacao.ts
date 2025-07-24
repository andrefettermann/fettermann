/* graduacao.ts */

/**
 * Os dados da graduacao.
 * 
 * @author Andre Fettermann
 */
export default class Graduacao {

    private id: string = "";
    private ordem: number = 0;
    private nome: string = "";
    private faixa: string = "";

    constructor(aOrdem: number, oNome: string) {
        this.ordem = aOrdem;
        this.nome = oNome;
    }

    public setId(oId: string) {
        this.id = oId;
    }
    public getId(): string {
        return this.id;
    }

    public setOrdem(aOrdem: number) {
        this.ordem = aOrdem;
    }
    public getOrdem(): number {
        return this.ordem;
    }

    public setNome(oNome: string) {
        this.nome = oNome;
    }
    public getNome(): string {
        return this.nome;
    }

    public setFaixa(aFaixa: string) {
        this.faixa = aFaixa;
    }
    public getFaixa(): string {
        return this.faixa;
    }
}