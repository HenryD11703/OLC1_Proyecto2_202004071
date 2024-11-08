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
const TablaSimbolos_1 = __importDefault(require("../SimboloC/TablaSimbolos"));
const Tipo_1 = __importStar(require("../SimboloC/Tipo"));
const Break_1 = __importDefault(require("./Break"));
const Continue_1 = __importDefault(require("./Continue"));
const Return_1 = __importDefault(require("./Return"));
class FuncionSwitch extends Instruccion_1.Instruccion {
    constructor(expresion, casos, casoDefault, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
        this.expresion = expresion;
        this.casos = casos;
        this.casoDefault = casoDefault;
    }
    interpretar(ArbolS, tabla) {
        const valorExpresion = this.expresion.interpretar(ArbolS, tabla);
        if (valorExpresion instanceof Errores_1.default)
            return valorExpresion;
        let newTabla = new TablaSimbolos_1.default(tabla);
        newTabla.setNombre("Switch");
        if (this.casos !== null) {
            for (const caso of this.casos) {
                const valorCaso = caso.expresion.interpretar(ArbolS, newTabla);
                if (valorCaso instanceof Errores_1.default)
                    return valorCaso;
                if (valorExpresion === valorCaso) {
                    const resultCaso = caso.interpretar(ArbolS, newTabla);
                    if (resultCaso instanceof Errores_1.default)
                        return resultCaso;
                    if (resultCaso instanceof Break_1.default)
                        return resultCaso;
                    if (resultCaso instanceof Continue_1.default)
                        return resultCaso;
                    if (resultCaso instanceof Return_1.default)
                        return resultCaso;
                    break;
                }
            }
        }
        if (this.casoDefault !== null) {
            let resultDefault = this.casoDefault.interpretar(ArbolS, newTabla);
            if (resultDefault instanceof Errores_1.default)
                return resultDefault;
            if (resultDefault instanceof Break_1.default)
                return resultDefault;
            if (resultDefault instanceof Continue_1.default)
                return resultDefault;
            if (resultDefault instanceof Return_1.default)
                return resultDefault;
        }
        return null;
    }
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let nodoRaiz = `n${contador.get()}`;
        let nodoSwitch = `n${contador.get()}`;
        let nodoExpresion = `n${contador.get()}`;
        let nodoLlaveI = `n${contador.get()}`;
        let nodoCasos = null;
        let nodoDefault = null;
        let resultado = `${nodoRaiz}[label="Raiz"]\n`;
        resultado += `${anterior} -> ${nodoRaiz}\n`;
        resultado += `${nodoSwitch}[label="Switch"]\n`;
        resultado += `${nodoRaiz} -> ${nodoSwitch}\n`;
        resultado += `${nodoExpresion}[label="Expresión"]\n`;
        resultado += `${nodoSwitch} -> ${nodoExpresion}\n`;
        resultado += this.expresion.buildAst(`${nodoExpresion}`);
        resultado += `${nodoLlaveI}[label="{"]\n`;
        resultado += `${nodoSwitch} -> ${nodoLlaveI}\n`;
        if (this.casos !== null) {
            nodoCasos = `n${contador.get()}`;
            resultado += `${nodoCasos}[label="Casos"]\n`;
            resultado += `${nodoSwitch} -> ${nodoCasos}\n`;
            for (let caso of this.casos) {
                let nodoCaso = `n${contador.get()}`;
                resultado += `${nodoCaso}[label="Caso"]\n`;
                resultado += `${nodoCasos} -> ${nodoCaso}\n`;
                resultado += caso.buildAst(`${nodoCaso}`);
            }
        }
        if (this.casoDefault !== null) {
            nodoDefault = `n${contador.get()}`;
            resultado += `${nodoDefault}[label="Default"]\n`;
            resultado += `${nodoSwitch} -> ${nodoDefault}\n`;
            resultado += this.casoDefault.buildAst(`${nodoDefault}`);
        }
        let nodoLlaveD = `n${contador.get()}`;
        resultado += `${nodoLlaveD}[label="}"]\n`;
        resultado += `${nodoSwitch} -> ${nodoLlaveD}\n`;
        return resultado;
    }
}
exports.default = FuncionSwitch;
