import Tipo from "./Tipo";

export default class Simbolo {
    private tipoSimbolo: Tipo;
    private identificador: string;
    private valor: any;

    constructor(tipoSimbolo: Tipo, identificador: string, valor?: any){
        this.tipoSimbolo = tipoSimbolo;
        this.identificador = identificador.toLocaleLowerCase()
        this.valor = valor;
    }
    public getTipoSimbolo(): Tipo {
        return this.tipoSimbolo;
    }
    public setTipoSimbolo(tipoSimbolo: Tipo): void {
        this.tipoSimbolo = tipoSimbolo;
    }
    public getIdentificador(): string {
        return this.identificador;
    }
    public setIdentificador(identificador: string): void {
        this.identificador = identificador;
    }
    public getValor(): any {
        return this.valor;
    }
    public setValor(valor: any): void {
        this.valor = valor;
    }
}