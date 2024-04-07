"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstracto/Instruccion");
//enteros, variables, booleanos, decimales, caracteres, cadenas ,etc
class Nativo extends Instruccion_1.Instruccion {
    constructor(tipo, valor, linea, columna) {
        super(tipo, linea, columna);
        this.valor = valor;
    }
    interpretar(ArbolS, tabla) {
        return this.valor;
    }
}
exports.default = Nativo;
