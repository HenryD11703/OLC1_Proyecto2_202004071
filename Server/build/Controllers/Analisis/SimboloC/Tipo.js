"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoDato = void 0;
class Tipo {
    constructor(tipo) {
        this.tipo = tipo;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
}
exports.default = Tipo;
var TipoDato;
(function (TipoDato) {
    TipoDato[TipoDato["ENTERO"] = 0] = "ENTERO";
    TipoDato[TipoDato["DECIMAL"] = 1] = "DECIMAL";
    TipoDato[TipoDato["BOOLEANO"] = 2] = "BOOLEANO";
    TipoDato[TipoDato["CARACTER"] = 3] = "CARACTER";
    TipoDato[TipoDato["CADENA"] = 4] = "CADENA";
    TipoDato[TipoDato["VOID"] = 5] = "VOID";
    TipoDato[TipoDato["ARREGLO"] = 6] = "ARREGLO";
})(TipoDato || (exports.TipoDato = TipoDato = {}));
