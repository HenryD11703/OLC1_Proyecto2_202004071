import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";
import e from "express";

export default class Logica extends Instruccion {
    //Aca en logica esta complicado por que se tiene que hacer un analisis de la expresion ya que no solo pueden venir numeros dentro de 
    //la expresion sino que tambien pueden venir variables o funciones incluso anidadas algo asi como 1<3 || 3>2 && 2<4 o 2<3 && 3>2}
    private Expresion1: Instruccion | undefined;
    private Expresion2: Instruccion | undefined;
    private Operador: OperadorLogico;
    private ExpresionUnica: Instruccion | undefined; //Para el caso de not

    constructor(operador: OperadorLogico, linea: number, columna: number, Expresion1?: Instruccion, Expresion2?: Instruccion) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.Operador = operador;
        if (!Expresion2) this.ExpresionUnica = Expresion1;
        else {
            this.Expresion1 = Expresion1;
            this.Expresion2 = Expresion2;
        }
    }
    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let Expresion1, Expresion2, ExpresionUnica = null;
        if (this.ExpresionUnica != null) {
            ExpresionUnica = this.ExpresionUnica.interpretar(ArbolS, tabla);
            if (ExpresionUnica instanceof Errores) return ExpresionUnica;
        } else {
            Expresion1 = this.Expresion1?.interpretar(ArbolS, tabla);
            if (Expresion1 instanceof Errores) return Expresion1;
            Expresion2 = this.Expresion2?.interpretar(ArbolS, tabla);
            if (Expresion2 instanceof Errores) return Expresion2;
        }
        switch (this.Operador) {
            case OperadorLogico.IGUALIGUAL:
                return this.Igualdad(Expresion1, Expresion2);
            case OperadorLogico.DIFERENTE:
                return this.Diferencia(Expresion1, Expresion2);
            case OperadorLogico.MENOR:
                return this.MenorQ(Expresion1, Expresion2);
            case OperadorLogico.MENORIGUAL:
                return this.MenorIgualQ(Expresion1, Expresion2);
            case OperadorLogico.MAYOR:
                return this.MayorQ(Expresion1, Expresion2);
            case OperadorLogico.MAYORIGUAL:
                return this.MayorIgualQ(Expresion1, Expresion2);
            case OperadorLogico.OR:
                return this.Or(Expresion1, Expresion2);
            case OperadorLogico.AND:
                return this.And(Expresion1, Expresion2);
            case OperadorLogico.NOT:
                return this.Not(ExpresionUnica);
            default:
                return new Errores('Semantico', `No se encontro el operador ${this.Operador}`, this.Linea, this.Columna);
        }
    }

    Igualdad(Expresion1: any, Expresion2: any) {
        if (Expresion1 === Expresion2) return true;
        return false;
    }
    Diferencia(Expresion1: any, Expresion2: any) {
        if (Expresion1 !== Expresion2) return true;
        return false;
    }
    MenorQ(Expresion1: any, Expresion2: any) {
        if (Expresion1 < Expresion2) return true;
        return false;
    }
    MenorIgualQ(Expresion1: any, Expresion2: any) {
        if (Expresion1 <= Expresion2) return true;
        return false;
    }
    MayorQ(Expresion1: any, Expresion2: any) {
        if (Expresion1 > Expresion2) return true;
        return false;
    }
    MayorIgualQ(Expresion1: any, Expresion2: any) {
        if (Expresion1 >= Expresion2) return true;
        return false;
    }
    Or(Expresion1: any, Expresion2: any) {
        if (Expresion1 || Expresion2) return true;
        return false;
    }
    And(Expresion1: any, Expresion2: any) {
        if (Expresion1 && Expresion2) return true;
        return false;
    }
    Not(ExpresionUnica: any) {
        if (!ExpresionUnica) return true;
        return false;
    }
}
export enum OperadorLogico {
    IGUALIGUAL,
    DIFERENTE,
    MENOR,
    MENORIGUAL,
    MAYOR,
    MAYORIGUAL,
    OR,
    AND,
    NOT
}