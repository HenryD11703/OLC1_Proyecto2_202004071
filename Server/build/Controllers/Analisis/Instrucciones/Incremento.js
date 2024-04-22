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
class Incremento extends Instruccion_1.Instruccion {
    constructor(id, tipo, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
        this.id = id;
        this.tipo = tipo;
    }
    interpretar(arbolS, tabla) {
        const valor = tabla.getVariable(this.id.toLowerCase());
        if (valor == null)
            return new Errores_1.default('Semantico', `La variable ${this.id} no existe`, this.Linea, this.Columna);
        if (this.tipo == '++') {
            if (valor.getTipoSimbolo().getTipo() == Tipo_1.TipoDato.ENTERO) {
                valor.setValor(parseInt(valor.getValor().toString()) + 1);
            }
            else if (valor.getTipoSimbolo().getTipo() == Tipo_1.TipoDato.DECIMAL) {
                valor.setValor(parseFloat(valor.getValor().toString()) + 1);
            }
            else {
                return new Errores_1.default('Semantico', `No se puede incrementar un tipo de dato ${valor.getTipoSimbolo().getTipo()}`, this.Linea, this.Columna);
            }
        }
        else {
            if (valor.getTipoSimbolo().getTipo() == Tipo_1.TipoDato.ENTERO) {
                valor.setValor(parseInt(valor.getValor().toString()) - 1);
            }
            else if (valor.getTipoSimbolo().getTipo() == Tipo_1.TipoDato.DECIMAL) {
                valor.setValor(parseFloat(valor.getValor().toString()) - 1);
            }
            else {
                return new Errores_1.default('Semantico', `No se puede decrementar un tipo de dato ${valor.getTipoSimbolo().getTipo()}`, this.Linea, this.Columna);
            }
        }
    }
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let nodoRaiz = `n${contador.get()}`;
        let nodoIncremento = `n${contador.get()}`;
        let nodoId = `n${contador.get()}`;
        let nodoTipo = `n${contador.get()}`;
        let resultado = `${nodoRaiz}[label="Raiz"]\n`;
        resultado += `${anterior} -> ${nodoRaiz}\n`;
        resultado += `${nodoIncremento}[label="Incremento/Decremento"]\n`;
        resultado += `${nodoRaiz} -> ${nodoIncremento}\n`;
        resultado += `${nodoId}[label="${this.id}"]\n`;
        resultado += `${nodoIncremento} -> ${nodoId}\n`;
        resultado += `${nodoTipo}[label="${this.tipo}"]\n`;
        resultado += `${nodoIncremento} -> ${nodoTipo}\n`;
        return resultado;
    }
}
exports.default = Incremento;
