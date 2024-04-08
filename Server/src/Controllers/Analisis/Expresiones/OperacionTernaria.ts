import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";

export default class OperacionTernaria extends Instruccion {
  private condicion: Instruccion;
  private verdadero: Instruccion;
  private falso: Instruccion;

  constructor(condicion: Instruccion, verdadero: Instruccion, falso: Instruccion, linea: number, columna: number) {
    super(falso.Tipo,linea, columna);
    this.condicion = condicion;
    this.verdadero = verdadero;
    this.falso = falso;
  }

  interpretar(ArbolS: ArbolS, tabla: TablaSimbolos): any {
    let condicion = this.condicion.interpretar(ArbolS, tabla);
    if (condicion instanceof Errores) {
      return condicion;
    }

    if (condicion) {
      return this.verdadero.interpretar(ArbolS, tabla);
    } else {
      return this.falso.interpretar(ArbolS, tabla);
    }
  }
}