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
    getVariableVector2(identificador, posicion1, posicion2) {
        for (let i = this; i != null; i = i.getTablaAnterior()) {
            let buscar = i.getTablaActual().get(identificador.toLocaleLowerCase());
            if (buscar != null) {
                let valor = buscar.getValor();
                if (Array.isArray(valor) && Array.isArray(valor[0]) && posicion1 >= 0 && posicion1 < valor.length && posicion2 >= 0 && posicion2 < valor[0].length) {
                    return new Simbolo_1.default(buscar.getTipoSimbolo(), `${buscar.getIdentificador()}[${posicion1}][${posicion2}]`, valor[posicion1][posicion2]);
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
    setVariableVector(identificador, posicion, valor) {
        for (let i = this; i != null; i = i.getTablaAnterior()) {
            let buscar = i.getTablaActual().get(identificador.toLocaleLowerCase());
            if (buscar != null) {
                let valorActual = buscar.getValor();
                if (Array.isArray(valorActual) && posicion >= 0 && posicion < valorActual.length) {
                    valorActual[posicion] = valor;
                    buscar.setValor(valorActual);
                    i.getTablaActual().set(identificador.toLocaleLowerCase(), buscar);
                    return true;
                }
            }
        }
        return false;
    }
    setVariableVector2(identificador, posicion1, posicion2, valor) {
        for (let i = this; i != null; i = i.getTablaAnterior()) {
            let buscar = i.getTablaActual().get(identificador.toLocaleLowerCase());
            if (buscar != null) {
                let valorActual = buscar.getValor();
                if (Array.isArray(valorActual) && Array.isArray(valorActual[0]) && posicion1 >= 0 && posicion1 < valorActual.length && posicion2 >= 0 && posicion2 < valorActual[0].length) {
                    valorActual[posicion1][posicion2] = valor;
                    buscar.setValor(valorActual);
                    i.getTablaActual().set(identificador.toLocaleLowerCase(), buscar);
                    return true;
                }
            }
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
