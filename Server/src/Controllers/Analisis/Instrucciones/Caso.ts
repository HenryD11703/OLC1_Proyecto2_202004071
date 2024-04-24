import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import Contador from "../SimboloC/Contador";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Bloque from "./Bloque";
import Break from "./Break";

export default class Caso extends Instruccion {
    public expresion: Instruccion;
    private instrucciones: Instruccion[];

    constructor(expresion: Instruccion, instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        //Casos para el switch
        if (this.expresion != null) {
            let valorExpresion = this.expresion.interpretar(ArbolS, tabla);
            if (valorExpresion instanceof Errores){
                ArbolS.createAndAddError(ArbolS, 'Semantico', valorExpresion.toString(), this.Linea, this.Columna);
                return valorExpresion;
            }
            let valorExp = valorExpresion;
            for (let instruccion of this.instrucciones) {
                if (instruccion instanceof Break) return instruccion;
                let result = instruccion.interpretar(ArbolS, tabla);
                if (result instanceof Errores) return result;
            }
        }  

    }
    //caso : CASE expresion DOSPUNTOS codigos
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let nodoCaso = `n${contador.get()}`;
        let nodoCase = `n${contador.get()}`;
        let nodoExpresion = `n${contador.get()}`;
        let nodoDosPuntos = `n${contador.get()}`;
        let nodoCodigos = `n${contador.get()}`;
        let resultado = `${nodoCaso}[label="Caso"]\n`;
        resultado += `${nodoCase}[label="CASE"]\n`;
        resultado += `${nodoCaso} -> ${nodoCase}\n`;
        resultado += `${nodoExpresion}[label="Expresion"]\n`;
        resultado += this.expresion.buildAst(nodoExpresion);
        resultado += `${nodoCaso} -> ${nodoExpresion}\n`;
        resultado += `${nodoDosPuntos}[label=":"]\n`;
        resultado += `${nodoCaso} -> ${nodoDosPuntos}\n`;
        resultado += `${nodoCodigos}[label="Instrucciones"]\n`;
        for (let instruccion of this.instrucciones) {
            resultado += instruccion.buildAst(nodoCodigos);
        }
        resultado += `${nodoCaso} -> ${nodoCodigos}\n`;
        resultado += `${anterior} -> ${nodoCaso}\n`;
        return resultado;
        
    }
}