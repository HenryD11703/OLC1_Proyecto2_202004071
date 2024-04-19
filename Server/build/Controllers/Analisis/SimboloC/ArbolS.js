"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TablaSimbolos_1 = __importDefault(require("./TablaSimbolos"));
const Funcion_1 = __importDefault(require("../Instrucciones/Funcion"));
class ArbolS {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = "";
        this.tablaGlobal = new TablaSimbolos_1.default();
        this.errores = new Array;
        this.funciones = new Array;
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
    getFunciones() {
        return this.funciones;
    }
    setFunciones(funciones) {
        this.funciones = funciones;
    }
    addFunciones(funcion) {
        this.funciones.push(funcion);
    }
    getFuncion(id) {
        for (let i of this.getFunciones()) {
            if (i instanceof Funcion_1.default) {
                if (i.id.toLocaleLowerCase() == id.toLocaleLowerCase())
                    return i;
            }
        }
        return null;
    }
}
exports.default = ArbolS;
