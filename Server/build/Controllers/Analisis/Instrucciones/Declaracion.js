"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstracto/Instruccion");
const Errores_1 = __importDefault(require("../Excepciones/Errores"));
const Simbolo_1 = __importDefault(require("../SimboloC/Simbolo"));
const Tipo_1 = require("../SimboloC/Tipo");
class Declaracion extends Instruccion_1.Instruccion {
    constructor(tipo, linea, columna, id, valor) {
        super(tipo, linea, columna);
        this.id = id;
        this.valor = valor;
    }
    interpretar(ArbolS, tabla) {
        let valorFinal = this.valor.interpretar(ArbolS, tabla);
        if (valorFinal instanceof Errores_1.default)
            return valorFinal;
        //Cuando se declare una variable sin valor, se le asigna un valor por defecto
        console.log("valorFinal: " + valorFinal);
        console.log("tipo: " + this.Tipo.getTipo());
        if (valorFinal == "nada") {
            if (this.Tipo.getTipo() == Tipo_1.TipoDato.ENTERO) {
                valorFinal = 0;
            }
            else if (this.Tipo.getTipo() == Tipo_1.TipoDato.CADENA) {
                valorFinal = "";
            }
            else if (this.Tipo.getTipo() == Tipo_1.TipoDato.BOOLEANO) {
                valorFinal = false;
            }
            else if (this.Tipo.getTipo() == Tipo_1.TipoDato.DECIMAL) {
                valorFinal = 0.0;
            }
            else if (this.Tipo.getTipo() == Tipo_1.TipoDato.CARACTER) {
                valorFinal = '';
            }
        }
        if (this.valor.Tipo.getTipo() != this.Tipo.getTipo()) {
            return new Errores_1.default('Semantico', `El tipo de dato no es igual`, this.Linea, this.Columna);
        }
        if (!tabla.setVariable(new Simbolo_1.default(this.Tipo, this.id, valorFinal))) {
            return new Errores_1.default('Semantico', `La variable ${this.id} ya existe`, this.Linea, this.Columna);
        }
    }
}
exports.default = Declaracion;
