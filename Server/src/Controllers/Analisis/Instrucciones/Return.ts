import { Instruccion } from "../Abstracto/Instruccion";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";

export default class Return extends Instruccion {
  private expresion: Instruccion | null;

  constructor(expresion: Instruccion | null, linea: number, columna: number) {
    super(new Tipo(TipoDato.VOID), linea, columna);
    this.expresion = expresion;
  }

  interpretar(arbolS: ArbolS, tabla: TablaSimbolos): any {
    if (this.expresion != null) {
      let resultado = this.expresion.interpretar(arbolS, tabla);
      return resultado;
    }
    return this;
  }
}   