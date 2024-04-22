"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstracto/Instruccion");
const Errores_1 = __importDefault(require("../Excepciones/Errores"));
const Contador_1 = __importDefault(require("../SimboloC/Contador"));
const TablaSimbolos_1 = __importDefault(require("../SimboloC/TablaSimbolos"));
const Return_1 = __importDefault(require("./Return"));
class Funcion extends Instruccion_1.Instruccion {
    //funciones : tipo ids PARENTESISI parametros PARENTESISD LLAVEI codigos LLAVED { $$ = new Funcion.default($1, $2, $4, $7, @1.first_line, @1.first_column); }
    constructor(tipo, id, parametros, instrucciones, linea, columna) {
        super(tipo, linea, columna);
        this.id = id;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }
    interpretar(ArbolS, tabla) {
        let nuevaTabla = new TablaSimbolos_1.default(tabla);
        nuevaTabla.setNombre("Funcion" + this.id);
        for (let instruccion of this.instrucciones) {
            if (instruccion instanceof Return_1.default) {
                instruccion.Tipo.setTipo(this.Tipo.getTipo());
                return instruccion;
            }
            let result = instruccion.interpretar(ArbolS, nuevaTabla);
            if (result instanceof Errores_1.default)
                return result;
            if (result instanceof Return_1.default) {
                result.Tipo.setTipo(this.Tipo.getTipo());
                return result;
            }
        }
    }
    /**
     *funciones : tipo ID PARENTESISI parametros PARENTESISD LLAVEI codigos LLAVED { $$ = new Funcion.default($1, $2, $4, $7, @1.first_line, @1.first_column); }
          | tipo ID PARENTESISI PARENTESISD LLAVEI codigos LLAVED            { $$ = new Funcion.default($1, $2, [], $6, @1.first_line, @1.first_column); }
;

        parametros : parametros COMA tipo ID       {$1.push({tipo:$3, id:$4}); $$ = $1;}
                | tipo ID                     { $$ = [{tipo:$1, id:$2}]; }
                | parametros COMA tipo ID CORCHETEI CORCHETED {$1.push({tipo:$3, id:$4, arreglo:true}); $$ = $1;}
                | tipo ID CORCHETEI CORCHETED {$$ = [{tipo:$1, id:$2, arreglo:true}]; }
                | parametros COMA tipo ID CORCHETEI CORCHETED CORCHETEI CORCHETED {$1.push({tipo:$3, id:$4, arreglo:true}); $$ = $1;}
                | tipo ID CORCHETEI CORCHETED CORCHETEI CORCHETED {$$ = [{tipo:$1, id:$2, arreglo:true}]; }
        ;

     */
    buildAst(anterior) {
        let contador = Contador_1.default.getInstance();
        let nodoFuncion = `n${contador.get()}`;
        let nodoTipo = `n${contador.get()}`;
        let nodoId = `n${contador.get()}`;
        let nodoParentesisI = `n${contador.get()}`;
        let nodoParentesisD = `n${contador.get()}`;
        let nodoParametros = null;
        let nodoInstrucciones = `n${contador.get()}`;
        let resultado = `${nodoFuncion}[label="Declaracion de Funcion"]\n`;
        resultado += `${anterior} -> ${nodoFuncion}\n`;
        resultado += `${nodoTipo}[label="${this.Tipo.getTipo().toString()}"]\n`;
        resultado += `${nodoFuncion} -> ${nodoTipo}\n`;
        resultado += `${nodoId}[label="${this.id}"]\n`;
        resultado += `${nodoFuncion} -> ${nodoId}\n`;
        resultado += `${nodoParentesisI}[label="("]\n`;
        resultado += `${nodoFuncion} -> ${nodoParentesisI}\n`;
        if (this.parametros.length > 0) {
            nodoParametros = `n${contador.get()}`;
            resultado += `${nodoParametros}[label="Parametros"]\n`;
            resultado += `${nodoFuncion} -> ${nodoParametros}\n`;
            for (let parametro of this.parametros) {
                let nodoParametro = `n${contador.get()}`;
                let nodoTipoParametro = `n${contador.get()}`;
                let nodoIdParametro = `n${contador.get()}`;
                let nodoCorcheteI = null;
                let nodoCorcheteD = null;
                resultado += `${nodoParametro}[label="Parametro"]\n`;
                resultado += `${nodoParametros} -> ${nodoParametro}\n`;
                resultado += `${nodoTipoParametro}[label="${parametro.tipo.getTipo().toString()}"]\n`;
                resultado += `${nodoParametro} -> ${nodoTipoParametro}\n`;
                resultado += `${nodoIdParametro}[label="${parametro.id}"]\n`;
                resultado += `${nodoParametro} -> ${nodoIdParametro}\n`;
                if (parametro.arreglo) {
                    nodoCorcheteI = `n${contador.get()}`;
                    nodoCorcheteD = `n${contador.get()}`;
                    resultado += `${nodoCorcheteI}[label="["]\n`;
                    resultado += `${nodoParametro} -> ${nodoCorcheteI}\n`;
                    resultado += `${nodoCorcheteD}[label="]"]\n`;
                    resultado += `${nodoParametro} -> ${nodoCorcheteD}\n`;
                    if (parametro.arreglo === true) {
                        nodoCorcheteI = `n${contador.get()}`;
                        nodoCorcheteD = `n${contador.get()}`;
                        resultado += `${nodoCorcheteI}[label="["]\n`;
                        resultado += `${nodoParametro} -> ${nodoCorcheteI}\n`;
                        resultado += `${nodoCorcheteD}[label="]"]\n`;
                        resultado += `${nodoParametro} -> ${nodoCorcheteD}\n`;
                    }
                }
            }
        }
        resultado += `${nodoParentesisD}[label=")"]\n`;
        resultado += `${nodoFuncion} -> ${nodoParentesisD}\n`;
        // Generar nodo para las instrucciones
        resultado += `${nodoInstrucciones}[label="Instrucciones"]\n`;
        resultado += `${nodoFuncion} -> ${nodoInstrucciones}\n`;
        // Iterar sobre las instrucciones y generar sus nodos
        for (let instruccion of this.instrucciones) {
            resultado += instruccion.buildAst(nodoInstrucciones);
        }
        return resultado;
    }
}
exports.default = Funcion;
