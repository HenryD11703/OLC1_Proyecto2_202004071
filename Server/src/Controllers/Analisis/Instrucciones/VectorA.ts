import { Instruccion } from "../Abstracto/Instruccion";
import Errores from '../Excepciones/Errores';
import ArbolS from "../SimboloC/ArbolS";
import Contador from "../SimboloC/Contador";
import Simbolo from "../SimboloC/Simbolo";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";

//Para modificar y asignar valores a un vector en una posicion especifica
export default class AsignacionVec extends Instruccion {
    private id: string;
    private numero: Instruccion;
    private numero2: Instruccion | undefined;
    private valor: Instruccion;

    constructor(id: string, linea: number, columna: number, numero: Instruccion, valor: Instruccion, numero2?: Instruccion) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.id = id;
        this.numero = numero;
        this.numero2 = numero2;
        this.valor = valor;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        //verificar si es de una o dos dimensiones
        let newValor = this.valor.interpretar(ArbolS, tabla);
        if (newValor instanceof Errores) return newValor;

        const variable = tabla.getVariable(this.id);
        if (variable != null) {
            if (this.numero2 == undefined) {
                let resultado = tabla.setVariableVector(this.id, this.numero.interpretar(ArbolS, tabla), newValor);
                if (!resultado) {
                    return new Errores('Semantico', `La variable ${this.id} no existe`, this.Linea, this.Columna);
                }
            } else {
                let resultado = tabla.setVariableVector2(this.id, this.numero.interpretar(ArbolS, tabla), this.numero2.interpretar(ArbolS, tabla), newValor);
                if (!resultado) {
                    return new Errores('Semantico', `La variable ${this.id} no existe`, this.Linea, this.Columna);
                }
            }
        } else {
            return new Errores('Semantico', `La variable ${this.id} no existe`, this.Linea, this.Columna);
        }
    }
    /*
    modificacionVector : ID CORCHETEI expresion CORCHETED IGUAL expresion   { $$ = new VectorA.default($1, @1.first_line, @1.first_column, $3, $6); } 
                   | ID CORCHETEI expresion CORCHETED CORCHETEI expresion CORCHETED IGUAL expresion  { $$ = new VectorA.default($1, @1.first_line, @1.first_column, $3, $9, $6); }
;
*/
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let nodoRaiz = `n${contador.get()}`;
        let nodoAsignacion = `n${contador.get()}`;
        let nodoId = `n${contador.get()}`;
        let nodoExpresion = `n${contador.get()}`;
        let nodoExpresion2 = `n${contador.get()}`;
        let nodoValor = `n${contador.get()}`;
        let nodoValor2 = `n${contador.get()}`;
        let resultado = `${nodoRaiz}[label="Asignacion Vector"]\n`;
        resultado += `${anterior} -> ${nodoRaiz}\n`;
        resultado += `${nodoAsignacion}[label="Asignacion"]\n`;
        resultado += `${nodoRaiz} -> ${nodoAsignacion}\n`;
        resultado += `${nodoId}[label="${this.id}"]\n`;
        resultado += `${nodoAsignacion} -> ${nodoId}\n`;
        resultado += `${nodoExpresion}[label="Expresion"]\n`;
        resultado += `${nodoAsignacion} -> ${nodoExpresion}\n`;
        resultado += this.numero.buildAst(nodoExpresion);
        resultado += `${nodoValor}[label="Valor"]\n`;
        resultado += `${nodoAsignacion} -> ${nodoValor}\n`;
        resultado += this.valor.buildAst(nodoValor);
        if (this.numero2 != undefined) {
            resultado += `${nodoExpresion2}[label="Expresion"]\n`;
            resultado += `${nodoAsignacion} -> ${nodoExpresion2}\n`;
            resultado += this.numero2.buildAst(nodoExpresion2);
        }
        return resultado;
    }
}