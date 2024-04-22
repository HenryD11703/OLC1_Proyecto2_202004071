import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";
import Contador from "../SimboloC/Contador";

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
    //funcToLower : TOLOWER PARENTESISI expresion PARENTESISD 
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let funcionToLower = `n${contador.get()}`
        let nodoToLower = `n${contador.get()}`
        let nodoParentesisI = `n${contador.get()}`
        let nodoExpresion = `n${contador.get()}`
        let nodoParentesisD = `n${contador.get()}`
        let resultado = `${funcionToLower}[label="toLower"]\n`
        resultado += `${nodoToLower}[label="TOLOWER"]\n`
        resultado += `${funcionToLower} -> ${nodoToLower}\n`
        resultado += `${nodoParentesisI}[label="("]\n`
        resultado += `${funcionToLower} -> ${nodoParentesisI}\n`
        resultado += `${nodoExpresion}[label="Expresion"]\n`
        resultado += this.expresion.buildAst(nodoExpresion)
        resultado += `${funcionToLower} -> ${nodoExpresion}\n`
        resultado += `${nodoParentesisD}[label=")"]\n`
        resultado += `${funcionToLower} -> ${nodoParentesisD}\n`
        resultado += `${anterior} -> ${funcionToLower}\n`
        return resultado
    }
}