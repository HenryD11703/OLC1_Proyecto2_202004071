"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstracto/Instruccion");
const Contador_1 = __importDefault(require("../SimboloC/Contador"));
//enteros, variables, booleanos, decimales, caracteres, cadenas ,etc
class Nativo extends Instruccion_1.Instruccion {
    constructor(tipo, valor, linea, columna) {
        super(tipo, linea, columna);
        this.valor = valor;
    }
    interpretar(ArbolS, tabla) {
        return this.valor;
    }
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let nodoNativo = `n${contador.get()}`;
        let nodoValor = `n${contador.get()}`;
        let resultado = `${nodoNativo}[label="Nativo"]\n`;
        resultado += `${nodoValor}[label="${this.valor}"]\n`;
        resultado += `${nodoNativo} -> ${nodoValor}\n`;
        resultado += `${anterior} -> ${nodoNativo}\n`;
        return resultado;
    }
}
exports.default = Nativo;
