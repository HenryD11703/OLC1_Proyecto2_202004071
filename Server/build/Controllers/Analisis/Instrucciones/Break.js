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
class Break extends Instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
    }
    interpretar(ArbolS, tabla) {
        return;
    }
    //funcionBreak : BREAK PYC 
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let funcionBreak = `n${contador.get()}`;
        let nodoBreak = `n${contador.get()}`;
        let nodoPyc = `n${contador.get()}`;
        let resultado = `${funcionBreak}[label="Break"]\n`;
        resultado += `${nodoBreak}[label="BREAK"]\n`;
        resultado += `${funcionBreak} -> ${nodoBreak}\n`;
        resultado += `${nodoPyc}[label=";"]\n`;
        resultado += `${funcionBreak} -> ${nodoPyc}\n`;
        resultado += `${anterior} -> ${funcionBreak}\n`;
        return resultado;
    }
}
exports.default = Break;
