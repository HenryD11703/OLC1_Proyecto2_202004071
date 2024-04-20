import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import Simbolo from "../SimboloC/Simbolo";
import TablaSimbolos from '../SimboloC/TablaSimbolos';
import Tipo, { TipoDato } from "../SimboloC/Tipo";

export default class Declaracion extends Instruccion {
    private id: string[];
    private valor: Instruccion | undefined;

    constructor(tipo: Tipo, linea: number, columna: number, id: string[], valor?: Instruccion) {
        super(tipo, linea, columna);
        this.id = id;
        this.valor = valor;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        if (this.valor) {
            let valorFinal = this.valor.interpretar(ArbolS, tabla);
            if (valorFinal instanceof Errores) return valorFinal;

            if (this.valor.Tipo.getTipo() != this.Tipo.getTipo()) {
                return new Errores('Semantico', `El tipo de dato no es igual`, this.Linea, this.Columna);
            }

            for (let ide of this.id) {
                if (!tabla.setVariable(new Simbolo(this.Tipo, ide, valorFinal))) {
                    return new Errores('Semantico', `La variable ${ide} ya existe`, this.Linea, this.Columna);
                }
            }
        }
        else {
            for (let ide of this.id) {
                if (!tabla.setVariable(new Simbolo(this.Tipo, ide, this.valorDefecto(this.Tipo.getTipo())))) {
                    return new Errores('Semantico', `La variable ${ide} ya existe`, this.Linea, this.Columna);
                }
            }
        }
    }

    valorDefecto(tipo: TipoDato) {
        switch (tipo) {
            case TipoDato.ENTERO:
                return 0;
            case TipoDato.DECIMAL:
                return 0.0;
            case TipoDato.BOOLEANO:
                return true;
            case TipoDato.CADENA:
                return "";
            case TipoDato.CARACTER:
                return '0';
        }
    }
}

/*

  //Cuando se declare una variable sin valor, se le asigna un valor por defecto
 
        if (valorFinal == null) {
            if (this.Tipo.getTipo() == TipoDato.ENTERO) {
                valorFinal = 0;
            } else if (this.Tipo.getTipo() == TipoDato.CADENA) {
                valorFinal = "";
            } else if (this.Tipo.getTipo() == TipoDato.BOOLEANO) {
                valorFinal = true;
            } else if (this.Tipo.getTipo() == TipoDato.DECIMAL) {
                valorFinal = 0.0;
            } else if (this.Tipo.getTipo() == TipoDato.CARACTER) {
                valorFinal = '0';
            }


*/