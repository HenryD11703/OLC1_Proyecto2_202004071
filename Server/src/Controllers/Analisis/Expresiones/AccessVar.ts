import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import Contador from "../SimboloC/Contador";
import Simbolo from "../SimboloC/Simbolo";
import TablaSimbolos from '../SimboloC/TablaSimbolos';
import Tipo, { TipoDato } from "../SimboloC/Tipo";

export default class AccessVar extends Instruccion {
    private id: string;

    constructor(id: string, linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.id = id;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let ValueVar: Simbolo = <Simbolo> tabla.getVariable(this.id);
        if (ValueVar == null) return new Errores('Semantico', `La variable ${this.id} no existe`, this.Linea, this.Columna);
        this.Tipo = ValueVar.getTipoSimbolo();
        return ValueVar.getValor();
    }
    
    // Se creara un nodo para el AST
    // AccessVar solo cuenta con un ID por lo que se creara un nodo para el AST el id y el id 

    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let nodoAccessVar =  `n${contador.get()}`
        let nodoID = `n${contador.get()}`
        let resultado = `${nodoAccessVar}[label="AccessVar"]\n`
        resultado += `${nodoAccessVar} -> ${nodoID}\n`
        resultado += `${nodoID}[label="${this.id}"]\n`
        resultado += `${anterior} -> ${nodoAccessVar}\n`
        return resultado
    }

}