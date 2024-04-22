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
const Tipo_1 = __importStar(require("../SimboloC/Tipo"));
const Errores_1 = __importDefault(require("../Excepciones/Errores"));
const Contador_1 = __importDefault(require("../SimboloC/Contador"));
class toUpper extends Instruccion_1.Instruccion {
    constructor(expresion, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.CADENA), linea, columna);
        this.expresion = expresion;
    }
    interpretar(ArbolS, tabla) {
        let valor = this.expresion.interpretar(ArbolS, tabla);
        if (valor instanceof Errores_1.default)
            return valor;
        let tipoValor = this.expresion.Tipo.getTipo();
        switch (tipoValor) {
            case Tipo_1.TipoDato.CADENA:
                this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.CADENA);
                return valor.toUpperCase();
            default:
                return new Errores_1.default('Semantico', `No se puede convertir a mayusculas un valor de tipo ${tipoValor}`, this.Linea, this.Columna);
        }
    }
    //funcToUpper : TOUPPER PARENTESISI expresion PARENTESISD 
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let funcionToUpper = `n${contador.get()}`;
        let nodoToUpper = `n${contador.get()}`;
        let nodoParentesisI = `n${contador.get()}`;
        let nodoExpresion = `n${contador.get()}`;
        let nodoParentesisD = `n${contador.get()}`;
        let resultado = `${funcionToUpper}[label="toUpper"]\n`;
        resultado += `${nodoToUpper}[label="TOUPPER"]\n`;
        resultado += `${funcionToUpper} -> ${nodoToUpper}\n`;
        resultado += `${nodoParentesisI}[label="("]\n`;
        resultado += `${funcionToUpper} -> ${nodoParentesisI}\n`;
        resultado += `${nodoExpresion}[label="Expresion"]\n`;
        resultado += this.expresion.buildAst(nodoExpresion);
        resultado += `${funcionToUpper} -> ${nodoExpresion}\n`;
        resultado += `${nodoParentesisD}[label=")"]\n`;
        resultado += `${funcionToUpper} -> ${nodoParentesisD}\n`;
        resultado += `${anterior} -> ${funcionToUpper}\n`;
        return resultado;
    }
}
exports.default = toUpper;
