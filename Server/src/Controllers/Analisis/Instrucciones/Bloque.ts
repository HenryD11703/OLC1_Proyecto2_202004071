import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import Contador from "../SimboloC/Contador";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Break from "./Break";
import Continue from "./Continue";
import Return from "./Return";
 
 
export default class Bloque extends Instruccion {
    private instrucciones: Instruccion[];

    constructor(instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.instrucciones = instrucciones;
    }

    interpretar(arbolS: ArbolS, tabla: TablaSimbolos) {

       
        for (let instruccion of this.instrucciones) {
            if (instruccion instanceof Break) return instruccion;
            if (instruccion instanceof Continue) return instruccion;
            if (instruccion instanceof Return) return instruccion;
            let result = instruccion.interpretar(arbolS, tabla);

            if (result instanceof Errores) {
                arbolS.createAndAddError(arbolS, 'Semantico', result.toString(), instruccion.Linea, instruccion.Columna);
                return result;}
        }
    }
    /**
     * bloqueCodigo : LLAVEI codigos LLAVED { $$ = new Bloque.default($2, @1.first_line, @1.first_column); }
             | LLAVEI LLAVED          { $$ = new Bloque.default([], @1.first_line, @1.first_column); }
;
     */
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let nodoBloqueCodigo = `n${contador.get()}`;
        let nodoLlaveI = `n${contador.get()}`;
        let nodoLlaveD = `n${contador.get()}`;
        let nodoCodigos = `n${contador.get()}`;
        let resultado = `${nodoBloqueCodigo}[label="Bloque"]\n`;
        resultado += `${nodoLlaveI}[label="{"]\n`;
        resultado += `${nodoBloqueCodigo} -> ${nodoLlaveI}\n`;
        resultado += `${nodoCodigos}[label="Instrucciones"]\n`;
        for (let instruccion of this.instrucciones) {
            resultado += instruccion.buildAst(nodoCodigos);
        }
        resultado += `${nodoBloqueCodigo} -> ${nodoCodigos}\n`;
        resultado += `${nodoLlaveD}[label="}"]\n`;
        resultado += `${nodoBloqueCodigo} -> ${nodoLlaveD}\n`;
        resultado += `${anterior} -> ${nodoBloqueCodigo}\n`;
        return resultado;
    }
}