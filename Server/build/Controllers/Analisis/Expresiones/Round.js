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
class Round extends Instruccion_1.Instruccion {
    constructor(expresion, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
        this.expresion = expresion;
    }
    interpretar(arbolS, tabla) {
        let valor = this.expresion.interpretar(arbolS, tabla);
        if (valor instanceof Errores_1.default)
            return valor;
        let tipoValor = this.expresion.Tipo.getTipo();
        switch (tipoValor) {
            case Tipo_1.TipoDato.DECIMAL:
                this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                return Math.round(valor);
            case Tipo_1.TipoDato.ENTERO:
                this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.ENTERO);
                return valor;
            default:
                arbolS.createAndAddError(arbolS, 'Semantico', `No se puede redondear un valor de tipo ${tipoValor}`, this.Linea, this.Columna);
                return new Errores_1.default('Semantico', `No se puede redondear un valor de tipo ${tipoValor}`, this.Linea, this.Columna);
        }
    }
    //funcionRound : ROUND PARENTESISI expresion PARENTESISD 
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let funcionRound = `n${contador.get()}`;
        let nodoRound = `n${contador.get()}`;
        let nodoParentesisI = `n${contador.get()}`;
        let nodoExpresion = `n${contador.get()}`;
        let nodoParentesisD = `n${contador.get()}`;
        let resultado = `${funcionRound}[label="Round"]\n`;
        resultado += `${nodoRound}[label="ROUND"]\n`;
        resultado += `${funcionRound} -> ${nodoRound}\n`;
        resultado += `${nodoParentesisI}[label="("]\n`;
        resultado += `${funcionRound} -> ${nodoParentesisI}\n`;
        resultado += `${nodoExpresion}[label="Expresion"]\n`;
        resultado += this.expresion.buildAst(nodoExpresion);
        resultado += `${funcionRound} -> ${nodoExpresion}\n`;
        resultado += `${nodoParentesisD}[label=")"]\n`;
        resultado += `${funcionRound} -> ${nodoParentesisD}\n`;
        resultado += `${anterior} -> ${funcionRound}\n`;
        return resultado;
    }
}
exports.default = Round;
