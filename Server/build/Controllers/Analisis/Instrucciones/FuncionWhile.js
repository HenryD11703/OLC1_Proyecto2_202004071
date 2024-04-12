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
const Break_1 = __importDefault(require("./Break"));
const Continue_1 = __importDefault(require("./Continue"));
const Return_1 = __importDefault(require("./Return"));
class FuncionWhile extends Instruccion_1.Instruccion {
    constructor(condicion, instrucciones, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.Instrucciones = instrucciones;
    }
    interpretar(ArbolS, tabla) {
        let condicionResultado = this.condicion.interpretar(ArbolS, tabla);
        if (condicionResultado instanceof Errores_1.default)
            return condicionResultado;
        if (this.condicion.Tipo.getTipo() !== Tipo_1.TipoDato.BOOLEANO) {
            return new Errores_1.default('Semantico', `La condicion del while tiene que ser de tipo BOOLEAN`, this.Linea, this.Columna);
        }
        while (this.condicion.interpretar(ArbolS, tabla)) {
            let newTabla2 = new TablaSimbolos_1.default(tabla);
            newTabla2.setNombre("Bloque While");
            for (let instruccion of this.Instrucciones) {
                if (instruccion instanceof Break_1.default)
                    return;
                if (instruccion instanceof Continue_1.default)
                    break;
                if (instruccion instanceof Return_1.default)
                    return instruccion;
                let result = instruccion.interpretar(ArbolS, newTabla2);
                if (result instanceof Break_1.default)
                    return;
                if (result instanceof Continue_1.default)
                    break;
                if (result instanceof Return_1.default)
                    return result;
                if (result instanceof Errores_1.default)
                    return result;
            }
        }
    }
}
exports.default = FuncionWhile;