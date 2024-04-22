import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import Contador from "../SimboloC/Contador";
import Simbolo from "../SimboloC/Simbolo";
import TablaSimbolos from '../SimboloC/TablaSimbolos';
import Tipo, { TipoDato } from "../SimboloC/Tipo";

export default class AccesoVec extends Instruccion {
    private id: string;
    private numero: Instruccion;
    private numero2: Instruccion | undefined;

    constructor(id: string, linea: number, columna: number, numero: Instruccion, numero2?: Instruccion) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.id = id;
        this.numero = numero;
        this.numero2 = numero2;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        if (this.numero2 == undefined) {
            const variable = tabla.getVariable(this.id);
            if (variable != null) {
                let simboloVar: Simbolo = <Simbolo>tabla.getVariableVector(this.id, this.numero.interpretar(ArbolS, tabla));
                if (simboloVar === null) {
                    return new Errores('Semantico', `La variable ${this.id} no existe`, this.Linea, this.Columna);
                }
                this.Tipo = simboloVar.getTipoSimbolo();
                return simboloVar.getValor();
            }
        } else {
            const variable = tabla.getVariable(this.id);
            if (variable != null) {
                let simboloVar2: Simbolo = <Simbolo>tabla.getVariableVector2(this.id, this.numero.interpretar(ArbolS, tabla), this.numero2.interpretar(ArbolS, tabla));
                if (simboloVar2 === null) {
                    return new Errores('Semantico', `La variable ${this.id} no existe`, this.Linea, this.Columna);
                }
                this.Tipo = simboloVar2.getTipoSimbolo();
                return simboloVar2.getValor();
            }
        }
    }
    // Se creara un nodo para el AST
    // Se llamara AccesoVec y conectara con las producciones de la gramatica de AccesoVec

    /*
    Gramatica
    
accesoVector : ID CORCHETEI expresion CORCHETED { $$ = new AccesoVec.default($1, @1.first_line, @1.first_column, $3); }
             | ID CORCHETEI expresion CORCHETED CORCHETEI expresion CORCHETED { $$ = new AccesoVec.default($1, @1.first_line, @1.first_column, $3, $6); } 
;
    */
buildAst(anterior: string): string {
    let contador = Contador.getInstance();
    let nodoAccessVec = `n${contador.get()}`
    let nodoID = `n${contador.get()}`
    let nodoCorcheteI = `n${contador.get()}`
    let nodoExpresion = `n${contador.get()}`
    let nodoCorcheteD = `n${contador.get()}`
    if(this.numero2){
        let nodoCorcheteI2 = `n${contador.get()}`
        let nodoExpresion2 = `n${contador.get()}`
        let nodoCorcheteD2 = `n${contador.get()}`
        let resultado = `${nodoAccessVec}[label="AccesoVec"]\n`
        resultado += `${nodoID}[label="${this.id}"]\n`
        resultado += `${nodoCorcheteI}[label="["]\n`
        resultado += `${nodoExpresion}[label="Expresion"]\n`
        resultado += `${nodoCorcheteD}[label="]"]\n`
        resultado += `${nodoCorcheteI2}[label="["]\n`
        resultado += `${nodoExpresion2}[label="Expresion"]\n`
        resultado += `${nodoCorcheteD2}[label="]"]\n`
        resultado += `${anterior} -> ${nodoAccessVec}\n`
        resultado += `${nodoAccessVec} -> ${nodoID}\n`
        resultado += `${nodoAccessVec} -> ${nodoCorcheteI}\n`
        resultado += `${nodoAccessVec} -> ${nodoExpresion}\n`
        resultado += `${nodoAccessVec} -> ${nodoCorcheteD}\n`
        resultado += `${nodoAccessVec} -> ${nodoCorcheteI2}\n`
        resultado += `${nodoAccessVec} -> ${nodoExpresion2}\n`
        resultado += `${nodoAccessVec} -> ${nodoCorcheteD2}\n`
        resultado += this.numero.buildAst(nodoExpresion)
        resultado += this.numero2.buildAst(nodoExpresion2)
        return resultado
    }
    let resultado = `${nodoAccessVec}[label="AccesoVec"]\n`
    resultado += `${nodoID}[label="${this.id}"]\n`
    resultado += `${nodoCorcheteI}[label="["]\n`
    resultado += `${nodoExpresion}[label="Expresion"]\n`
    resultado += `${nodoCorcheteD}[label="]"]\n`
    resultado += `${anterior} -> ${nodoAccessVec}\n`
    resultado += `${nodoAccessVec} -> ${nodoID}\n`
    resultado += `${nodoAccessVec} -> ${nodoCorcheteI}\n`
    resultado += `${nodoAccessVec} -> ${nodoExpresion}\n`
    resultado += `${nodoAccessVec} -> ${nodoCorcheteD}\n`
    resultado += this.numero.buildAst(nodoExpresion)
    return resultado


}
}