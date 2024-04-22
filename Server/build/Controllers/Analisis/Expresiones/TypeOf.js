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
class TypeOf extends Instruccion_1.Instruccion {
    constructor(expresion, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.CADENA), linea, columna);
        this.expresion = expresion;
    }
    interpretar(ArbolS, tabla) {
        let resultado = this.expresion.interpretar(ArbolS, tabla);
        let TipoResultado = this.expresion.Tipo.getTipo();
        if (resultado instanceof Errores_1.default)
            return resultado;
        //aca retorna un numero basado en el tipo de dato que se le pase
        //0 = entero, 1 = decimal, 2 = cadena, 3 = booleano, 4 = caracter, 5 = cadena, 6 = void
        if (Array.isArray(resultado)) {
            return "Vector";
        }
        switch (TipoResultado) {
            case Tipo_1.TipoDato.ENTERO:
                return "Entero";
            case Tipo_1.TipoDato.DECIMAL:
                return "Decimal";
            case Tipo_1.TipoDato.CADENA:
                return "Cadena";
            case Tipo_1.TipoDato.BOOLEANO:
                return "Booleano";
            case Tipo_1.TipoDato.CARACTER:
                return "Caracter";
            case Tipo_1.TipoDato.VOID:
                return "Void";
            default:
                return new Errores_1.default('Semantico', `No se puede obtener el tipo de un valor de tipo ${this.expresion.Tipo.getTipo()}`, this.Linea, this.Columna);
        }
    }
    //funcionTypeOf: TYPEOF PARENTESISI expresion PARENTESISD 
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let funcionTypeOf = `n${contador.get()}`;
        let nodoTypeOf = `n${contador.get()}`;
        let nodoParentesisI = `n${contador.get()}`;
        let nodoExpresion = `n${contador.get()}`;
        let nodoParentesisD = `n${contador.get()}`;
        let resultado = `${funcionTypeOf}[label="TypeOf"]\n`;
        resultado += `${nodoTypeOf}[label="TYPEOF"]\n`;
        resultado += `${funcionTypeOf} -> ${nodoTypeOf}\n`;
        resultado += `${nodoParentesisI}[label="("]\n`;
        resultado += `${funcionTypeOf} -> ${nodoParentesisI}\n`;
        resultado += `${nodoExpresion}[label="Expresion"]\n`;
        resultado += this.expresion.buildAst(nodoExpresion);
        resultado += `${funcionTypeOf} -> ${nodoExpresion}\n`;
        resultado += `${nodoParentesisD}[label=")"]\n`;
        resultado += `${funcionTypeOf} -> ${nodoParentesisD}\n`;
        resultado += `${anterior} -> ${funcionTypeOf}\n`;
        return resultado;
    }
}
exports.default = TypeOf;
