"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstracto/Instruccion");
const Errores_1 = __importDefault(require("../Excepciones/Errores"));
const Contador_1 = __importDefault(require("../SimboloC/Contador"));
const Simbolo_1 = __importDefault(require("../SimboloC/Simbolo"));
class DeclaracionCstr extends Instruccion_1.Instruccion {
    constructor(tipo, id, Instruccion, linea, columna) {
        super(tipo, linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.Instruccion = Instruccion;
    }
    interpretar(ArbolS, tabla) {
        let valor = this.Instruccion.interpretar(ArbolS, tabla);
        if (valor instanceof Errores_1.default)
            return valor;
        let valorC = valor.split('');
        for (let Identificador of this.id) {
            if (!tabla.setVariable(new Simbolo_1.default(this.tipo, Identificador, valorC))) {
                return new Errores_1.default('Semantico', 'Ya existe una variable con el mismo nombre', this.Linea, this.Columna);
            }
        }
    }
    // | tipo ids CORCHETEI CORCHETED IGUAL funcioncstr PYC { $$ = new DeclaracionCstr.default($1,$2,$6,@1.first_line,@1.first_column); }
    //funcioncstr : expresion C_STR PARENTESISI PARENTESISD
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let funcionDeclaracion = `n${contador.get()}`;
        let nodoTipo = `n${contador.get()}`;
        let nodoIds = `n${contador.get()}`;
        let nodoCorcheteI = `n${contador.get()}`;
        let nodoCorcheteD = `n${contador.get()}`;
        let nodoIgual = `n${contador.get()}`;
        let nodoFuncionCstr = `n${contador.get()}`;
        let nodoExpresion = `n${contador.get()}`;
        let resultado = `${funcionDeclaracion}[label="Declaracion"]\n`;
        resultado += `${nodoTipo}[label="${this.tipo.getTipo().toString()}"]\n`;
        resultado += `${funcionDeclaracion} -> ${nodoTipo}\n`;
        resultado += `${nodoIds}[label="Ids"]\n`;
        for (let id of this.id) {
            resultado += `${nodoIds} -> n${contador.get()}[label="${id}"]\n`;
        }
        resultado += `${funcionDeclaracion} -> ${nodoIds}\n`;
        resultado += `${nodoCorcheteI}[label="["]\n`;
        resultado += `${funcionDeclaracion} -> ${nodoCorcheteI}\n`;
        resultado += `${nodoCorcheteD}[label="]"]\n`;
        resultado += `${funcionDeclaracion} -> ${nodoCorcheteD}\n`;
        resultado += `${nodoIgual}[label="="]\n`;
        resultado += `${funcionDeclaracion} -> ${nodoIgual}\n`;
        resultado += `${nodoFuncionCstr}[label="FuncionCstr"]\n`;
        resultado += `${funcionDeclaracion} -> ${nodoFuncionCstr}\n`;
        resultado += this.Instruccion.buildAst(nodoExpresion);
        resultado += `${nodoFuncionCstr} -> ${nodoExpresion}\n`;
        resultado += `${anterior} -> ${funcionDeclaracion}\n`;
        return resultado;
    }
}
exports.default = DeclaracionCstr;
