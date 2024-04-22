import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import Contador from "../SimboloC/Contador";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Bloque from "./Bloque";
import Break from "./Break";

export default class Default extends Instruccion{
    private instrucciones: Instruccion[];

    constructor(instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.instrucciones = instrucciones;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        for (let instruccion of this.instrucciones) {
            if (instruccion instanceof Break) return instruccion;
            let result = instruccion.interpretar(ArbolS, tabla);
            if (result instanceof Errores) return result;
        }
    }
    //casodefault : DEFAULT DOSPUNTOS codigos
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let nodoDefault = `n${contador.get()}`;
        let nodoDosPuntos = `n${contador.get()}`;
        let nodoInstrucciones = `n${contador.get()}`;
    
        let resultado = `${nodoDefault}[label="Default"]\n`;
        resultado += `${anterior} -> ${nodoDefault}\n`;
        resultado += `${nodoDosPuntos}[label=":"]\n`;
        resultado += `${nodoDefault} -> ${nodoDosPuntos}\n`;
        resultado += `${nodoInstrucciones}[label="Instrucciones"]\n`;
        resultado += `${nodoDefault} -> ${nodoInstrucciones}\n`;
    
        for (let instruccion of this.instrucciones) {
            let nodoInstruccion = `n${contador.get()}`;
            resultado += instruccion.buildAst(nodoInstruccion);
            resultado += `${nodoInstrucciones} -> ${nodoInstruccion}\n`;
        }
    
        return resultado;
    }
}