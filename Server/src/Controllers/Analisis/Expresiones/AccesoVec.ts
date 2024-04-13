import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import Simbolo from "../SimboloC/Simbolo";
import TablaSimbolos from '../SimboloC/TablaSimbolos';
import Tipo, { TipoDato } from "../SimboloC/Tipo";

export default class AccesoVec extends Instruccion {
    private id: string;
    private numero: Instruccion;

    constructor(id: string, linea: number, columna: number, numero: Instruccion) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.id = id;
        this.numero = numero;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let simboloVar: Simbolo =<Simbolo> tabla.getVariableVector(this.id, this.numero.interpretar(ArbolS, tabla));
        if (simboloVar === null) {
            return new Errores('Semantico', `La variable ${this.id} no existe`, this.Linea, this.Columna);
        }
        this.Tipo = simboloVar.getTipoSimbolo();
        return simboloVar.getValor();
    }
}