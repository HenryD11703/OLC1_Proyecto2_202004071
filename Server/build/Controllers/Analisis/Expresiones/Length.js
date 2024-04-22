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
class Length extends Instruccion_1.Instruccion {
    constructor(expresion, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.ENTERO), linea, columna);
        this.expresion = expresion;
    }
    interpretar(ArbolS, tabla) {
        let resultado = this.expresion.interpretar(ArbolS, tabla);
        let TipoResultado = this.expresion.Tipo.getTipo();
        if (resultado instanceof Errores_1.default)
            return resultado;
        if (Array.isArray(resultado)) {
            return resultado.length;
        }
        else if (TipoResultado == Tipo_1.TipoDato.CADENA) {
            return resultado.length;
        }
        else {
            return new Errores_1.default('Semantico', `No se puede obtener la longitud de un valor de tipo ${this.expresion.Tipo.getTipo()}`, this.Linea, this.Columna);
        }
    }
    //funcionLength: ID PUNTO LENGTH PARENTESISI PARENTESISD { $$ = new Length.default(new AccesoVar.default($1, @1.first_line, @1.first_column), @1.first_line, @1.first_column); }
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let nodoLength = `n${contador.get()}`;
        let nodoID = `n${contador.get()}`;
        let nodoPunto = `n${contador.get()}`;
        let Length = `n${contador.get()}`;
        let nodoParentesisI = `n${contador.get()}`;
        let nodoParentesisD = `n${contador.get()}`;
        let resultado = `${nodoLength}[label="Length"]\n`;
        //como ID proviene de AccesoVar se llama a su metodo buildAst
        resultado += this.expresion.buildAst(nodoID);
        resultado += `${nodoID}[label="ID"]\n`;
        resultado += `${nodoLength} -> ${nodoID}\n`;
        resultado += `${nodoPunto}[label="."]`;
        resultado += `${nodoLength} -> ${nodoPunto}\n`;
        resultado += `${Length}[label="LENGTH"]\n`;
        resultado += `${nodoLength} -> ${Length}\n`;
        resultado += `${nodoParentesisI}[label="("]\n`;
        resultado += `${nodoLength} -> ${nodoParentesisI}\n`;
        resultado += `${nodoParentesisD}[label=")"]\n`;
        resultado += `${nodoLength} -> ${nodoParentesisD}\n`;
        resultado += `${anterior} -> ${nodoLength}\n`;
        return resultado;
    }
}
exports.default = Length;
