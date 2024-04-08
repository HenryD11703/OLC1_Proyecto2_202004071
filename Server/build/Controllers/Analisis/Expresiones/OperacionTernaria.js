"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstracto/Instruccion");
const Errores_1 = __importDefault(require("../Excepciones/Errores"));
class OperacionTernaria extends Instruccion_1.Instruccion {
    constructor(condicion, verdadero, falso, linea, columna) {
        super(falso.Tipo, linea, columna);
        this.condicion = condicion;
        this.verdadero = verdadero;
        this.falso = falso;
    }
    interpretar(ArbolS, tabla) {
        let condicion = this.condicion.interpretar(ArbolS, tabla);
        if (condicion instanceof Errores_1.default) {
            return condicion;
        }
        if (condicion) {
            return this.verdadero.interpretar(ArbolS, tabla);
        }
        else {
            return this.falso.interpretar(ArbolS, tabla);
        }
    }
}
exports.default = OperacionTernaria;
