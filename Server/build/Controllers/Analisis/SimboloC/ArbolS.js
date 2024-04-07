"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TablaSimbolos_1 = __importDefault(require("./TablaSimbolos"));
class ArbolS {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = "";
        this.tablaGlobal = new TablaSimbolos_1.default();
        this.errores = new Array();
    }
    Imprimir(contenido) {
        this.consola = `${this.consola}${contenido}`;
    }
    getConsola() {
        return this.consola;
    }
    setConsola(consola) {
        this.consola = consola;
    }
    getInstrucciones() {
        return this.instrucciones;
    }
    setInstrucciones(instrucciones) {
        this.instrucciones = instrucciones;
    }
    getTablaGlobal() {
        return this.tablaGlobal;
    }
    setTablaGlobal(tablaGlobal) {
        this.tablaGlobal = tablaGlobal;
    }
    getErrores() {
        return this.errores;
    }
}
exports.default = ArbolS;
