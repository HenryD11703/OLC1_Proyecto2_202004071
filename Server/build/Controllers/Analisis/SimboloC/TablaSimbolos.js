"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Simbolo_1 = __importDefault(require("./Simbolo"));
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
            let buscar = i.getTablaActual().get(identificador.toLocaleLowerCase());
            if (buscar != null)
                return buscar;
        }
        return null;
    }
    getVariableVector(identificador, posicion) {
        for (let i = this; i != null; i = i.getTablaAnterior()) {
            let buscar = i.getTablaActual().get(identificador.toLocaleLowerCase());
            if (buscar != null) {
                let valor = buscar.getValor();
                if (Array.isArray(valor) && posicion >= 0 && posicion < valor.length) {
                    return new Simbolo_1.default(buscar.getTipoSimbolo(), `${buscar.getIdentificador()}[${posicion}]`, valor[posicion]);
                }
            }
        }
        return null;
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
