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
class Declaracion extends Instruccion_1.Instruccion {
    constructor(tipo, linea, columna, id, valor) {
        super(tipo, linea, columna);
        this.id = id;
        this.valor = valor;
    }
    interpretar(ArbolS, tabla) {
        if (this.valor) {
            let valorFinal = this.valor.interpretar(ArbolS, tabla);
            if (valorFinal instanceof Errores_1.default)
                return valorFinal;
            if (this.valor.Tipo.getTipo() != this.Tipo.getTipo()) {
                ArbolS.createAndAddError(ArbolS, 'Semantico', `El tipo de dato no es igual`, this.Linea, this.Columna);
                return new Errores_1.default('Semantico', `El tipo de dato no es igual`, this.Linea, this.Columna);
            }
            for (let ide of this.id) {
                if (!tabla.setVariable(new Simbolo_1.default(this.Tipo, ide, valorFinal))) {
                    ArbolS.createAndAddError(ArbolS, 'Semantico', `La variable ${ide} ya existe`, this.Linea, this.Columna);
                    return new Errores_1.default('Semantico', `La variable ${ide} ya existe`, this.Linea, this.Columna);
                }
            }
        }
        else {
            for (let ide of this.id) {
                if (!tabla.setVariable(new Simbolo_1.default(this.Tipo, ide, this.valorDefecto(this.Tipo.getTipo())))) {
                    ArbolS.createAndAddError(ArbolS, 'Semantico', `La variable ${ide} ya existe`, this.Linea, this.Columna);
                    return new Errores_1.default('Semantico', `La variable ${ide} ya existe`, this.Linea, this.Columna);
                }
            }
        }
    }
    /**
     declaracionv: tipo ids                         { $$ = new DeclaracionVar.default($1, @1.first_line, @1.first_column, $2); }
            | tipo ids IGUAL expresion          { $$ = new DeclaracionVar.default($1, @1.first_line, @1.first_column, $2, $4); }
            | ids IGUAL expresion               { $$ = new AsignacionVar.default($1, $3, @1.first_line, @1.first_column); }
    ;
    ids : ID                                    { $$ = [$1]; }
        | ids COMA ID                           { $1.push($3); $$ = $1; }
    ;
    tipo : INT                                      { $$ = new Tipo.default(Tipo.TipoDato.ENTERO); }
        | DOUBLE                                   { $$ = new Tipo.default(Tipo.TipoDato.DECIMAL); }
        | BOOL                                     { $$ = new Tipo.default(Tipo.TipoDato.BOOLEANO); }
        | CHAR                                     { $$ = new Tipo.default(Tipo.TipoDato.CARACTER); }
        | STD DOSPUNTOS DOSPUNTOS STRING           { $$ = new Tipo.default(Tipo.TipoDato.CADENA); }
        | VOID                                     { $$ = new Tipo.default(Tipo.TipoDato.VOID); }
;
     */
    buildAst(anterior) {
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
        let contador = Contador_1.default.getInstance();
        let funcionDeclaracion = `n${contador.get()}`;
        let nodoTipo = `n${contador.get()}`;
        let nodoIds = `n${contador.get()}`;
        let nodoPYC = `n${contador.get()}`;
        if (this.Tipo.getTipo() == Tipo_1.TipoDato.CADENA) {
            let nodoSTD = `n${contador.get()}`;
            let nodoDOSP = `n${contador.get()}`;
            let nodoDOSP2 = `n${contador.get()}`;
            let nodoString = `n${contador.get()}`;
            let resultado = `${funcionDeclaracion}[label="Declaracion"]\n`;
            resultado += `${nodoSTD}[label="STD"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoSTD}\n`;
            resultado += `${nodoDOSP}[label=":"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoDOSP}\n`;
            resultado += `${nodoDOSP2}[label=":"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoDOSP2}\n`;
            resultado += `${nodoString}[label="STRING"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoString}\n`;
            resultado += `${nodoIds}[label="Ids"]\n`;
            for (let id of this.id) {
                let nodoId = `n${contador.get()}`;
                resultado += `${nodoId}[label="${id}"]\n`;
                resultado += `${nodoIds} -> ${nodoId}\n`;
            }
            if (this.valor) {
                let nodoIgual = `n${contador.get()}`;
                let nodoExpresion = `n${contador.get()}`;
                resultado += `${nodoIgual}[label="="]\n`;
                resultado += `${funcionDeclaracion} -> ${nodoIgual}\n`;
                resultado += `${nodoExpresion}[label="Expresion"]\n`;
                resultado += this.valor.buildAst(nodoExpresion);
                resultado += `${funcionDeclaracion} -> ${nodoExpresion}\n`;
            }
            resultado += `${funcionDeclaracion} -> ${nodoIds}\n`;
            resultado += `${nodoPYC}[label=";"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoPYC}\n`;
            resultado += `${anterior} -> ${funcionDeclaracion}\n`;
            return resultado;
        }
        if (this.valor) {
            let nodoIgual = `n${contador.get()}`;
            let nodoExpresion = `n${contador.get()}`;
            let resultado = `${funcionDeclaracion}[label="Declaracion Variable"]\n`;
            resultado += `${nodoTipo}[label="${Tipo}"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoTipo}\n`;
            resultado += `${nodoIds}[label="Ids"]\n`;
            for (let id of this.id) {
                let nodoId = `n${contador.get()}`;
                resultado += `${nodoId}[label="${id}"]\n`;
                resultado += `${nodoIds} -> ${nodoId}\n`;
            }
            resultado += `${funcionDeclaracion} -> ${nodoIds}\n`;
            resultado += `${nodoIgual}[label="="]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoIgual}\n`;
            resultado += `${nodoExpresion}[label="Expresion"]\n`;
            resultado += this.valor.buildAst(nodoExpresion);
            resultado += `${funcionDeclaracion} -> ${nodoExpresion}\n`;
            resultado += `${anterior} -> ${funcionDeclaracion}\n`;
            resultado += `${nodoPYC}[label=";"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoPYC}\n`;
            return resultado;
        }
        else {
            let resultado = `${funcionDeclaracion}[label="Declaracion Variable"]\n`;
            resultado += `${nodoTipo}[label="${Tipo}"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoTipo}\n`;
            resultado += `${nodoIds}[label="Ids"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoIds}\n`;
            for (let id of this.id) {
                let nodoId = `n${contador.get()}`;
                resultado += `${nodoId}[label="${id}"]\n`;
                resultado += `${nodoIds} -> ${nodoId}\n`;
            }
            resultado += `${anterior} -> ${funcionDeclaracion}\n`;
            resultado += `${nodoPYC}[label=";"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoPYC}\n`;
            return resultado;
        }
    }
    valorDefecto(tipo) {
        switch (tipo) {
            case Tipo_1.TipoDato.ENTERO:
                return 0;
            case Tipo_1.TipoDato.DECIMAL:
                return 0.0;
            case Tipo_1.TipoDato.BOOLEANO:
                return true;
            case Tipo_1.TipoDato.CADENA:
                return "";
            case Tipo_1.TipoDato.CARACTER:
                return '0';
        }
    }
}
exports.default = Declaracion;
/*

  //Cuando se declare una variable sin valor, se le asigna un valor por defecto
 
        if (valorFinal == null) {
            if (this.Tipo.getTipo() == TipoDato.ENTERO) {
                valorFinal = 0;
            } else if (this.Tipo.getTipo() == TipoDato.CADENA) {
                valorFinal = "";
            } else if (this.Tipo.getTipo() == TipoDato.BOOLEANO) {
                valorFinal = true;
            } else if (this.Tipo.getTipo() == TipoDato.DECIMAL) {
                valorFinal = 0.0;
            } else if (this.Tipo.getTipo() == TipoDato.CARACTER) {
                valorFinal = '0';
            }


*/ 
