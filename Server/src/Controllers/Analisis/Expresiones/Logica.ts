import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";
import e from "express";

export default class Logica extends Instruccion {

    private Expresion1: Instruccion | undefined;
    private Expresion2: Instruccion | undefined;
    private Operador: OperadorLogico;
    private ExpresionUnica: Instruccion | undefined; //Para el caso de not

    constructor(operador: OperadorLogico, linea: number, columna: number, Expresion1: Instruccion, Expresion2?: Instruccion) {
        super(new Tipo(TipoDato.BOOLEANO), linea, columna);
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

    //Se pueden realizar operaciones relacionales entre: entero-entero,
    //entero-doble, entero-carácter, doble-entero, doble-carácter,
    //carácter-entero, carácter-doble, carácter-carácter y cualquier otra
    //operación relacional entre entero, doble y carácter.
    //Operaciones como cadena-carácter, es error semántico, a menos que
    //se utilice toString en el carácter.
    //Operaciones relacionales entre booleanos es válida.


    Igualdad(Expresion1: any, Expresion2: any) {
        let tipo1 = this.Expresion1?.Tipo.getTipo();
        let tipo2 = this.Expresion2?.Tipo.getTipo();
        switch (tipo1) {
            case TipoDato.ENTERO:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return parseInt(Expresion1) === parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return parseInt(Expresion1) === parseFloat(Expresion2);
                    case TipoDato.CADENA:
                        return new Errores('Semantico', `No se puede comparar un entero con una cadena`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return parseInt(Expresion1) === (Expresion2 ? 1 : 0);
                    case TipoDato.CARACTER:
                        return parseInt(Expresion1) === Expresion2.charCodeAt(0);
                    default:
                        return new Errores('Semantico', `No se puede comparar un entero con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case TipoDato.DECIMAL:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return parseFloat(Expresion1) === parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return parseFloat(Expresion1) === parseFloat(Expresion2);
                    case TipoDato.CADENA:
                        return new Errores('Semantico', `No se puede comparar un decimal con una cadena`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return parseFloat(Expresion1) === (Expresion2 ? 1 : 0);
                    case TipoDato.CARACTER:
                        return parseFloat(Expresion1) === Expresion2.charCodeAt(0);
                    default:
                        return new Errores('Semantico', `No se puede comparar un decimal con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case TipoDato.CADENA:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return new Errores('Semantico', `No se puede comparar una cadena con un entero`, this.Linea, this.Columna);
                    case TipoDato.DECIMAL:
                        return new Errores('Semantico', `No se puede comparar una cadena con un decimal`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return Expresion1 === Expresion2;
                    case TipoDato.BOOLEANO:
                        return new Errores('Semantico', `No se puede comparar una cadena con un booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Semantico', `No se puede comparar una cadena con un caracter`, this.Linea, this.Columna);
                    default:
                        return new Errores('Semantico', `No se puede comparar una cadena con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case TipoDato.BOOLEANO:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return (Expresion1 ? 1 : 0) === parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return (Expresion1 ? 1 : 0) === parseFloat(Expresion2);
                    case TipoDato.CADENA:
                        return new Errores('Semantico', `No se puede comparar un booleano con una cadena`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return Expresion1 === Expresion2;
                    case TipoDato.CARACTER:
                        return (Expresion1 ? 1 : 0) === Expresion2.charCodeAt(0);
                    default:
                        return new Errores('Semantico', `No se puede comparar un booleano con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case TipoDato.CARACTER:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return Expresion1.charCodeAt(0) === parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return Expresion1.charCodeAt(0) === parseFloat(Expresion2);
                    case TipoDato.CADENA:
                        return new Errores('Semantico', `No se puede comparar un caracter con una cadena`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return new Errores('Semantico', `No se puede comparar un caracter con un booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return Expresion1 === Expresion2;
                    default:
                        return new Errores('Semantico', `No se puede comparar un caracter con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            default:
                return new Errores('Semantico', `No se puede comparar un tipo ${tipo1}`, this.Linea, this.Columna);
        }

    }

    Diferencia(Expresion1: any, Expresion2: any) {
        let tipo1 = this.Expresion1?.Tipo.getTipo();
        let tipo2 = this.Expresion2?.Tipo.getTipo();
        switch (tipo1) {
            case TipoDato.ENTERO:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return parseInt(Expresion1) !== parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return parseInt(Expresion1) !== parseFloat(Expresion2);
                    case TipoDato.CADENA:
                        return new Errores('Semantico', `No se puede comparar un entero con una cadena`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return parseInt(Expresion1) !== (Expresion2 ? 1 : 0);
                    case TipoDato.CARACTER:
                        return parseInt(Expresion1) !== Expresion2.charCodeAt(0);
                    default:
                        return new Errores('Semantico', `No se puede comparar un entero con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case TipoDato.DECIMAL:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return parseFloat(Expresion1) !== parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return parseFloat(Expresion1) !== parseFloat(Expresion2);
                    case TipoDato.CADENA:
                        return new Errores('Semantico', `No se puede comparar un decimal con una cadena`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return parseFloat(Expresion1) !== (Expresion2 ? 1 : 0);
                    case TipoDato.CARACTER:
                        return parseFloat(Expresion1) !== Expresion2.charCodeAt(0);
                    default:
                        return new Errores('Semantico', `No se puede comparar un decimal con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case TipoDato.CADENA:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return new Errores('Semantico', `No se puede comparar una cadena con un entero`, this.Linea, this.Columna);
                    case TipoDato.DECIMAL:
                        return new Errores('Semantico', `No se puede comparar una cadena con un decimal`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return Expresion1 !== Expresion2;
                    case TipoDato.BOOLEANO:
                        return new Errores('Semantico', `No se puede comparar una cadena con un booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Semantico', `No se puede comparar una cadena con un caracter`, this.Linea, this.Columna);
                    default:
                        return new Errores('Semantico', `No se puede comparar una cadena con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case TipoDato.BOOLEANO:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return (Expresion1 ? 1 : 0) !== parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return (Expresion1 ? 1 : 0) !== parseFloat(Expresion2);
                    case TipoDato.CADENA:
                        return new Errores('Semantico', `No se puede comparar un booleano con una cadena`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return Expresion1 !== Expresion2;
                    case TipoDato.CARACTER:
                        return (Expresion1 ? 1 : 0) !== Expresion2.charCodeAt(0);
                    default:
                        return new Errores('Semantico', `No se puede comparar un booleano con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case TipoDato.CARACTER:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return Expresion1.charCodeAt(0) !== parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return Expresion1.charCodeAt(0) !== parseFloat(Expresion2);
                    case TipoDato.CADENA:
                        return new Errores('Semantico', `No se puede comparar un caracter con una cadena`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return new Errores('Semantico', `No se puede comparar un caracter con un booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return Expresion1 !== Expresion2;
                    default:
                        return new Errores('Semantico', `No se puede comparar un caracter con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            default:
                return new Errores('Semantico', `No se puede comparar un tipo ${tipo1}`, this.Linea, this.Columna);

        }
    }

    MenorQ(Expresion1: any, Expresion2: any) {
        let tipo1 = this.Expresion1?.Tipo.getTipo();
        let tipo2 = this.Expresion2?.Tipo.getTipo();
        switch (tipo1) {
            case TipoDato.ENTERO:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        console.log(Expresion1, Expresion2);
                        console.log(parseInt(Expresion1) < parseInt(Expresion2));
                        return parseInt(Expresion1) < parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return parseInt(Expresion1) < parseFloat(Expresion2);
                    case TipoDato.CADENA:
                        return new Errores('Semantico', `No se puede comparar un entero con una cadena`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return parseInt(Expresion1) < (Expresion2 ? 1 : 0);
                    case TipoDato.CARACTER:
                        return parseInt(Expresion1) < Expresion2.charCodeAt(0);
                    default:
                        return new Errores('Semantico', `No se puede comparar un entero con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case TipoDato.DECIMAL:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return parseFloat(Expresion1) < parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return parseFloat(Expresion1) < parseFloat(Expresion2);
                    case TipoDato.CADENA:
                        return new Errores('Semantico', `No se puede comparar un decimal con una cadena`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return parseFloat(Expresion1) < (Expresion2 ? 1 : 0);
                    case TipoDato.CARACTER:
                        return parseFloat(Expresion1) < Expresion2.charCodeAt(0);
                    default:
                        return new Errores('Semantico', `No se puede comparar un decimal con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case TipoDato.CADENA:
                return new Errores('Semantico', `No se puede comparar una cadena con otro tipo`, this.Linea, this.Columna);
            case TipoDato.BOOLEANO:
                return new Errores('Semantico', `No se puede comparar un booleano con otro tipo`, this.Linea, this.Columna);
            case TipoDato.CARACTER:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return Expresion1.charCodeAt(0) < parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return Expresion1.charCodeAt(0) < parseFloat(Expresion2);
                    case TipoDato.CARACTER:
                        return Expresion1 < Expresion2;
                    default:
                        return new Errores('Semantico', `No se puede comparar un caracter con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            default:
                return new Errores('Semantico', `No se puede comparar un tipo ${tipo1}`, this.Linea, this.Columna);
        }
    }
    MenorIgualQ(Expresion1: any, Expresion2: any) {
        let tipo1 = this.Expresion1?.Tipo.getTipo();
        let tipo2 = this.Expresion2?.Tipo.getTipo();
        switch (tipo1) {
            case TipoDato.ENTERO:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return parseInt(Expresion1) <= parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return parseInt(Expresion1) <= parseFloat(Expresion2);
                    case TipoDato.CADENA:
                        return new Errores('Semantico', `No se puede comparar un entero con una cadena`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return parseInt(Expresion1) <= (Expresion2 ? 1 : 0);
                    case TipoDato.CARACTER:
                        return parseInt(Expresion1) <= Expresion2.charCodeAt(0);
                    default:
                        return new Errores('Semantico', `No se puede comparar un entero con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case TipoDato.DECIMAL:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return parseFloat(Expresion1) <= parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return parseFloat(Expresion1) <= parseFloat(Expresion2);
                    case TipoDato.CADENA:
                        return new Errores('Semantico', `No se puede comparar un decimal con una cadena`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return parseFloat(Expresion1) <= (Expresion2 ? 1 : 0);
                    case TipoDato.CARACTER:
                        return parseFloat(Expresion1) <= Expresion2.charCodeAt(0);
                    default:
                        return new Errores('Semantico', `No se puede comparar un decimal con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case TipoDato.CADENA:
                return new Errores('Semantico', `No se puede comparar una cadena con otro tipo`, this.Linea, this.Columna);
            case TipoDato.BOOLEANO:
                return new Errores('Semantico', `No se puede comparar un booleano con otro tipo`, this.Linea, this.Columna);
            case TipoDato.CARACTER:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return Expresion1.charCodeAt(0) <= parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return Expresion1.charCodeAt(0) <= parseFloat(Expresion2);
                    case TipoDato.CARACTER:
                        return Expresion1 < Expresion2;
                    default:
                        return new Errores('Semantico', `No se puede comparar un caracter con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            default:
                return new Errores('Semantico', `No se puede comparar un tipo ${tipo1}`, this.Linea, this.Columna);
        }
    }
    MayorQ(Expresion1: any, Expresion2: any) {
        let tipo1 = this.Expresion1?.Tipo.getTipo();
        let tipo2 = this.Expresion2?.Tipo.getTipo();
        switch (tipo1) {
            case TipoDato.ENTERO:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        
                        return parseInt(Expresion1) > parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return parseInt(Expresion1) > parseFloat(Expresion2);
                    case TipoDato.CADENA:
                        return new Errores('Semantico', `No se puede comparar un entero con una cadena`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return parseInt(Expresion1) > (Expresion2 ? 1 : 0);
                    case TipoDato.CARACTER:
                        return parseInt(Expresion1) > Expresion2.charCodeAt(0);
                    default:
                        return new Errores('Semantico', `No se puede comparar un entero con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case TipoDato.DECIMAL:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return parseFloat(Expresion1) > parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return parseFloat(Expresion1) > parseFloat(Expresion2);
                    case TipoDato.CADENA:
                        return new Errores('Semantico', `No se puede comparar un decimal con una cadena`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return parseFloat(Expresion1) > (Expresion2 ? 1 : 0);
                    case TipoDato.CARACTER:
                        return parseFloat(Expresion1) > Expresion2.charCodeAt(0);
                    default:
                        return new Errores('Semantico', `No se puede comparar un decimal con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case TipoDato.CADENA:
                return new Errores('Semantico', `No se puede comparar una cadena con otro tipo`, this.Linea, this.Columna);
            case TipoDato.BOOLEANO:
                return new Errores('Semantico', `No se puede comparar un booleano con otro tipo`, this.Linea, this.Columna);
            case TipoDato.CARACTER:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return Expresion1.charCodeAt(0) > parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return Expresion1.charCodeAt(0) > parseFloat(Expresion2);
                    case TipoDato.CARACTER:
                        return Expresion1 < Expresion2;
                    default:
                        return new Errores('Semantico', `No se puede comparar un caracter con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            default:
                return new Errores('Semantico', `No se puede comparar un tipo ${tipo1}`, this.Linea, this.Columna);
        }
    }
    MayorIgualQ(Expresion1: any, Expresion2: any) {
        let tipo1 = this.Expresion1?.Tipo.getTipo();
        let tipo2 = this.Expresion2?.Tipo.getTipo();
        switch (tipo1) {
            case TipoDato.ENTERO:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return parseInt(Expresion1) >= parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return parseInt(Expresion1) >= parseFloat(Expresion2);
                    case TipoDato.CADENA:
                        return new Errores('Semantico', `No se puede comparar un entero con una cadena`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return parseInt(Expresion1) >= (Expresion2 ? 1 : 0);
                    case TipoDato.CARACTER:
                        return parseInt(Expresion1) >= Expresion2.charCodeAt(0);
                    default:
                        return new Errores('Semantico', `No se puede comparar un entero con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case TipoDato.DECIMAL:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return parseFloat(Expresion1) >= parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return parseFloat(Expresion1) >= parseFloat(Expresion2);
                    case TipoDato.CADENA:
                        return new Errores('Semantico', `No se puede comparar un decimal con una cadena`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return parseFloat(Expresion1) >= (Expresion2 ? 1 : 0);
                    case TipoDato.CARACTER:
                        return parseFloat(Expresion1) >= Expresion2.charCodeAt(0);
                    default:
                        return new Errores('Semantico', `No se puede comparar un decimal con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case TipoDato.CADENA:
                return new Errores('Semantico', `No se puede comparar una cadena con otro tipo`, this.Linea, this.Columna);
            case TipoDato.BOOLEANO:
                return new Errores('Semantico', `No se puede comparar un booleano con otro tipo`, this.Linea, this.Columna);
            case TipoDato.CARACTER:
                switch (tipo2) {
                    case TipoDato.ENTERO:
                        return Expresion1.charCodeAt(0) >= parseInt(Expresion2);
                    case TipoDato.DECIMAL:
                        return Expresion1.charCodeAt(0) >= parseFloat(Expresion2);
                    case TipoDato.CARACTER:
                        return Expresion1 < Expresion2;
                    default:
                        return new Errores('Semantico', `No se puede comparar un caracter con un tipo ${tipo2}`, this.Linea, this.Columna);
                } 
            default:
                return new Errores('Semantico', `No se puede comparar un tipo ${tipo1}`, this.Linea, this.Columna);
        }
    }

    Or(Expresion1: any, Expresion2: any) {
        let tipo1 = this.Expresion1?.Tipo.getTipo();
        let tipo2 = this.Expresion2?.Tipo.getTipo();

        // Validar tipos de datos válidos para la operación OR
        if (tipo1 === TipoDato.BOOLEANO && tipo2 === TipoDato.BOOLEANO) {
            return Expresion1 || Expresion2;
        } else {
            return new Errores('Semantico', `No se pueden realizar operaciones lógicas OR entre tipos ${tipo1} y ${tipo2}`, this.Linea, this.Columna);
        }
    }

    And(Expresion1: any, Expresion2: any) {
        let tipo1 = this.Expresion1?.Tipo.getTipo();
        let tipo2 = this.Expresion2?.Tipo.getTipo();

        // Validar tipos de datos válidos para la operación AND
        if (tipo1 === TipoDato.BOOLEANO && tipo2 === TipoDato.BOOLEANO) {
            return Expresion1 && Expresion2;
        } else {
            return new Errores('Semantico', `No se pueden realizar operaciones lógicas AND entre tipos ${tipo1} y ${tipo2}`, this.Linea, this.Columna);
        }
    }

    Not(ExpresionUnica: any) {
        let tipo = this.ExpresionUnica?.Tipo.getTipo();

        // Validar tipo de dato válido para la operación NOT
        if (tipo === TipoDato.BOOLEANO) {
            return !ExpresionUnica;
        } else {
            return new Errores('Semantico', `No se puede realizar la operación lógica NOT sobre un tipo ${tipo}`, this.Linea, this.Columna);
        }
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