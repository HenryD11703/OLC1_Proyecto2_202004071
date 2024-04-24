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
const Nativo_1 = __importDefault(require("../Expresiones/Nativo"));
const TablaSimbolos_1 = __importDefault(require("../SimboloC/TablaSimbolos"));
const Tipo_1 = __importStar(require("../SimboloC/Tipo"));
const Declaracion_1 = __importDefault(require("./Declaracion"));
const Funcion_1 = __importDefault(require("./Funcion"));
const Return_1 = __importDefault(require("./Return"));
const Contador_1 = __importDefault(require("../SimboloC/Contador"));
class Llamada extends Instruccion_1.Instruccion {
    constructor(id, parametros, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
        this.id = id;
        this.parametros = parametros;
    }
    interpretar(ArbolS, tabla) {
        let buscarFuncion = ArbolS.getFuncion(this.id);
        if (buscarFuncion == null) {
            ArbolS.createAndAddError(ArbolS, 'Semantico', `La función ${this.id} no existe`, this.Linea, this.Columna);
            return new Errores_1.default('Semantico', `La función ${this.id} no existe`, this.Linea, this.Columna);
        }
        if (buscarFuncion instanceof Funcion_1.default) {
            let newTabla = new TablaSimbolos_1.default(tabla);
            newTabla.setNombre("Llamada de función" + this.id);
            if (buscarFuncion.parametros.length != this.parametros.length) {
                ArbolS.createAndAddError(ArbolS, 'Semantico', `La función ${this.id} necesita ${buscarFuncion.parametros.length} parámetros`, this.Linea, this.Columna);
                return new Errores_1.default('Semantico', `La función ${this.id} necesita ${buscarFuncion.parametros.length} parámetros`, this.Linea, this.Columna);
            }
            for (let i = 0; i < buscarFuncion.parametros.length; i++) {
                let declaracionParametro = new Declaracion_1.default(buscarFuncion.parametros[i].tipo, this.Linea, this.Columna, [buscarFuncion.parametros[i].id]);
                let valor;
                if (buscarFuncion.parametros[i].arreglo) {
                    // El parámetro es un arreglo
                    valor = this.parametros[i].interpretar(ArbolS, tabla);
                }
                else {
                    // El parámetro es un valor normal
                    valor = this.parametros[i].interpretar(ArbolS, tabla);
                    if (valor instanceof Errores_1.default)
                        return valor;
                }
                let resultado = declaracionParametro.interpretar(ArbolS, newTabla);
                if (resultado instanceof Errores_1.default)
                    return resultado;
                let variable = newTabla.getVariable(buscarFuncion.parametros[i].id);
                if (variable == null) {
                    ArbolS.createAndAddError(ArbolS, 'Semantico', `La variable ${buscarFuncion.parametros[i].id} no existe`, this.Linea, this.Columna);
                    return new Errores_1.default('Semantico', `La variable ${buscarFuncion.parametros[i].id} no existe`, this.Linea, this.Columna);
                }
                if (!buscarFuncion.parametros[i].arreglo && variable.getTipoSimbolo().getTipo() != this.parametros[i].Tipo.getTipo()) {
                    ArbolS.createAndAddError(ArbolS, 'Semantico', `El tipo de la variable ${buscarFuncion.parametros[i].id} no coincide con el tipo del parámetro`, this.Linea, this.Columna);
                    return new Errores_1.default('Semantico', `El tipo de la variable ${buscarFuncion.parametros[i].id} no coincide con el tipo del parámetro`, this.Linea, this.Columna);
                }
                variable.setValor(valor);
            }
            let resultadoFuncion = buscarFuncion.interpretar(ArbolS, newTabla);
            if (resultadoFuncion instanceof Return_1.default) {
                let result = resultadoFuncion.interpretar(ArbolS, newTabla);
                if (result instanceof Nativo_1.default) {
                    this.Tipo.setTipo(result.Tipo.getTipo());
                    result.Tipo.setTipo(buscarFuncion.Tipo.getTipo());
                    return result.interpretar(ArbolS, tabla);
                }
            }
            if (resultadoFuncion instanceof Errores_1.default)
                return resultadoFuncion;
        }
    }
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let nodoRaiz = `n${contador.get()}`;
        let nodoLlamada = `n${contador.get()}`;
        let nodoId = `n${contador.get()}`;
        let nodoParentesisI = `n${contador.get()}`;
        let nodoParametros = null;
        let nodoParentesisD = `n${contador.get()}`;
        let resultado = `${nodoRaiz}[label="Funcion llamada"]\n`;
        resultado += `${anterior} -> ${nodoRaiz}\n`;
        resultado += `${nodoLlamada}[label="Llamada"]\n`;
        resultado += `${nodoRaiz} -> ${nodoLlamada}\n`;
        resultado += `${nodoId}[label="${this.id}"]\n`;
        resultado += `${nodoLlamada} -> ${nodoId}\n`;
        resultado += `${nodoParentesisI}[label="("]\n`;
        resultado += `${nodoLlamada} -> ${nodoParentesisI}\n`;
        if (this.parametros.length > 0) {
            nodoParametros = `n${contador.get()}`;
            resultado += `${nodoParametros}[label="Parámetros"]\n`;
            resultado += `${nodoLlamada} -> ${nodoParametros}\n`;
            for (let parametro of this.parametros) {
                let nodoParametro = `n${contador.get()}`;
                resultado += `${nodoParametro}[label="Parámetro"]\n`;
                resultado += `${nodoParametros} -> ${nodoParametro}\n`;
                resultado += parametro.buildAst(`${nodoParametro}`);
            }
        }
        resultado += `${nodoParentesisD}[label=")"]\n`;
        resultado += `${nodoLlamada} -> ${nodoParentesisD}\n`;
        return resultado;
    }
}
exports.default = Llamada;
