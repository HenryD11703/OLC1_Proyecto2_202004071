import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";

export default class toLower extends Instruccion {
    private expresion: Instruccion;
    constructor(expresion: Instruccion, linea: number, columna: number) {
        super(new Tipo(TipoDato.CADENA), linea, columna);
        this.expresion = expresion;
    }
    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let valor = this.expresion.interpretar(ArbolS, tabla);
        if (valor instanceof Errores) return valor;
        let tipoValor = this.expresion.Tipo.getTipo();
        switch (tipoValor) {
            case TipoDato.CADENA:
                this.Tipo = new Tipo(TipoDato.CADENA);
                return valor.toLowerCase();
            default:
                return new Errores('Semantico', `No se puede convertir a minusculas un valor de tipo ${tipoValor}`, this.Linea, this.Columna);
        }
    }
}