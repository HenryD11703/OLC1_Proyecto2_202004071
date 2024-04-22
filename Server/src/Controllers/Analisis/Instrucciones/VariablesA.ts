import { Instruccion } from "../Abstracto/Instruccion";
import Errores from '../Excepciones/Errores';
import ArbolS from "../SimboloC/ArbolS";
import Contador from "../SimboloC/Contador";
import Simbolo from "../SimboloC/Simbolo";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";

export default class VariablesA extends Instruccion {
    private ids: string[];
    private exp: Instruccion;

    constructor(ids: string[], exp: Instruccion, fila: number, columna: number) {
        super(new Tipo(TipoDato.VOID), fila, columna);
        this.ids = ids;
        this.exp = exp;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let NewValue = this.exp.interpretar(ArbolS, tabla);
        if (NewValue instanceof Errores) return NewValue;

        for (let id of this.ids) {
            let valor = tabla.getVariable(id.toLowerCase());
            if (valor == null) return new Errores('Semantico', `La variable ${id} no existe`, this.Linea, this.Columna);
            if (this.exp.Tipo.getTipo() != valor.getTipoSimbolo().getTipo())
                return new Errores('Semantico', `El tipo de dato no es igual`, this.Linea, this.Columna);

            this.Tipo = valor.getTipoSimbolo();
            valor.setValor(NewValue);
        }
    }
    //| ids IGUAL expresion               { $$ = new AsignacionVar.default($1, $3, @1.first_line, @1.first_column); }  
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let nodoRaiz = `n${contador.get()}`;
        let nodoVariables = `n${contador.get()}`;
        let nodoExpresion = this.exp.buildAst(nodoRaiz);
        let resultado = `${nodoRaiz}[label="Variables"]\n`;
        resultado += `${anterior} -> ${nodoRaiz}\n`;
        resultado += `${nodoVariables}[label="Variables"]\n`;
        resultado += `${nodoRaiz} -> ${nodoVariables}\n`;
        for (let id of this.ids) {
            resultado += `${nodoVariables} -> n${contador.get()}[label="${id}"]\n`;
        }
        resultado += `${nodoVariables} -> ${nodoExpresion}\n`;
        resultado += this.exp.buildAst(nodoExpresion);
        return resultado;
        
    }
}