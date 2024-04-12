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
const TablaSimbolos_1 = __importDefault(require("../SimboloC/TablaSimbolos"));
const Tipo_1 = __importStar(require("../SimboloC/Tipo"));
class FuncionSwitch extends Instruccion_1.Instruccion {
    constructor(expresion, casos, defaultCase, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
        this.expresion = expresion;
        this.casos = casos;
        this.defaultCase = defaultCase;
    }
    interpretar(ArbolS, tabla) {
        let resultadoExpresion = this.expresion.interpretar(ArbolS, tabla);
        if (resultadoExpresion instanceof Errores_1.default)
            return resultadoExpresion;
        let encontrado = false;
        for (let caso of this.casos) {
            let resultadoCaso = caso.condicion.interpretar(ArbolS, tabla);
            if (resultadoCaso instanceof Errores_1.default)
                return resultadoCaso;
            if (resultadoExpresion == resultadoCaso) {
                encontrado = true;
                let nuevaTabla = new TablaSimbolos_1.default(tabla);
                nuevaTabla.setNombre("Bloque");
                caso.bloque.interpretar(ArbolS, nuevaTabla);
                break;
            }
        }
        if (!encontrado && this.defaultCase != null) {
            let nuevaTabla = new TablaSimbolos_1.default(tabla);
            nuevaTabla.setNombre("Bloque");
            this.defaultCase.interpretar(ArbolS, nuevaTabla);
        }
        return null;
    }
}
exports.default = FuncionSwitch;
class Caso {
    constructor(condicion, bloque) {
        this.condicion = condicion;
        this.bloque = bloque;
    }
}
