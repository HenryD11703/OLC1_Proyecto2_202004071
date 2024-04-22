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
class VariablesA extends Instruccion_1.Instruccion {
    constructor(ids, exp, fila, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), fila, columna);
        this.ids = ids;
        this.exp = exp;
    }
    interpretar(ArbolS, tabla) {
        let NewValue = this.exp.interpretar(ArbolS, tabla);
        if (NewValue instanceof Errores_1.default)
            return NewValue;
        for (let id of this.ids) {
            let valor = tabla.getVariable(id.toLowerCase());
            if (valor == null)
                return new Errores_1.default('Semantico', `La variable ${id} no existe`, this.Linea, this.Columna);
            if (this.exp.Tipo.getTipo() != valor.getTipoSimbolo().getTipo())
                return new Errores_1.default('Semantico', `El tipo de dato no es igual`, this.Linea, this.Columna);
            this.Tipo = valor.getTipoSimbolo();
            valor.setValor(NewValue);
        }
    }
    //| ids IGUAL expresion               { $$ = new AsignacionVar.default($1, $3, @1.first_line, @1.first_column); }  
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let nodoVariablesA = `n${contador.get()}`;
        let nodoIds = `n${contador.get()}`;
        let nodoIGUAL = `n${contador.get()}`;
        let nodoExpresion = `n${contador.get()}`;
        let nodoPYC = `n${contador.get()}`;
        let resultado = `${nodoVariablesA}[label="VariablesA"]\n`;
        resultado += `${nodoIds}[label="IDS"]\n`;
        resultado += `${nodoVariablesA} -> ${nodoIds}\n`;
        for (let id of this.ids) {
            let nodoId = `n${contador.get()}`;
            resultado += `${nodoId}[label="${id}"]\n`;
            resultado += `${nodoIds} -> ${nodoId}\n`;
        }
        resultado += `${nodoIGUAL}[label="="]\n`;
        resultado += `${nodoVariablesA} -> ${nodoIGUAL}\n`;
        resultado += `${nodoExpresion}[label="Expresion"]\n`;
        resultado += this.exp.buildAst(nodoExpresion);
        resultado += `${nodoVariablesA} -> ${nodoExpresion}\n`;
        resultado += `${nodoPYC}[label=";"]\n`;
        resultado += `${nodoVariablesA} -> ${nodoPYC}\n`;
        resultado += `${anterior} -> ${nodoVariablesA}\n`;
        return resultado;
    }
}
exports.default = VariablesA;
