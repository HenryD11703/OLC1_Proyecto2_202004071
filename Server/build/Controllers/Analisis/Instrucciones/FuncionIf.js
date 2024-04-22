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
class FuncionIf extends Instruccion_1.Instruccion {
    constructor(condicion, bloqueIf, BloqueElse, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.bloqueIf = bloqueIf;
        this.BloqueElse = BloqueElse;
    }
    interpretar(arbolS, tabla) {
        const condicionResultado = this.condicion.interpretar(arbolS, tabla);
        if (condicionResultado instanceof Errores_1.default)
            return condicionResultado;
        let newTabla = new TablaSimbolos_1.default(tabla);
        newTabla.setNombre("Bloque");
        if (condicionResultado) {
            let result = this.bloqueIf.interpretar(arbolS, newTabla);
            if (result instanceof Errores_1.default)
                return result;
            if (result instanceof Break_1.default)
                return result;
            if (result instanceof Continue_1.default)
                return result;
            if (result instanceof Return_1.default)
                return result;
        }
        else if (this.BloqueElse != null) {
            let result = this.BloqueElse.interpretar(arbolS, newTabla);
            if (result instanceof Errores_1.default)
                return result;
            if (result instanceof Break_1.default)
                return result;
            if (result instanceof Continue_1.default)
                return result;
            if (result instanceof Return_1.default)
                return result;
        }
        return null;
    }
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let nodoRaiz = `n${contador.get()}`;
        let nodoIf = `n${contador.get()}`;
        let nodoCondicion = `n${contador.get()}`;
        let nodoLlaveIIf = `n${contador.get()}`;
        let nodoBloqueThenIf = `n${contador.get()}`;
        let nodoLlaveDIf = `n${contador.get()}`;
        let nodoElse = null;
        let nodoLlaveIElse = null;
        let nodoBloqueThenElse = null;
        let nodoLlaveDElse = null;
        let resultado = `${nodoRaiz}[label="Raiz"]\n`;
        resultado += `${anterior} -> ${nodoRaiz}\n`;
        resultado += `${nodoIf}[label="If"]\n`;
        resultado += `${nodoRaiz} -> ${nodoIf}\n`;
        resultado += `${nodoCondicion}[label="Condición"]\n`;
        resultado += `${nodoIf} -> ${nodoCondicion}\n`;
        resultado += this.condicion.buildAst(`${nodoCondicion}`);
        resultado += `${nodoLlaveIIf}[label="{"]\n`;
        resultado += `${nodoIf} -> ${nodoLlaveIIf}\n`;
        resultado += `${nodoBloqueThenIf}[label="Bloque Then"]\n`;
        resultado += `${nodoIf} -> ${nodoBloqueThenIf}\n`;
        resultado += this.bloqueIf.buildAst(`${nodoBloqueThenIf}`);
        resultado += `${nodoLlaveDIf}[label="}"]\n`;
        resultado += `${nodoIf} -> ${nodoLlaveDIf}\n`;
        if (this.BloqueElse !== null) {
            nodoElse = `n${contador.get()}`;
            nodoLlaveIElse = `n${contador.get()}`;
            nodoBloqueThenElse = `n${contador.get()}`;
            nodoLlaveDElse = `n${contador.get()}`;
            resultado += `${nodoElse}[label="Else"]\n`;
            resultado += `${nodoIf} -> ${nodoElse}\n`;
            resultado += `${nodoLlaveIElse}[label="{"]\n`;
            resultado += `${nodoElse} -> ${nodoLlaveIElse}\n`;
            resultado += `${nodoBloqueThenElse}[label="Bloque Then"]\n`;
            resultado += `${nodoElse} -> ${nodoBloqueThenElse}\n`;
            resultado += this.BloqueElse.buildAst(`${nodoBloqueThenElse}`);
            resultado += `${nodoLlaveDElse}[label="}"]\n`;
            resultado += `${nodoElse} -> ${nodoLlaveDElse}\n`;
        }
        return resultado;
    }
}
exports.default = FuncionIf;
