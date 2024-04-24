import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";
import Contador from "../SimboloC/Contador";

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
        if (condicionResultado instanceof Errores) {
            arbolS.createAndAddError(arbolS, 'Semantico', `Error en la condicion de la operacion ternaria`, this.Linea, this.Columna);
            return condicionResultado;}

        if (condicionResultado) {
           
          const valorVerdadero = this.expresionVerdadera.interpretar(arbolS, tabla);
          if (valorVerdadero instanceof Errores) {
            arbolS.createAndAddError(arbolS, 'Semantico', `Error en la expresion verdadera de la operacion ternaria`, this.Linea, this.Columna);
            return valorVerdadero};
          this.Tipo = this.expresionVerdadera.Tipo;
          return valorVerdadero;
      } else {
        
          const valorFalso = this.expresionFalsa.interpretar(arbolS, tabla);
          if (valorFalso instanceof Errores){
            arbolS.createAndAddError(arbolS, 'Semantico', `Error en la expresion falsa de la operacion ternaria`, this.Linea, this.Columna);
            return valorFalso;}
          this.Tipo = this.expresionFalsa.Tipo;
          return valorFalso;
      }
    }
    //ternaryOp : expresion INTERROGACION expresion DOSPUNTOS expresion  { $$ = new OpTernaria.default($1, $3, $5, @1.first_line, @1.first_column); }
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let nodoTernaria = `n${contador.get()}`
        let nodoExpresion = `n${contador.get()}`
        let nodoInterrogacion = `n${contador.get()}`
        let nodoExpresion2 = `n${contador.get()}`
        let nodoDosPuntos = `n${contador.get()}`
        let nodoExpresion3 = `n${contador.get()}`
        let resultado = `${nodoTernaria}[label="Ternaria"]\n`
        resultado += `${nodoExpresion}[label="Expresion"]\n`
        resultado += this.condicion.buildAst(nodoExpresion)
        resultado += `${nodoTernaria} -> ${nodoExpresion}\n`
        resultado += `${nodoInterrogacion}[label="?"]\n`
        resultado += `${nodoTernaria} -> ${nodoInterrogacion}\n`
        resultado += `${nodoExpresion2}[label="Expresion"]\n`
        resultado += this.expresionVerdadera.buildAst(nodoExpresion2)
        resultado += `${nodoTernaria} -> ${nodoExpresion2}\n`
        resultado += `${nodoDosPuntos}[label=":"]\n`
        resultado += `${nodoTernaria} -> ${nodoDosPuntos}\n`
        resultado += `${nodoExpresion3}[label="Expresion"]\n`
        resultado += this.expresionFalsa.buildAst(nodoExpresion3)
        resultado += `${nodoTernaria} -> ${nodoExpresion3}\n`
        resultado += `${anterior} -> ${nodoTernaria}\n`
        return resultado
    }
}