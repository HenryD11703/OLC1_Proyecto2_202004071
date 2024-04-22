import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";
import Contador from "../SimboloC/Contador";

export default class toString extends Instruccion {
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
            case TipoDato.ENTERO:
                this.Tipo = new Tipo(TipoDato.CADENA);
                return valor.toString();
            case TipoDato.CARACTER:
                this.Tipo = new Tipo(TipoDato.CADENA);
                return valor.toString();
            case TipoDato.BOOLEANO:
                this.Tipo = new Tipo(TipoDato.CADENA);
                return valor.toString();
            case TipoDato.CADENA:
                this.Tipo = new Tipo(TipoDato.CADENA);
                return valor.toString();
            default:
                return new Errores('Semantico', `No se puede convertir a cadena un valor de tipo ${tipoValor}`, this.Linea, this.Columna);
        }
    }
    //funciontoString: STD DOSPUNTOS DOSPUNTOS TOSTRING PARENTESISI expresion PARENTESISD
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let funcionToString = `n${contador.get()}`
        let nodoStd = `n${contador.get()}`
        let nodoDosPuntos1 = `n${contador.get()}`
        let nodoDosPuntos2 = `n${contador.get()}`
        let nodoToString = `n${contador.get()}`
        let nodoParentesisI = `n${contador.get()}`
        let nodoExpresion = `n${contador.get()}`
        let nodoParentesisD = `n${contador.get()}`
        let resultado = `${funcionToString}[label="toString"]\n`
        resultado += `${nodoStd}[label="STD"]\n`
        resultado += `${funcionToString} -> ${nodoStd}\n`
        resultado += `${nodoDosPuntos1}[label=":"]\n`
        resultado += `${funcionToString} -> ${nodoDosPuntos1}\n`
        resultado += `${nodoDosPuntos2}[label=":"]\n`
        resultado += `${funcionToString} -> ${nodoDosPuntos2}\n`
        resultado += `${nodoToString}[label="TOSTRING"]\n`
        resultado += `${funcionToString} -> ${nodoToString}\n`
        resultado += `${nodoParentesisI}[label="("]\n`
        resultado += `${funcionToString} -> ${nodoParentesisI}\n`
        resultado += `${nodoExpresion}[label="Expresion"]\n`
        resultado += this.expresion.buildAst(nodoExpresion)
        resultado += `${funcionToString} -> ${nodoExpresion}\n`
        resultado += `${nodoParentesisD}[label=")"]\n`
        resultado += `${funcionToString} -> ${nodoParentesisD}\n`
        resultado += `${anterior} -> ${funcionToString}\n`
        return resultado
    }
}