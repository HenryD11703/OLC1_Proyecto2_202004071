"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstracto/Instruccion");
const Errores_1 = __importDefault(require("../Excepciones/Errores"));
const Tipo_1 = __importStar(require("../SimboloC/Tipo"));
//Para modificar y asignar valores a un vector en una posicion especifica
class AsignacionVec extends Instruccion_1.Instruccion {
    constructor(id, linea, columna, numero, valor, numero2) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
        this.id = id;
        this.numero = numero;
        this.numero2 = numero2;
        this.valor = valor;
    }
    interpretar(ArbolS, tabla) {
        //verificar si es de una o dos dimensiones
        let newValor = this.valor.interpretar(ArbolS, tabla);
        if (newValor instanceof Errores_1.default)
            return newValor;
        const variable = tabla.getVariable(this.id);
        if (variable != null) {
            if (this.numero2 == undefined) {
                let resultado = tabla.setVariableVector(this.id, this.numero.interpretar(ArbolS, tabla), newValor);
                if (!resultado) {
                    return new Errores_1.default('Semantico', `La variable ${this.id} no existe`, this.Linea, this.Columna);
                }
            }
            else {
                let resultado = tabla.setVariableVector2(this.id, this.numero.interpretar(ArbolS, tabla), this.numero2.interpretar(ArbolS, tabla), newValor);
                if (!resultado) {
                    return new Errores_1.default('Semantico', `La variable ${this.id} no existe`, this.Linea, this.Columna);
                }
            }
        }
        else {
            return new Errores_1.default('Semantico', `La variable ${this.id} no existe`, this.Linea, this.Columna);
        }
    }
}
exports.default = AsignacionVec;
