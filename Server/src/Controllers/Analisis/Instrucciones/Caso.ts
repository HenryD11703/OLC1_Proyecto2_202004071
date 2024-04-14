import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Bloque from "./Bloque";
import Break from "./Break";
import Continue from "./Continue";
import Return from "./Return";

export default class Caso extends Instruccion {
    private expresion: Instruccion | null;
    private instrucciones: Instruccion[];

    constructor(expresion: Instruccion | null, instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }
    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        if (this.expresion != null) {
            let condicionResultado = this.expresion.interpretar(ArbolS, tabla);
            if (condicionResultado instanceof Errores) return condicionResultado;
        }
        let newTabla2 = new TablaSimbolos(tabla);
        newTabla2.setNombre("Bloque Switch");
        for (let instruccion of this.instrucciones) {
            if (instruccion instanceof Break) return;
            if (instruccion instanceof Continue) break;
            if (instruccion instanceof Return) return instruccion;
            let result = instruccion.interpretar(ArbolS, newTabla2);
            if (result instanceof Break) return;
            if (result instanceof Continue) break;
            if (result instanceof Return) return result;
            if (result instanceof Errores) return result;
        }        
    }
}

