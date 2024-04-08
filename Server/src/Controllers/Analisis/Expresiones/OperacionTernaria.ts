import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";

export default class OperacionTernaria extends Instruccion {
    private condicion: Instruccion;
    private expresionVerdadera: Instruccion;
    private expresionFalsa: Instruccion;

    constructor(condicion: Instruccion, expresionVerdadera: Instruccion, expresionFalsa: Instruccion, linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.expresionVerdadera = expresionVerdadera;
        this.expresionFalsa = expresionFalsa;
    }

    interpretar(arbolS: ArbolS, tabla: TablaSimbolos) {
        const condicionResultado = this.condicion.interpretar(arbolS, tabla);
        if (condicionResultado instanceof Errores) return condicionResultado;

        if (condicionResultado) {
           
          const valorVerdadero = this.expresionVerdadera.interpretar(arbolS, tabla);
          if (valorVerdadero instanceof Errores) return valorVerdadero;
          this.Tipo = this.expresionVerdadera.Tipo;
          return valorVerdadero;
      } else {
        
          const valorFalso = this.expresionFalsa.interpretar(arbolS, tabla);
          if (valorFalso instanceof Errores) return valorFalso;
          this.Tipo = this.expresionFalsa.Tipo;
          return valorFalso;
      }
    }
}