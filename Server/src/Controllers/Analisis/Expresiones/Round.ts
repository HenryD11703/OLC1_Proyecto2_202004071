import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";

export default class Round extends Instruccion{
    private expresion: Instruccion;
    constructor(expresion: Instruccion, linea: number, columna: number){
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.expresion = expresion;
    }
    interpretar(arbolS: ArbolS, tabla: TablaSimbolos) {
        let valor = this.expresion.interpretar(arbolS, tabla);
        if (valor instanceof Errores) return valor;
        let tipoValor = this.expresion.Tipo.getTipo();
        switch (tipoValor) {
            case TipoDato.DECIMAL:
                this.Tipo = new Tipo(TipoDato.DECIMAL);
                return Math.round(valor);
            case TipoDato.ENTERO:
                this.Tipo = new Tipo(TipoDato.ENTERO);
                return valor;
            default:
                return new Errores('Semantico', `No se puede redondear un valor de tipo ${tipoValor}`, this.Linea, this.Columna);
        }
    }
}