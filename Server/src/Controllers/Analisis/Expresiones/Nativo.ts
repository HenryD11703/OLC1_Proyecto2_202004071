import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";

//enteros, variables, booleanos, decimales, caracteres, cadenas ,etc
export default class Nativo extends Instruccion {
    valor: any | undefined;

    constructor(tipo: Tipo, valor: any, linea: number, columna: number) {
        super(tipo, linea, columna);
        this.valor = valor;
    }
    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        return this.valor;
    }
}