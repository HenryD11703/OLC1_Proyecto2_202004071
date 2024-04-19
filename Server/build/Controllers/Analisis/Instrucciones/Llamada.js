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
const Declaracion_1 = __importDefault(require("./Declaracion"));
const Funcion_1 = __importDefault(require("./Funcion"));
class Llamada extends Instruccion_1.Instruccion {
    constructor(id, parametros, linea, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), linea, columna);
        this.id = id;
        this.parametros = parametros;
    }
    interpretar(ArbolS, tabla) {
        let buscarFuncion = ArbolS.getFuncion(this.id);
        if (buscarFuncion == null) {
            return new Errores_1.default('Semantico', `La función ${this.id} no existe`, this.Linea, this.Columna);
        }
        if (buscarFuncion instanceof Funcion_1.default) {
            let newTabla = new TablaSimbolos_1.default(ArbolS.getTablaGlobal());
            newTabla.setNombre("Llamada de función" + this.id);
            if (buscarFuncion.parametros.length != this.parametros.length) {
                return new Errores_1.default('Semantico', `La función ${this.id} necesita ${buscarFuncion.parametros.length} parámetros`, this.Linea, this.Columna);
            }
            for (let i = 0; i < buscarFuncion.parametros.length; i++) {
                let declaracionParametro = new Declaracion_1.default(buscarFuncion.parametros[i].tipo, this.Linea, this.Columna, buscarFuncion.parametros[i].id, this.parametros[i]);
                let resultado = declaracionParametro.interpretar(ArbolS, newTabla);
                if (resultado instanceof Errores_1.default)
                    return resultado;
            }
            let resultadoFuncion = buscarFuncion.interpretar(ArbolS, newTabla);
            if (resultadoFuncion instanceof Errores_1.default)
                return resultadoFuncion;
        }
    }
}
exports.default = Llamada;
