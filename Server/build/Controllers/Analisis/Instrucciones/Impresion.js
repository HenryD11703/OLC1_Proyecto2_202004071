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
const Contador_1 = __importDefault(require("../SimboloC/Contador"));
const Tipo_1 = __importStar(require("../SimboloC/Tipo"));
class Impresion extends Instruccion_1.Instruccion {
    constructor(expresion, saltoLinea, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
        this.expresion = expresion;
        this.saltoLinea = saltoLinea;
    }
    interpretar(ArbolS, tabla) {
        let valor = this.expresion.interpretar(ArbolS, tabla);
        if (valor instanceof Errores_1.default) {
            return valor;
        }
        if (this.saltoLinea == "") {
            ArbolS.Imprimir(valor);
        }
        else {
            ArbolS.Imprimir(valor + "\n");
        }
        return null;
    }
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let nodoRaiz = `n${contador.get()}`;
        let nodoImpresion = `n${contador.get()}`;
        let nodoCout = `n${contador.get()}`;
        let nodoMenorMenor1 = `n${contador.get()}`;
        let nodoExpresion = `n${contador.get()}`;
        let nodoMenorMenor2 = null;
        let nodoEndl = null;
        let resultado = `${nodoRaiz}[label="Raiz"]\n`;
        resultado += `${anterior} -> ${nodoRaiz}\n`;
        resultado += `${nodoImpresion}[label="Impresión"]\n`;
        resultado += `${nodoRaiz} -> ${nodoImpresion}\n`;
        resultado += `${nodoCout}[label="cout"]\n`;
        resultado += `${nodoImpresion} -> ${nodoCout}\n`;
        resultado += `${nodoMenorMenor1}[label="<<"]\n`;
        resultado += `${nodoImpresion} -> ${nodoMenorMenor1}\n`;
        resultado += `${nodoExpresion}[label="Expresión"]\n`;
        resultado += `${nodoImpresion} -> ${nodoExpresion}\n`;
        resultado += this.expresion.buildAst(`${nodoExpresion}`);
        if (this.saltoLinea !== "") {
            nodoMenorMenor2 = `n${contador.get()}`;
            resultado += `${nodoMenorMenor2}[label="<<"]\n`;
            resultado += `${nodoImpresion} -> ${nodoMenorMenor2}\n`;
            nodoEndl = `n${contador.get()}`;
            resultado += `${nodoEndl}[label="endl"]\n`;
            resultado += `${nodoImpresion} -> ${nodoEndl}\n`;
        }
        return resultado;
    }
}
exports.default = Impresion;
