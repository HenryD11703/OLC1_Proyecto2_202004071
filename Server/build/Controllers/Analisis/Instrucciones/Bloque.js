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
const Continue_1 = __importDefault(require("./Continue"));
const Return_1 = __importDefault(require("./Return"));
class Bloque extends Instruccion_1.Instruccion {
    constructor(instrucciones, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
        this.instrucciones = instrucciones;
    }
    interpretar(arbolS, tabla) {
        for (let instruccion of this.instrucciones) {
            if (instruccion instanceof Break_1.default)
                return instruccion;
            if (instruccion instanceof Continue_1.default)
                return instruccion;
            if (instruccion instanceof Return_1.default)
                return instruccion;
            let result = instruccion.interpretar(arbolS, tabla);
            if (result instanceof Errores_1.default)
                return result;
        }
    }
    /**
     * bloqueCodigo : LLAVEI codigos LLAVED { $$ = new Bloque.default($2, @1.first_line, @1.first_column); }
             | LLAVEI LLAVED          { $$ = new Bloque.default([], @1.first_line, @1.first_column); }
;
     */
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let nodoBloqueCodigo = `n${contador.get()}`;
        let nodoLlaveI = `n${contador.get()}`;
        let nodoLlaveD = `n${contador.get()}`;
        let nodoCodigos = `n${contador.get()}`;
        let resultado = `${nodoBloqueCodigo}[label="Bloque"]\n`;
        resultado += `${nodoLlaveI}[label="{"]\n`;
        resultado += `${nodoBloqueCodigo} -> ${nodoLlaveI}\n`;
        resultado += `${nodoCodigos}[label="Instrucciones"]\n`;
        for (let instruccion of this.instrucciones) {
            resultado += instruccion.buildAst(nodoCodigos);
        }
        resultado += `${nodoBloqueCodigo} -> ${nodoCodigos}\n`;
        resultado += `${nodoLlaveD}[label="}"]\n`;
        resultado += `${nodoBloqueCodigo} -> ${nodoLlaveD}\n`;
        resultado += `${anterior} -> ${nodoBloqueCodigo}\n`;
        return resultado;
    }
}
exports.default = Bloque;
