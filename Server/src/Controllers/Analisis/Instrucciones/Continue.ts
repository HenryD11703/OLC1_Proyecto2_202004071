import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import Contador from "../SimboloC/Contador";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";

export default class Continue extends Instruccion {
    constructor(linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
    }
    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        return ;
    }

    //funcionContinue : CONTINUE PYC
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let funcionContinue = `n${contador.get()}`;
        let nodoContinue = `n${contador.get()}`;
        let nodoPyc = `n${contador.get()}`;
        let resultado = `${funcionContinue}[label="Continue"]\n`;
        resultado += `${nodoContinue}[label="CONTINUE"]\n`;
        resultado += `${funcionContinue} -> ${nodoContinue}\n`;
        resultado += `${nodoPyc}[label=";"]\n`;
        resultado += `${funcionContinue} -> ${nodoPyc}\n`;
        resultado += `${anterior} -> ${funcionContinue}\n`;
        return resultado;
        
    }
}
