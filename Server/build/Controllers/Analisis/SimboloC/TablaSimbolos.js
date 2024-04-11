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
        for (let i = this; i != null; i = i.getTablaAnterior()) {
            let buscar = i.getTablaActual().get(identificador.toLowerCase());
            if (buscar != null) {
                return buscar;
            }
            return null;
        }
    }
    setVariable(Simbolo) {
        let buscar = this.getTablaActual().get(Simbolo.getIdentificador().toLowerCase());
        if (buscar == null) {
            this.getTablaActual().set(Simbolo.getIdentificador().toLocaleLowerCase(), Simbolo);
            return true;
        }
        return false;
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
}
exports.default = TablaSimbolos;
