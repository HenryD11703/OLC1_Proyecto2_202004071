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
exports.TipoCasteo = void 0;
const Instruccion_1 = require("../Abstracto/Instruccion");
const Tipo_1 = __importStar(require("../SimboloC/Tipo"));
const Errores_1 = __importDefault(require("../Excepciones/Errores"));
class Casteos extends Instruccion_1.Instruccion {
    constructor(TipoCast, valor, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
        this.TipoCast = TipoCast;
        this.valor = valor;
    }
    interpretar(arbolS, tabla) {
        const valor = this.valor.interpretar(arbolS, tabla);
        if (valor instanceof Errores_1.default)
            return valor;
        switch (this.TipoCast) {
            case TipoCasteo.aENTERO:
                return this.aEntero(valor);
            case TipoCasteo.aDECIMAL:
                return this.aDecimal(valor);
            case TipoCasteo.aCADENA:
                return this.aCadena(valor);
            case TipoCasteo.aCARACTER:
                return this.aCaracter(valor);
            default:
                return new Errores_1.default('Semantico', `Casteo de Tipo invalido`, this.Linea, this.Columna);
        }
    }
    aEntero(valor) {
        let TipoV = this.valor.Tipo.getTipo();
        switch (TipoV) {
            //Si es un entero se retorna el mismo valor
            case Tipo_1.TipoDato.ENTERO:
                this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.ENTERO);
                return valor;
            //Si es un decimal se convierte a entero
            case Tipo_1.TipoDato.DECIMAL:
                this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.ENTERO);
                return Math.floor(valor);
            //Si es un caracter se convierte a entero
            case Tipo_1.TipoDato.CARACTER:
                this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.ENTERO);
                return valor.charCodeAt(0);
            //Los demas tipos de datos no se pueden convertir a entero
            case Tipo_1.TipoDato.BOOLEANO:
                return new Errores_1.default('Semantico', `No se puede convertir un booleano a entero`, this.Linea, this.Columna);
            case Tipo_1.TipoDato.CADENA:
                return new Errores_1.default('Semantico', `No se puede convertir una cadena a entero`, this.Linea, this.Columna);
            default:
                return new Errores_1.default('Semantico', `Tipo de dato no valido`, this.Linea, this.Columna);
        }
    }
    aDecimal(valor) {
        let TipoV = this.valor.Tipo.getTipo();
        switch (TipoV) {
            //Si es un decimal se retorna el mismo valor
            case Tipo_1.TipoDato.DECIMAL:
                this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                return valor;
            //Si es un entero se convierte a decimal
            case Tipo_1.TipoDato.ENTERO:
                this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                return parseFloat(valor);
            //Si es un caracter se convierte a decimal
            case Tipo_1.TipoDato.CARACTER:
                this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                return parseFloat(valor.charCodeAt(0));
            //Los demas tipos de datos no se pueden convertir a decimal
            case Tipo_1.TipoDato.BOOLEANO:
                return new Errores_1.default('Semantico', `No se puede convertir un booleano a decimal`, this.Linea, this.Columna);
            case Tipo_1.TipoDato.CADENA:
                return new Errores_1.default('Semantico', `No se puede convertir una cadena a decimal`, this.Linea, this.Columna);
            default:
                return new Errores_1.default('Semantico', `Tipo de dato no valido`, this.Linea, this.Columna);
        }
    }
    aCadena(valor) {
        let TipoV = this.valor.Tipo.getTipo();
        switch (TipoV) {
            case Tipo_1.TipoDato.CADENA:
                this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.CADENA);
                return valor;
            //Si es un entero se convierte a cadena
            case Tipo_1.TipoDato.ENTERO:
                this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.CADENA);
                return valor.toString();
            //Si es un decimal se convierte a cadena
            case Tipo_1.TipoDato.DECIMAL:
                this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.CADENA);
                return valor.toString();
            //Los demas tipos de datos no se pueden convertir a cadena
            case Tipo_1.TipoDato.BOOLEANO:
                return new Errores_1.default('Semantico', `No se puede convertir un booleano a cadena`, this.Linea, this.Columna);
            case Tipo_1.TipoDato.CARACTER:
                return new Errores_1.default('Semantico', `No se puede convertir un caracter a cadena`, this.Linea, this.Columna);
            default:
                return new Errores_1.default('Semantico', `Tipo de dato no valido`, this.Linea, this.Columna);
        }
    }
    aCaracter(valor) {
        let TipoV = this.valor.Tipo.getTipo();
        switch (TipoV) {
            //Solo se puede convertir un entero a caracter
            case Tipo_1.TipoDato.ENTERO:
                this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.CARACTER);
                return String.fromCharCode(valor);
            //Los demas tipos de datos no se pueden convertir a caracter
            case Tipo_1.TipoDato.DECIMAL:
                return new Errores_1.default('Semantico', `No se puede convertir un decimal a caracter`, this.Linea, this.Columna);
            case Tipo_1.TipoDato.BOOLEANO:
                return new Errores_1.default('Semantico', `No se puede convertir un booleano a caracter`, this.Linea, this.Columna);
            case Tipo_1.TipoDato.CADENA:
                return new Errores_1.default('Semantico', `No se puede convertir una cadena a caracter`, this.Linea, this.Columna);
            case Tipo_1.TipoDato.CARACTER:
                this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.CARACTER);
                return valor;
            default:
                return new Errores_1.default('Semantico', `Tipo de dato no valido`, this.Linea, this.Columna);
        }
    }
}
exports.default = Casteos;
var TipoCasteo;
(function (TipoCasteo) {
    TipoCasteo[TipoCasteo["aENTERO"] = 0] = "aENTERO";
    TipoCasteo[TipoCasteo["aDECIMAL"] = 1] = "aDECIMAL";
    TipoCasteo[TipoCasteo["aCADENA"] = 2] = "aCADENA";
    TipoCasteo[TipoCasteo["aCARACTER"] = 3] = "aCARACTER";
})(TipoCasteo || (exports.TipoCasteo = TipoCasteo = {}));
