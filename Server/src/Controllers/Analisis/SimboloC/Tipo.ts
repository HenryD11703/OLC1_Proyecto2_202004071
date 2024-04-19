export default class Tipo {
    private tipo: TipoDato;
    
    constructor(tipo: TipoDato){
        this.tipo = tipo;
    }
    public getTipo(){
        return this.tipo;
    }
    public setTipo(tipo: TipoDato){
        this.tipo = tipo;
    }

}


export enum TipoDato {
    ENTERO,
    DECIMAL,
    BOOLEANO,
    CARACTER,
    CADENA,
    VOID,
    ARREGLO,
}