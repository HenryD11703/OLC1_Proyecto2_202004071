import { Instruccion } from "../Abstracto/Instruccion";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Nativo from '../Expresiones/Nativo';

export default class Return extends Instruccion {
  private expresion: Instruccion | null;

  constructor(expresion: Instruccion | null, linea: number, columna: number) {
    super(new Tipo(TipoDato.VOID), linea, columna);
    this.expresion = expresion;
  }

  interpretar(arbolS: ArbolS, tabla: TablaSimbolos): any {
    if (this.expresion != null) {
      let resultado = this.expresion.interpretar(arbolS, tabla);
      let nativoV = new Nativo(this.Tipo, resultado, this.Linea, this.Columna);
      console.log("El dato a retornar es: ", nativoV.valor)
      return nativoV;
    }
    return this;
  }
}   