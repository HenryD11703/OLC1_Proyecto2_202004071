import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";

export default class Impresion extends Instruccion {
    private expresion: Instruccion;
    private saltoLinea: string;
    constructor(expresion: Instruccion,saltoLinea: string, linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.expresion = expresion;
        this.saltoLinea = saltoLinea;
    }
    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let valor = this.expresion.interpretar(ArbolS, tabla);
        if (valor instanceof Errores) {
            return valor;
        }
        if(this.saltoLinea == ""){
            ArbolS.Imprimir(valor);        
    }
    else{
        ArbolS.Imprimir(valor + "\n");
    }
    return null;
    }
}