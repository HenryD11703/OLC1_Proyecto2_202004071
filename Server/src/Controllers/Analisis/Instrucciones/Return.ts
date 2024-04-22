import { Instruccion } from "../Abstracto/Instruccion";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Nativo from '../Expresiones/Nativo';
import Contador from "../SimboloC/Contador";

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
 
      return nativoV;
    }
    return this;
  }
  buildAst(anterior: string): string {
      let contador = Contador.getInstance();
      let nodoRaiz = `n${contador.get()}`;
      let nodoReturn = `n${contador.get()}`;
      if (this.expresion != null) {
          let nodoExpresion = this.expresion.buildAst(nodoRaiz);
          let resultado = `${nodoRaiz}[label="Return"]\n`;
          resultado += `${anterior} -> ${nodoRaiz}\n`;
          resultado += `${nodoRaiz} -> ${nodoExpresion}\n`;
          resultado += this.expresion.buildAst(nodoExpresion);
          return resultado;
      } else {
          let resultado = `${nodoRaiz}[label="Return"]\n`;
          resultado += `${anterior} -> ${nodoRaiz}\n`;
          return resultado;
      }
  }
}   