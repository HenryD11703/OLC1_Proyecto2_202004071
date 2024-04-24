import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";
import Contador from '../SimboloC/Contador';
 

export default class toUpper extends Instruccion {
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
                return valor.toUpperCase();
            default:
                ArbolS.createAndAddError(ArbolS, 'Semantico', `No se puede convertir a mayusculas un valor de tipo ${tipoValor}`, this.Linea, this.Columna);
                return new Errores('Semantico', `No se puede convertir a mayusculas un valor de tipo ${tipoValor}`, this.Linea, this.Columna);
        }
    }
    //funcToUpper : TOUPPER PARENTESISI expresion PARENTESISD 
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let funcionToUpper = `n${contador.get()}`;
        let nodoToUpper = `n${contador.get()}`;
        let nodoParentesisI = `n${contador.get()}`;
        let nodoExpresion = `n${contador.get()}`;
        let nodoParentesisD = `n${contador.get()}`;
        let resultado = `${funcionToUpper}[label="toUpper"]\n`;
        resultado += `${nodoToUpper}[label="TOUPPER"]\n`;
        resultado += `${funcionToUpper} -> ${nodoToUpper}\n`;
        resultado += `${nodoParentesisI}[label="("]\n`;
        resultado += `${funcionToUpper} -> ${nodoParentesisI}\n`;
        resultado += `${nodoExpresion}[label="Expresion"]\n`;
        resultado += this.expresion.buildAst(nodoExpresion);
        resultado += `${funcionToUpper} -> ${nodoExpresion}\n`;
        resultado += `${nodoParentesisD}[label=")"]\n`;
        resultado += `${funcionToUpper} -> ${nodoParentesisD}\n`;
        resultado += `${anterior} -> ${funcionToUpper}\n`;
        return resultado;
    }
}