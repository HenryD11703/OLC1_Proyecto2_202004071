import { Instruccion } from "../Abstracto/Instruccion";
import Errores from '../Excepciones/Errores';
import ArbolS from "../SimboloC/ArbolS";
import Simbolo from "../SimboloC/Simbolo";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo,{ TipoDato } from "../SimboloC/Tipo";
 

export default class VariablesA extends Instruccion {
    private id: string;
    private exp : Instruccion;

    constructor(id: string, exp: Instruccion, fila: number, columna: number) {
        super(new Tipo(TipoDato.VOID), fila, columna);
        this.id = id;
        this.exp = exp;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let NewValue = this.exp.interpretar(ArbolS, tabla);
        if(NewValue instanceof Errores) return NewValue;
        
        let valor = tabla.getVariable(this.id.toLowerCase());
        if (valor == null) return new Errores('Semantico', `La variable ${this.id} no existe`, this.Linea, this.Columna);

        if(this.exp.Tipo.getTipo() != valor.getTipoSimbolo().getTipo()) return new Errores('Semantico', `El tipo de dato no es igual`, this.Linea, this.Columna);

        this.Tipo = valor.getTipoSimbolo();
        valor.setValor(NewValue);

    }
}