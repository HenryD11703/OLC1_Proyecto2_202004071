"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instruccion = void 0;
//Esta clase nos servira para crear el arbol con los nodos de instruccion que contendran 
//a su vez otros nodos de instruccion o nodos de expresion para leer e interpretar ese arbol
class Instruccion {
    constructor(tipo, linea, columna) {
        this.Tipo = tipo;
        this.Linea = linea;
        this.Columna = columna;
    }
}
exports.Instruccion = Instruccion;
