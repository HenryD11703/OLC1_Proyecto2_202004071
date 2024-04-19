import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Return from './Return';

export default class Funcion extends Instruccion {
    public id: string;
    public parametros: any[];
    public instrucciones: Instruccion[];

    //funciones : tipo ids PARENTESISI parametros PARENTESISD LLAVEI codigos LLAVED { $$ = new Funcion.default($1, $2, $4, $7, @1.first_line, @1.first_column); }
    constructor(tipo : Tipo, id: string, parametros: any[], instrucciones: Instruccion[], linea: number, columna: number){
        super(tipo, linea, columna);
        this.id = id;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }
    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        for (let instruccion of this.instrucciones) {
             
            let result = instruccion.interpretar(ArbolS, tabla);
            if (result instanceof Errores) return result;
            if (result instanceof Return) return result;
        }
    }
}