import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import Contador from "../SimboloC/Contador";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";

export default class Impresion extends Instruccion {
    private expresion: Instruccion;
    private saltoLinea: string;
    constructor(expresion: Instruccion,saltoLinea: string, linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.expresion = expresion;
        this.saltoLinea = saltoLinea;
    }
    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let valor = this.expresion.interpretar(ArbolS, tabla);
        if (valor instanceof Errores) {
            return valor;
        }
        if(this.saltoLinea == ""){
            ArbolS.Imprimir(valor);        
    }
    else{
        ArbolS.Imprimir(valor + "\n");
    }
    return null;
    }
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let nodoRaiz = `n${contador.get()}`;
        let nodoImpresion = `n${contador.get()}`;
        let nodoCout = `n${contador.get()}`;
        let nodoMenorMenor1 = `n${contador.get()}`;
        let nodoExpresion = `n${contador.get()}`;
        let nodoMenorMenor2 = null;
        let nodoEndl = null;
    
        let resultado = `${nodoRaiz}[label="Raiz"]\n`;
        resultado += `${anterior} -> ${nodoRaiz}\n`;
        resultado += `${nodoImpresion}[label="Impresión"]\n`;
        resultado += `${nodoRaiz} -> ${nodoImpresion}\n`;
    
        resultado += `${nodoCout}[label="cout"]\n`;
        resultado += `${nodoImpresion} -> ${nodoCout}\n`;
    
        resultado += `${nodoMenorMenor1}[label="<<"]\n`;
        resultado += `${nodoImpresion} -> ${nodoMenorMenor1}\n`;
    
        resultado += `${nodoExpresion}[label="Expresión"]\n`;
        resultado += `${nodoImpresion} -> ${nodoExpresion}\n`;
        resultado += this.expresion.buildAst(`${nodoExpresion}`);
    
        if (this.saltoLinea !== "") {
            nodoMenorMenor2 = `n${contador.get()}`;
            resultado += `${nodoMenorMenor2}[label="<<"]\n`;
            resultado += `${nodoImpresion} -> ${nodoMenorMenor2}\n`;
    
            nodoEndl = `n${contador.get()}`;
            resultado += `${nodoEndl}[label="endl"]\n`;
            resultado += `${nodoImpresion} -> ${nodoEndl}\n`;
        }
    
        return resultado;
    }
}