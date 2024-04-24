"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstracto/Instruccion");
const Errores_1 = __importDefault(require("../Excepciones/Errores"));
const Contador_1 = __importDefault(require("../SimboloC/Contador"));
const Simbolo_1 = __importDefault(require("../SimboloC/Simbolo"));
const Tipo_1 = require("../SimboloC/Tipo");
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
                ArbolS.createAndAddError(ArbolS, 'Semantico', 'Ya existe una variable con el mismo nombre', this.Linea, this.Columna);
                return new Errores_1.default('Semantico', 'Ya existe una variable con el mismo nombre', this.Linea, this.Columna);
            }
        }
    }
    // | tipo ids CORCHETEI CORCHETED IGUAL funcioncstr PYC { $$ = new DeclaracionCstr.default($1,$2,$6,@1.first_line,@1.first_column); }
    //funcioncstr : expresion C_STR PARENTESISI PARENTESISD
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let Tipo = "";
        //segun el tipo de dato asignar el valor
        if (this.Tipo.getTipo() == Tipo_1.TipoDato.ENTERO) {
            Tipo = "INT";
        }
        else if (this.Tipo.getTipo() == Tipo_1.TipoDato.DECIMAL) {
            Tipo = "DOUBLE";
        }
        else if (this.Tipo.getTipo() == Tipo_1.TipoDato.BOOLEANO) {
            Tipo = "BOOL";
        }
        else if (this.Tipo.getTipo() == Tipo_1.TipoDato.CARACTER) {
            Tipo = "CHAR";
        }
        else if (this.Tipo.getTipo() == Tipo_1.TipoDato.CADENA) {
            Tipo = "STD";
        }
        else if (this.Tipo.getTipo() == Tipo_1.TipoDato.VOID) {
            Tipo = "VOID";
        }
        else if (this.Tipo.getTipo() == Tipo_1.TipoDato.ARREGLO) {
            Tipo = "ARREGLO";
        }
        let nodoTipo = `n${contador.get()}`;
        let nodoId = `n${contador.get()}`;
        let nodoCORCHETEI = `n${contador.get()}`;
        let nodoCORCHETED = `n${contador.get()}`;
        let nodoIGUAL = `n${contador.get()}`;
        let nodoTipoArreglo = `n${contador.get()}`;
        let nodoFuncionCstr = `n${contador.get()}`;
        let nodoPYC = `n${contador.get()}`;
        let resultado = `${nodoTipo}[label="Declaracion Arreglo"]\n`;
        resultado += `${anterior} -> ${nodoTipo}\n`;
        resultado += `${nodoTipoArreglo}[label="${Tipo}"]\n`;
        resultado += `${nodoTipo} -> ${nodoTipoArreglo}\n`;
        for (let id of this.id) {
            resultado += `${nodoId}[label="${id}"]\n`;
            resultado += `${nodoTipo} -> ${nodoId}\n`;
        }
        resultado += `${nodoCORCHETEI}[label="["]\n`;
        resultado += `${nodoTipo} -> ${nodoCORCHETEI}\n`;
        resultado += `${nodoCORCHETED}[label="]"]\n`;
        resultado += `${nodoTipo} -> ${nodoCORCHETED}\n`;
        resultado += `${nodoIGUAL}[label="="]\n`;
        resultado += `${nodoTipo} -> ${nodoIGUAL}\n`;
        resultado += `${nodoFuncionCstr}[label="Funcion Cstr"]\n`;
        resultado += `${nodoTipo} -> ${nodoFuncionCstr}\n`;
        let nodoExpresion = `n${contador.get()}`;
        let nodoVALOR = `n${contador.get()}`;
        let nodoPUNTO = `n${contador.get()}`;
        let nodoC_STR = `n${contador.get()}`;
        let nodoParentesisI = `n${contador.get()}`;
        let nodoParentesisD = `n${contador.get()}`;
        resultado += `${nodoExpresion}[label="Expresion"]\n`;
        resultado += `${nodoFuncionCstr} -> ${nodoExpresion}\n`;
        resultado += this.Instruccion.buildAst(nodoExpresion);
        resultado += `${nodoPUNTO}[label="."]`;
        resultado += `${nodoFuncionCstr} -> ${nodoPUNTO}\n`;
        resultado += `${nodoC_STR}[label="C_STR"]\n`;
        resultado += `${nodoFuncionCstr} -> ${nodoC_STR}\n`;
        resultado += `${nodoParentesisI}[label="("]\n`;
        resultado += `${nodoFuncionCstr} -> ${nodoParentesisI}\n`;
        resultado += `${nodoParentesisD}[label=")"]\n`;
        resultado += `${nodoFuncionCstr} -> ${nodoParentesisD}\n`;
        resultado += `${nodoPYC}[label=";"]\n`;
        resultado += `${nodoFuncionCstr} -> ${nodoPYC}\n`;
        return resultado;
    }
}
exports.default = DeclaracionCstr;
