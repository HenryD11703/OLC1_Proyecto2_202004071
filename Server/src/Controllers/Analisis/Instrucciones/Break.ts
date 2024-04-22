import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import Contador from "../SimboloC/Contador";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";

export default class Break extends Instruccion {
    constructor(linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
    }
    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        return ;
    }
    //funcionBreak : BREAK PYC 
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let funcionBreak = `n${contador.get()}`;
        let nodoBreak = `n${contador.get()}`;
        let nodoPyc = `n${contador.get()}`;
        let resultado = `${funcionBreak}[label="Break"]\n`;
        resultado += `${nodoBreak}[label="BREAK"]\n`;
        resultado += `${funcionBreak} -> ${nodoBreak}\n`;
        resultado += `${nodoPyc}[label=";"]\n`;
        resultado += `${funcionBreak} -> ${nodoPyc}\n`;
        resultado += `${anterior} -> ${funcionBreak}\n`;
        return resultado;
        
    }
}
