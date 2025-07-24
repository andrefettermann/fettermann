export default class Pagamento {

    private data?: Date;
    private valor_devido?: Number;
    private valor_pago?: Number;
    private descricao: string = "";
    private observacoes: string = "";

    public setData(aData: Date) {
        this.data = aData;
    }
    public getData(): Date | undefined {
        return this.data;
    }

    public setValorDevido(oValor: Number) {
        this.valor_devido = oValor;
    }
    public getValorDevido(): Number | undefined {
        return this.valor_devido;
    }

    public setValorPago(oValor: Number) {
        this.valor_pago = oValor;
    }
    public getValorPago(): Number | undefined {
        return this.valor_pago;
    }

    public setDescricao(aDescricao: string) {
        this.descricao = aDescricao;
    }
    public getDescricao(): string {
        return this.descricao;
    }

    public setObservacoes(aObservacao: string) {
        this.observacoes = aObservacao;
    }
    public getObservacoes(): string {
        return this.observacoes;
    }
}