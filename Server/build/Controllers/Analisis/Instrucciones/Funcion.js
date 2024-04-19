"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstracto/Instruccion");
const Errores_1 = __importDefault(require("../Excepciones/Errores"));
const Return_1 = __importDefault(require("./Return"));
class Funcion extends Instruccion_1.Instruccion {
    //funciones : tipo ids PARENTESISI parametros PARENTESISD LLAVEI codigos LLAVED { $$ = new Funcion.default($1, $2, $4, $7, @1.first_line, @1.first_column); }
    constructor(tipo, id, parametros, instrucciones, linea, columna) {
        super(tipo, linea, columna);
        this.id = id;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }
    interpretar(ArbolS, tabla) {
        for (let instruccion of this.instrucciones) {
            if (instruccion instanceof Return_1.default) {
                return instruccion;
            }
            let result = instruccion.interpretar(ArbolS, tabla);
            if (result instanceof Errores_1.default)
                return result;
            if (result instanceof Return_1.default)
                return result;
        }
    }
}
exports.default = Funcion;
