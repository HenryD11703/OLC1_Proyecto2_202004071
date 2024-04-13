import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";

export default class TypeOf extends Instruccion {
    private expresion: Instruccion;

    constructor(expresion: Instruccion, linea: number, columna: number) {
        super(new Tipo(TipoDato.CADENA), linea, columna);
        this.expresion = expresion;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let resultado = this.expresion.interpretar(ArbolS, tabla);
        let TipoResultado = this.expresion.Tipo.getTipo();
        if (resultado instanceof Errores) return resultado;
        //aca retorna un numero basado en el tipo de dato que se le pase
        //0 = entero, 1 = decimal, 2 = cadena, 3 = booleano, 4 = caracter, 5 = cadena, 6 = void
        if (Array.isArray(resultado)) {
            return "Vector";
        }
        switch (TipoResultado) {
            case TipoDato.ENTERO:
                return "Entero";
            case TipoDato.DECIMAL:
                return "Decimal";
            case TipoDato.CADENA:
                return "Cadena";
            case TipoDato.BOOLEANO:
                return "Booleano";
            case TipoDato.CARACTER:
                return "Caracter";
            case TipoDato.VOID:
                return "Void";
            default:
                return new Errores('Semantico', `No se puede obtener el tipo de un valor de tipo ${this.expresion.Tipo.getTipo()}`, this.Linea, this.Columna);
        }
    }
}