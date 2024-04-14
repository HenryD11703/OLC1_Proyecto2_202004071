import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
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
}