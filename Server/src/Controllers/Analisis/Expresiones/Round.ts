import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";
import Contador from "../SimboloC/Contador";

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
                arbolS.createAndAddError(arbolS, 'Semantico', `No se puede redondear un valor de tipo ${tipoValor}`, this.Linea, this.Columna);
                return new Errores('Semantico', `No se puede redondear un valor de tipo ${tipoValor}`, this.Linea, this.Columna);
        }
    }
    //funcionRound : ROUND PARENTESISI expresion PARENTESISD 
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let funcionRound = `n${contador.get()}`
        let nodoRound = `n${contador.get()}`
        let nodoParentesisI = `n${contador.get()}`
        let nodoExpresion = `n${contador.get()}`
        let nodoParentesisD = `n${contador.get()}`
        let resultado = `${funcionRound}[label="Round"]\n`
        resultado += `${nodoRound}[label="ROUND"]\n`
        resultado += `${funcionRound} -> ${nodoRound}\n`
        resultado += `${nodoParentesisI}[label="("]\n`
        resultado += `${funcionRound} -> ${nodoParentesisI}\n`
        resultado += `${nodoExpresion}[label="Expresion"]\n`
        resultado += this.expresion.buildAst(nodoExpresion)
        resultado += `${funcionRound} -> ${nodoExpresion}\n`
        resultado += `${nodoParentesisD}[label=")"]\n`
        resultado += `${funcionRound} -> ${nodoParentesisD}\n`
        resultado += `${anterior} -> ${funcionRound}\n`
        return resultado
    }
}