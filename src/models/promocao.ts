import Graduacao from "./graduacao";

export default class Promocao {

    private data?: Date;
    private graduacao: string = "";

    public setData(aData: Date) {
        this.data = aData;
    }
    public getData(): Date | undefined {
        return this.data;
    }

    public setGraduacao(aGraduacao: string) {
        this.graduacao = aGraduacao;
    }
    public getGraduacao(): string {
        return this.graduacao;
    }

}