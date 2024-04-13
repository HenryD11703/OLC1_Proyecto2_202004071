import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
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
}