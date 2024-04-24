import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";
import Contador from "../SimboloC/Contador";

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
                ArbolS.createAndAddError(ArbolS, 'Semantico', `No se puede obtener el tipo de un valor de tipo ${this.expresion.Tipo.getTipo()}`, this.Linea, this.Columna);
                return new Errores('Semantico', `No se puede obtener el tipo de un valor de tipo ${this.expresion.Tipo.getTipo()}`, this.Linea, this.Columna);
        }
    }
    //funcionTypeOf: TYPEOF PARENTESISI expresion PARENTESISD 
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let funcionTypeOf = `n${contador.get()}`;
        let nodoTypeOf = `n${contador.get()}`;
        let nodoParentesisI = `n${contador.get()}`;
        let nodoExpresion = `n${contador.get()}`;
        let nodoParentesisD = `n${contador.get()}`;
        let resultado = `${funcionTypeOf}[label="TypeOf"]\n`;
        resultado += `${nodoTypeOf}[label="TYPEOF"]\n`;
        resultado += `${funcionTypeOf} -> ${nodoTypeOf}\n`;
        resultado += `${nodoParentesisI}[label="("]\n`;
        resultado += `${funcionTypeOf} -> ${nodoParentesisI}\n`;
        resultado += `${nodoExpresion}[label="Expresion"]\n`;
        resultado += this.expresion.buildAst(nodoExpresion);
        resultado += `${funcionTypeOf} -> ${nodoExpresion}\n`;
        resultado += `${nodoParentesisD}[label=")"]\n`;
        resultado += `${funcionTypeOf} -> ${nodoParentesisD}\n`;
        resultado += `${anterior} -> ${funcionTypeOf}\n`;
        return resultado;
    }
}