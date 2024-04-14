import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
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
            if (valorExpresion instanceof Errores) return valorExpresion;
            let valorExp = valorExpresion;
            for (let instruccion of this.instrucciones) {
                if (instruccion instanceof Break) return instruccion;
                let result = instruccion.interpretar(ArbolS, tabla);
                if (result instanceof Errores) return result;
            }
        }  

    }
}