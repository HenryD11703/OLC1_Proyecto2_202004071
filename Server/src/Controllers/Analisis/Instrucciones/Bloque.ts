import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";

export default class Bloque extends Instruccion {
    private instrucciones: Instruccion[];

    constructor(instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.instrucciones = instrucciones;
    }

    interpretar(arbolS: ArbolS, tabla: TablaSimbolos) {

       
        for (let instruccion of this.instrucciones) {
            const result = instruccion.interpretar(arbolS, tabla);
            if (result instanceof Errores) return result;
        }
    }
}