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
const Contador_1 = __importDefault(require("../SimboloC/Contador"));
const Tipo_1 = __importStar(require("../SimboloC/Tipo"));
class Continue extends Instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
    }
    interpretar(ArbolS, tabla) {
        return;
    }
    //funcionContinue : CONTINUE PYC
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let funcionContinue = `n${contador.get()}`;
        let nodoContinue = `n${contador.get()}`;
        let nodoPyc = `n${contador.get()}`;
        let resultado = `${funcionContinue}[label="Continue"]\n`;
        resultado += `${nodoContinue}[label="CONTINUE"]\n`;
        resultado += `${funcionContinue} -> ${nodoContinue}\n`;
        resultado += `${nodoPyc}[label=";"]\n`;
        resultado += `${funcionContinue} -> ${nodoPyc}\n`;
        resultado += `${anterior} -> ${funcionContinue}\n`;
        return resultado;
    }
}
exports.default = Continue;
