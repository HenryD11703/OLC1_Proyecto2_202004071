import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";

export default class Continue extends Instruccion {
    constructor(linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos):any {
      return this
    }
}