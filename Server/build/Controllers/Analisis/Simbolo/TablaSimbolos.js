"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TablaSimbolos {
    constructor(tablaAnterior) {
        this.tablaAnterior = tablaAnterior;
        this.tablaActual = new Map();
        this.nombre = "";
    }
    getTablaAnterior() {
        return this.tablaAnterior;
    }
    setTablaAnterior(tablaAnterior) {
        this.tablaAnterior = tablaAnterior;
    }
    getTablaActual() {
        return this.tablaActual;
    }
    setTablaActual(tablaActual) {
        this.tablaActual = tablaActual;
    }
    getVariable(identificador) {
        return "";
    }
    setVariable(Simbolo) {
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
}
exports.default = TablaSimbolos;
