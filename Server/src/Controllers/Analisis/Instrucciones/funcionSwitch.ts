import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import Contador from "../SimboloC/Contador";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Bloque from "./Bloque";
import Break from "./Break";
import Caso from "./Caso";
import Continue from "./Continue";
import Default from "./Default";
import Return from "./Return";

export default class FuncionSwitch extends Instruccion {
  private expresion: Instruccion;
  private casos: Array<Caso> | null;
  private casoDefault: Default | null;

  constructor(
    expresion: Instruccion,
    casos: Array<Caso> | null,
    casoDefault: Default | null,
    linea: number,
    columna: number
  ) {
    super(new Tipo(TipoDato.VOID), linea, columna);
    this.expresion = expresion;
    this.casos = casos;
    this.casoDefault = casoDefault;
  }

  interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
    const valorExpresion = this.expresion.interpretar(ArbolS, tabla);
    if (valorExpresion instanceof Errores) return valorExpresion;

    let newTabla = new TablaSimbolos(tabla);
    newTabla.setNombre("Switch");

    if (this.casos !== null) {
      for (const caso of this.casos) {
        const valorCaso = caso.expresion.interpretar(ArbolS, newTabla);
        if (valorCaso instanceof Errores) return valorCaso;

        if (valorExpresion === valorCaso) {
          const resultCaso : any = caso.interpretar(ArbolS, newTabla);
          if (resultCaso instanceof Errores) return resultCaso;
          if (resultCaso instanceof Break) return resultCaso;
          if (resultCaso instanceof Continue) return resultCaso;
          if (resultCaso instanceof Return) return resultCaso;
          break;
        }
      }
    }

    if (this.casoDefault !== null) {
        let resultDefault: any = this.casoDefault.interpretar(ArbolS, newTabla);
        if (resultDefault instanceof Errores) return resultDefault;
        if (resultDefault instanceof Break) return resultDefault;
        if (resultDefault instanceof Continue) return resultDefault;
        if (resultDefault instanceof Return) return resultDefault;
    }

    return null;
  }

  buildAst(anterior: string): string {
    let contador = Contador.getInstance();
    let nodoRaiz = `n${contador.get()}`;
    let nodoSwitch = `n${contador.get()}`;
    let nodoExpresion = `n${contador.get()}`;
    let nodoLlaveI = `n${contador.get()}`;
    let nodoCasos = null;
    let nodoDefault = null;

    let resultado = `${nodoRaiz}[label="Raiz"]\n`;
    resultado += `${anterior} -> ${nodoRaiz}\n`;
    resultado += `${nodoSwitch}[label="Switch"]\n`;
    resultado += `${nodoRaiz} -> ${nodoSwitch}\n`;

    resultado += `${nodoExpresion}[label="Expresión"]\n`;
    resultado += `${nodoSwitch} -> ${nodoExpresion}\n`;
    resultado += this.expresion.buildAst(`${nodoExpresion}`);

    resultado += `${nodoLlaveI}[label="{"]\n`;
    resultado += `${nodoSwitch} -> ${nodoLlaveI}\n`;

    if (this.casos !== null) {
        nodoCasos = `n${contador.get()}`;
        resultado += `${nodoCasos}[label="Casos"]\n`;
        resultado += `${nodoSwitch} -> ${nodoCasos}\n`;

        for (let caso of this.casos) {
            let nodoCaso = `n${contador.get()}`;
            resultado += `${nodoCaso}[label="Caso"]\n`;
            resultado += `${nodoCasos} -> ${nodoCaso}\n`;
            resultado += caso.buildAst(`${nodoCaso}`);
        }
    }

    if (this.casoDefault !== null) {
        nodoDefault = `n${contador.get()}`;
        resultado += `${nodoDefault}[label="Default"]\n`;
        resultado += `${nodoSwitch} -> ${nodoDefault}\n`;
        resultado += this.casoDefault.buildAst(`${nodoDefault}`);
    }

    let nodoLlaveD = `n${contador.get()}`;
    resultado += `${nodoLlaveD}[label="}"]\n`;
    resultado += `${nodoSwitch} -> ${nodoLlaveD}\n`;

    return resultado;
}

}