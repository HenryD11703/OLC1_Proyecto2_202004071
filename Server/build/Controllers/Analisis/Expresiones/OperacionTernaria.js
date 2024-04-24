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
class OperacionTernaria extends Instruccion_1.Instruccion {
    constructor(condicion, expresionVerdadera, expresionFalsa, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.expresionVerdadera = expresionVerdadera;
        this.expresionFalsa = expresionFalsa;
    }
    interpretar(arbolS, tabla) {
        const condicionResultado = this.condicion.interpretar(arbolS, tabla);
        if (condicionResultado instanceof Errores_1.default) {
            arbolS.createAndAddError(arbolS, 'Semantico', `Error en la condicion de la operacion ternaria`, this.Linea, this.Columna);
            return condicionResultado;
        }
        if (condicionResultado) {
            const valorVerdadero = this.expresionVerdadera.interpretar(arbolS, tabla);
            if (valorVerdadero instanceof Errores_1.default) {
                arbolS.createAndAddError(arbolS, 'Semantico', `Error en la expresion verdadera de la operacion ternaria`, this.Linea, this.Columna);
                return valorVerdadero;
            }
            ;
            this.Tipo = this.expresionVerdadera.Tipo;
            return valorVerdadero;
        }
        else {
            const valorFalso = this.expresionFalsa.interpretar(arbolS, tabla);
            if (valorFalso instanceof Errores_1.default) {
                arbolS.createAndAddError(arbolS, 'Semantico', `Error en la expresion falsa de la operacion ternaria`, this.Linea, this.Columna);
                return valorFalso;
            }
            this.Tipo = this.expresionFalsa.Tipo;
            return valorFalso;
        }
    }
    //ternaryOp : expresion INTERROGACION expresion DOSPUNTOS expresion  { $$ = new OpTernaria.default($1, $3, $5, @1.first_line, @1.first_column); }
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let nodoTernaria = `n${contador.get()}`;
        let nodoExpresion = `n${contador.get()}`;
        let nodoInterrogacion = `n${contador.get()}`;
        let nodoExpresion2 = `n${contador.get()}`;
        let nodoDosPuntos = `n${contador.get()}`;
        let nodoExpresion3 = `n${contador.get()}`;
        let resultado = `${nodoTernaria}[label="Ternaria"]\n`;
        resultado += `${nodoExpresion}[label="Expresion"]\n`;
        resultado += this.condicion.buildAst(nodoExpresion);
        resultado += `${nodoTernaria} -> ${nodoExpresion}\n`;
        resultado += `${nodoInterrogacion}[label="?"]\n`;
        resultado += `${nodoTernaria} -> ${nodoInterrogacion}\n`;
        resultado += `${nodoExpresion2}[label="Expresion"]\n`;
        resultado += this.expresionVerdadera.buildAst(nodoExpresion2);
        resultado += `${nodoTernaria} -> ${nodoExpresion2}\n`;
        resultado += `${nodoDosPuntos}[label=":"]\n`;
        resultado += `${nodoTernaria} -> ${nodoDosPuntos}\n`;
        resultado += `${nodoExpresion3}[label="Expresion"]\n`;
        resultado += this.expresionFalsa.buildAst(nodoExpresion3);
        resultado += `${nodoTernaria} -> ${nodoExpresion3}\n`;
        resultado += `${anterior} -> ${nodoTernaria}\n`;
        return resultado;
    }
}
exports.default = OperacionTernaria;
