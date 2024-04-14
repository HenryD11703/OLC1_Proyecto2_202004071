"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstracto/Instruccion");
const Errores_1 = __importDefault(require("../Excepciones/Errores"));
const Simbolo_1 = __importDefault(require("../SimboloC/Simbolo"));
class DeclaracionCstr extends Instruccion_1.Instruccion {
    constructor(tipo, id, Instruccion, linea, columna) {
        super(tipo, linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.Instruccion = Instruccion;
    }
    interpretar(ArbolS, tabla) {
        console.log("ENTRO A DECLARACION CSTR");
        let valor = this.Instruccion.interpretar(ArbolS, tabla);
        if (valor instanceof Errores_1.default)
            return valor;
        console.log("VALOR DE INSTRUCCION: ", valor);
        let valorC = valor.split('');
        console.log("VALOR DE INSTRUCCION ARRAY : ", valorC);
        for (let Identificador of this.id) {
            if (!tabla.setVariable(new Simbolo_1.default(this.tipo, Identificador, valorC))) {
                return new Errores_1.default('Semantico', 'Ya existe una variable con el mismo nombre', this.Linea, this.Columna);
            }
        }
    }
}
exports.default = DeclaracionCstr;
