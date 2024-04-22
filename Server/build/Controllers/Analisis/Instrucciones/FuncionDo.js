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
class FuncionDo extends Instruccion_1.Instruccion {
    constructor(instrucciones, condicion, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
        this.instrucciones = instrucciones;
        this.condicion = condicion;
    }
    interpretar(ArbolS, tabla) {
        let newTabla = new TablaSimbolos_1.default(tabla);
        newTabla.setNombre("Bloque Do-While");
        for (let instruccion of this.instrucciones) {
            if (instruccion instanceof Break_1.default)
                return;
            if (instruccion instanceof Continue_1.default)
                break;
            let result = instruccion.interpretar(ArbolS, newTabla);
            if (result instanceof Continue_1.default)
                break;
            if (result instanceof Break_1.default)
                return;
            if (result instanceof Errores_1.default)
                return result;
        }
        let condicionResultado = this.condicion.interpretar(ArbolS, newTabla);
        if (condicionResultado instanceof Errores_1.default)
            return condicionResultado;
        if (this.condicion.Tipo.getTipo() !== Tipo_1.TipoDato.BOOLEANO) {
            return new Errores_1.default('Semantico', `La condición del do-while tiene que ser de tipo BOOLEAN`, this.Linea, this.Columna);
        }
        // Y ya después se evalúa la condición y se ejecuta el bloque de código mientras se cumpla la condición
        while (this.condicion.interpretar(ArbolS, newTabla)) {
            newTabla = new TablaSimbolos_1.default(tabla);
            newTabla.setNombre("Bloque Do-While");
            for (let instruccion of this.instrucciones) {
                if (instruccion instanceof Break_1.default)
                    return;
                if (instruccion instanceof Continue_1.default)
                    break;
                if (instruccion instanceof Return_1.default)
                    return instruccion;
                let result = instruccion.interpretar(ArbolS, newTabla);
                if (result instanceof Break_1.default)
                    return;
                if (result instanceof Continue_1.default)
                    break;
                if (result instanceof Errores_1.default)
                    return result;
                if (result instanceof Return_1.default)
                    return result;
            }
            condicionResultado = this.condicion.interpretar(ArbolS, newTabla);
            if (condicionResultado instanceof Errores_1.default)
                return condicionResultado;
        }
    }
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let nodoRaiz = `n${contador.get()}`;
        let nodoDoWhile = `n${contador.get()}`;
        let nodoBloque = `n${contador.get()}`;
        let nodoCondicion = `n${contador.get()}`;
        let nodoIgual = `n${contador.get()}`;
        let nodoLlaveI = `n${contador.get()}`;
        let nodoLlaveD = `n${contador.get()}`;
        let resultado = `${nodoRaiz}[label="Raiz"]\n`;
        resultado += `${anterior} -> ${nodoRaiz}\n`;
        resultado += `${nodoDoWhile}[label="Do-While"]\n`;
        resultado += `${nodoRaiz} -> ${nodoDoWhile}\n`;
        resultado += `${nodoLlaveI}[label="{"]\n`;
        resultado += `${nodoDoWhile} -> ${nodoLlaveI}\n`;
        resultado += `${nodoBloque}[label="Bloque de Instrucciones"]\n`;
        resultado += `${nodoDoWhile} -> ${nodoBloque}\n`;
        for (let instruccion of this.instrucciones) {
            resultado += instruccion.buildAst(`${nodoBloque}`);
        }
        resultado += `${nodoLlaveD}[label="}"]\n`;
        resultado += `${nodoDoWhile} -> ${nodoLlaveD}\n`;
        resultado += `${nodoIgual}[label="while"]\n`;
        resultado += `${nodoDoWhile} -> ${nodoIgual}\n`;
        resultado += `${nodoCondicion}[label="Condición"]\n`;
        resultado += `${nodoDoWhile} -> ${nodoCondicion}\n`;
        resultado += this.condicion.buildAst(`${nodoCondicion}`);
        return resultado;
    }
}
exports.default = FuncionDo;
