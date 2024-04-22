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
class AccesoVec extends Instruccion_1.Instruccion {
    constructor(id, linea, columna, numero, numero2) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
        this.id = id;
        this.numero = numero;
        this.numero2 = numero2;
    }
    interpretar(ArbolS, tabla) {
        if (this.numero2 == undefined) {
            const variable = tabla.getVariable(this.id);
            if (variable != null) {
                let simboloVar = tabla.getVariableVector(this.id, this.numero.interpretar(ArbolS, tabla));
                if (simboloVar === null) {
                    return new Errores_1.default('Semantico', `La variable ${this.id} no existe`, this.Linea, this.Columna);
                }
                this.Tipo = simboloVar.getTipoSimbolo();
                return simboloVar.getValor();
            }
        }
        else {
            const variable = tabla.getVariable(this.id);
            if (variable != null) {
                let simboloVar2 = tabla.getVariableVector2(this.id, this.numero.interpretar(ArbolS, tabla), this.numero2.interpretar(ArbolS, tabla));
                if (simboloVar2 === null) {
                    return new Errores_1.default('Semantico', `La variable ${this.id} no existe`, this.Linea, this.Columna);
                }
                this.Tipo = simboloVar2.getTipoSimbolo();
                return simboloVar2.getValor();
            }
        }
    }
    // Se creara un nodo para el AST
    // Se llamara AccesoVec y conectara con las producciones de la gramatica de AccesoVec
    /*
    Gramatica
    
accesoVector : ID CORCHETEI expresion CORCHETED { $$ = new AccesoVec.default($1, @1.first_line, @1.first_column, $3); }
             | ID CORCHETEI expresion CORCHETED CORCHETEI expresion CORCHETED { $$ = new AccesoVec.default($1, @1.first_line, @1.first_column, $3, $6); }
;
    */
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let nodoAccessVec = `n${contador.get()}`;
        let nodoID = `n${contador.get()}`;
        let nodoCorcheteI = `n${contador.get()}`;
        let nodoExpresion = `n${contador.get()}`;
        let nodoCorcheteD = `n${contador.get()}`;
        if (this.numero2) {
            let nodoCorcheteI2 = `n${contador.get()}`;
            let nodoExpresion2 = `n${contador.get()}`;
            let nodoCorcheteD2 = `n${contador.get()}`;
            let resultado = `${nodoAccessVec}[label="AccesoVec"]\n`;
            resultado += `${nodoID}[label="${this.id}"]\n`;
            resultado += `${nodoCorcheteI}[label="["]\n`;
            resultado += `${nodoExpresion}[label="Expresion"]\n`;
            resultado += `${nodoCorcheteD}[label="]"]\n`;
            resultado += `${nodoCorcheteI2}[label="["]\n`;
            resultado += `${nodoExpresion2}[label="Expresion"]\n`;
            resultado += `${nodoCorcheteD2}[label="]"]\n`;
            resultado += `${anterior} -> ${nodoAccessVec}\n`;
            resultado += `${nodoAccessVec} -> ${nodoID}\n`;
            resultado += `${nodoAccessVec} -> ${nodoCorcheteI}\n`;
            resultado += `${nodoAccessVec} -> ${nodoExpresion}\n`;
            resultado += `${nodoAccessVec} -> ${nodoCorcheteD}\n`;
            resultado += `${nodoAccessVec} -> ${nodoCorcheteI2}\n`;
            resultado += `${nodoAccessVec} -> ${nodoExpresion2}\n`;
            resultado += `${nodoAccessVec} -> ${nodoCorcheteD2}\n`;
            resultado += this.numero.buildAst(nodoExpresion);
            resultado += this.numero2.buildAst(nodoExpresion2);
            return resultado;
        }
        let resultado = `${nodoAccessVec}[label="AccesoVec"]\n`;
        resultado += `${nodoID}[label="${this.id}"]\n`;
        resultado += `${nodoCorcheteI}[label="["]\n`;
        resultado += `${nodoExpresion}[label="Expresion"]\n`;
        resultado += `${nodoCorcheteD}[label="]"]\n`;
        resultado += `${anterior} -> ${nodoAccessVec}\n`;
        resultado += `${nodoAccessVec} -> ${nodoID}\n`;
        resultado += `${nodoAccessVec} -> ${nodoCorcheteI}\n`;
        resultado += `${nodoAccessVec} -> ${nodoExpresion}\n`;
        resultado += `${nodoAccessVec} -> ${nodoCorcheteD}\n`;
        resultado += this.numero.buildAst(nodoExpresion);
        return resultado;
    }
}
exports.default = AccesoVec;
