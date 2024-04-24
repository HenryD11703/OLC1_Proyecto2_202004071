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
const Break_1 = __importDefault(require("./Break"));
class Caso extends Instruccion_1.Instruccion {
    constructor(expresion, instrucciones, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }
    interpretar(ArbolS, tabla) {
        //Casos para el switch
        if (this.expresion != null) {
            let valorExpresion = this.expresion.interpretar(ArbolS, tabla);
            if (valorExpresion instanceof Errores_1.default) {
                ArbolS.createAndAddError(ArbolS, 'Semantico', valorExpresion.toString(), this.Linea, this.Columna);
                return valorExpresion;
            }
            let valorExp = valorExpresion;
            for (let instruccion of this.instrucciones) {
                if (instruccion instanceof Break_1.default)
                    return instruccion;
                let result = instruccion.interpretar(ArbolS, tabla);
                if (result instanceof Errores_1.default)
                    return result;
            }
        }
    }
    //caso : CASE expresion DOSPUNTOS codigos
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let nodoCaso = `n${contador.get()}`;
        let nodoCase = `n${contador.get()}`;
        let nodoExpresion = `n${contador.get()}`;
        let nodoDosPuntos = `n${contador.get()}`;
        let nodoCodigos = `n${contador.get()}`;
        let resultado = `${nodoCaso}[label="Caso"]\n`;
        resultado += `${nodoCase}[label="CASE"]\n`;
        resultado += `${nodoCaso} -> ${nodoCase}\n`;
        resultado += `${nodoExpresion}[label="Expresion"]\n`;
        resultado += this.expresion.buildAst(nodoExpresion);
        resultado += `${nodoCaso} -> ${nodoExpresion}\n`;
        resultado += `${nodoDosPuntos}[label=":"]\n`;
        resultado += `${nodoCaso} -> ${nodoDosPuntos}\n`;
        resultado += `${nodoCodigos}[label="Instrucciones"]\n`;
        for (let instruccion of this.instrucciones) {
            resultado += instruccion.buildAst(nodoCodigos);
        }
        resultado += `${nodoCaso} -> ${nodoCodigos}\n`;
        resultado += `${anterior} -> ${nodoCaso}\n`;
        return resultado;
    }
}
exports.default = Caso;
