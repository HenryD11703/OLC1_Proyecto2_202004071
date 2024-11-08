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
const Nativo_1 = __importDefault(require("../Expresiones/Nativo"));
const Contador_1 = __importDefault(require("../SimboloC/Contador"));
class Return extends Instruccion_1.Instruccion {
    constructor(expresion, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
        this.expresion = expresion;
    }
    interpretar(arbolS, tabla) {
        if (this.expresion != null) {
            let resultado = this.expresion.interpretar(arbolS, tabla);
            let nativoV = new Nativo_1.default(this.Tipo, resultado, this.Linea, this.Columna);
            return nativoV;
        }
        return this;
    }
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let nodoRaiz = `n${contador.get()}`;
        let nodoReturn = `n${contador.get()}`;
        let nodoPYC = `n${contador.get()}`;
        if (this.expresion != null) {
            let resultado = `${nodoRaiz}[label="Return"]\n`;
            resultado += `${anterior} -> ${nodoRaiz}\n`;
            resultado += `${nodoReturn}[label="return"]\n`;
            resultado += `${nodoRaiz} -> ${nodoReturn}\n`;
            resultado += this.expresion.buildAst(nodoRaiz);
            resultado += `${nodoPYC}[label=";"]\n`;
            resultado += `${nodoRaiz} -> ${nodoPYC}\n`;
            return resultado;
        }
        else {
            let resultado = `${nodoRaiz}[label="Return"]\n`;
            resultado += `${anterior} -> ${nodoRaiz}\n`;
            resultado += `${nodoPYC}[label=";"]\n`;
            resultado += `${nodoRaiz} -> ${nodoPYC}\n`;
            return resultado;
        }
    }
}
exports.default = Return;
