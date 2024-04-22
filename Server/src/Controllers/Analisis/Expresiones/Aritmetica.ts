import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";
import Contador from "../SimboloC/Contador";

export default class Aritmetica extends Instruccion {
    private Operando1: Instruccion | undefined;
    private Operando2: Instruccion | undefined;
    private Operador: OperadorAritmetico;
    private operandoUnico: Instruccion | undefined;

    constructor(operador: OperadorAritmetico, fila: number, columna: number, operando1: Instruccion, operando2?: Instruccion) {
        super(new Tipo(TipoDato.VOID), fila, columna);
        this.Operador = operador;
        if (!operando2) this.operandoUnico = operando1;
        else {
            this.Operando1 = operando1;
            this.Operando2 = operando2;
        }
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let operadorIzq, operadorDer, operadorUnico = null;
        if (this.operandoUnico != null) {
            operadorUnico = this.operandoUnico.interpretar(ArbolS, tabla);
            if (operadorUnico instanceof Errores) return operadorUnico;
        } else {
            operadorIzq = this.Operando1?.interpretar(ArbolS, tabla);
            if (operadorIzq instanceof Errores) return operadorIzq;
            operadorDer = this.Operando2?.interpretar(ArbolS, tabla);
            if (operadorDer instanceof Errores) return operadorDer;

        }
        switch (this.Operador) {
            case OperadorAritmetico.SUMA:

                return this.suma(operadorIzq, operadorDer);
            case OperadorAritmetico.RESTA:
                return this.resta(operadorIzq, operadorDer);
            case OperadorAritmetico.NEGACION:
                return this.negacion(operadorUnico);
            case OperadorAritmetico.MULTIPLICACION:
                return this.multiplicacion(operadorIzq, operadorDer);
            case OperadorAritmetico.DIVISION:
                return this.division(operadorIzq, operadorDer);
            case OperadorAritmetico.POTENCIA:
                return this.potencia(operadorIzq, operadorDer);
            case OperadorAritmetico.MODULO:
                return this.modulo(operadorIzq, operadorDer);
            default:
                return new Errores('Error Semantico', `El operador ${this.Operador} no es valido`, this.Linea, this.Columna);

        }
    }

    suma(operadorIzq: any, operadorDer: any) {
        let Tipo1 = this.Operando1?.Tipo.getTipo();
        let Tipo2 = this.Operando2?.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch (Tipo1) {
            case TipoDato.ENTERO:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return parseInt(operadorIzq) + parseInt(operadorDer);
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) + parseFloat(operadorDer);
                    case TipoDato.BOOLEANO:
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return parseInt(operadorIzq) + (operadorDer ? 1 : 0);
                    case TipoDato.CARACTER: //al sumar un int con un char se suma el int al ascii del char
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return parseInt(operadorIzq) + operadorDer.charCodeAt(0);
                    case TipoDato.CADENA: //al sumar un int con un string se concatena el int al string
                        this.Tipo = new Tipo(TipoDato.CADENA);
                        return operadorIzq + operadorDer;
                    default:
                        return new Errores('Error Semantico', `No se puede sumar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.DECIMAL:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) + parseFloat(operadorDer);
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) + parseFloat(operadorDer);
                    case TipoDato.BOOLEANO:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) + (operadorDer ? 1 : 0);
                    case TipoDato.CARACTER: //al sumar un double con un char se suma el double al ascii del char
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) + operadorDer.charCodeAt(0);
                    case TipoDato.CADENA: //al sumar un double con un string se concatena el double al string
                        this.Tipo = new Tipo(TipoDato.CADENA);
                        return operadorIzq + operadorDer;
                    default:
                        return new Errores('Error Semantico', `No se puede sumar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.BOOLEANO:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return (operadorIzq ? 1 : 0) + parseInt(operadorDer);
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return (operadorIzq ? 1 : 0) + parseFloat(operadorDer);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede sumar Booleano con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER: //al sumar un boolean con un char se suma el boolean al ascii del char
                        return new Errores('Error Semantico', `No se puede sumar Booleano con Char`, this.Linea, this.Columna);
                    case TipoDato.CADENA: //al sumar un boolean con un string se concatena el boolean al string
                        this.Tipo = new Tipo(TipoDato.CADENA);
                        return operadorIzq + operadorDer;
                    default:
                        return new Errores('Error Semantico', `No se puede sumar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.CARACTER:
                switch (Tipo2) {
                    case TipoDato.ENTERO: //al sumar un char con un int se suma el ascii del char al int
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return operadorIzq.charCodeAt(0) + parseInt(operadorDer);
                    case TipoDato.DECIMAL: //al sumar un char con un double se suma el ascii del char al double
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return operadorIzq.charCodeAt(0) + parseFloat(operadorDer);
                    case TipoDato.BOOLEANO: //al sumar un char con un boolean se suma el ascii del char al boolean
                        return new Errores('Error Semantico', `No se puede sumar Char con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER: //al sumar dos chars se adjuntan los dos chars y forman una cadena
                        this.Tipo = new Tipo(TipoDato.CADENA);
                        return operadorIzq + operadorDer;
                    case TipoDato.CADENA: //al sumar un char con un string se adjunta el char al string
                        this.Tipo = new Tipo(TipoDato.CADENA);
                        return operadorIzq + operadorDer;
                    default:
                        return new Errores('Error Semantico', `No se puede sumar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.CADENA:
                switch (Tipo2) {
                    case TipoDato.ENTERO: //al sumar un string con un int se concatena el int al string
                        this.Tipo = new Tipo(TipoDato.CADENA);
                        return operadorIzq + operadorDer;
                    case TipoDato.DECIMAL: //al sumar un string con un double se concatena el double al string
                        this.Tipo = new Tipo(TipoDato.CADENA);
                        return operadorIzq + operadorDer;
                    case TipoDato.BOOLEANO: //al sumar un string con un boolean se concatena el boolean al string
                        this.Tipo = new Tipo(TipoDato.CADENA);
                        return operadorIzq + operadorDer;
                    case TipoDato.CARACTER: //al sumar un string con un char se concatena el char al string
                        this.Tipo = new Tipo(TipoDato.CADENA);
                        return operadorIzq + operadorDer;
                    case TipoDato.CADENA: //al sumar dos strings se concatenan
                        this.Tipo = new Tipo(TipoDato.CADENA);
                        return operadorIzq + operadorDer;
                    default:
                        return new Errores('Error Semantico', `No se puede sumar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            default:
                return new Errores('Error Semantico', `No se puede sumar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
        }

    }

    resta(operadorIzq: any, operadorDer: any) {
        let Tipo1 = this.Operando1?.Tipo.getTipo();
        let Tipo2 = this.Operando2?.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch (Tipo1) {
            case TipoDato.ENTERO:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return parseInt(operadorIzq) - parseInt(operadorDer);
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) - parseFloat(operadorDer);
                    case TipoDato.BOOLEANO:
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return parseInt(operadorIzq) - (operadorDer ? 1 : 0);
                    case TipoDato.CARACTER: //al restar un int con un char se resta el int al ascii del char
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return parseInt(operadorIzq) - operadorDer.charCodeAt(0);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede restas un Entero y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede restar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.DECIMAL:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) - parseFloat(operadorDer);
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) - parseFloat(operadorDer);
                    case TipoDato.BOOLEANO:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) - (operadorDer ? 1 : 0);
                    case TipoDato.CARACTER: //al restar un double con un char se resta el double al ascii del char
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) - operadorDer.charCodeAt(0);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede restar un Decimal y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede restar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.BOOLEANO:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return (operadorIzq ? 1 : 0) - parseInt(operadorDer);
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return (operadorIzq ? 1 : 0) - parseFloat(operadorDer);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede restar Booleano con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER: //al restar un boolean con un char se resta el ascii del char al boolean
                        return new Errores('Error Semantico', `No se puede restar Booleano con Char`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede restar un Booleano y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede restar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.CARACTER:
                switch (Tipo2) {
                    case TipoDato.ENTERO: //al restar un char con un int se resta el ascii del char al int
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return operadorIzq.charCodeAt(0) - parseInt(operadorDer);
                    case TipoDato.DECIMAL: //al restar un char con un double se resta el ascii del char al double
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return operadorIzq.charCodeAt(0) - parseFloat(operadorDer);
                    case TipoDato.BOOLEANO: //al restar un char con un boolean se resta el ascii del char al boolean
                        return new Errores('Error Semantico', `No se puede restar Char con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Error Semantico', `No se puede restar dos caracteres`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede restar un Char y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede restar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.CADENA:
                switch (Tipo2) {//no se pueden restar cadenas con nada
                    case TipoDato.ENTERO:
                        return new Errores('Error Semantico', `No se puede restar una cadena con un entero`, this.Linea, this.Columna);
                    case TipoDato.DECIMAL:
                        return new Errores('Error Semantico', `No se puede restar una cadena con un decimal`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede restar una cadena con un booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Error Semantico', `No se puede restar una cadena con un caracter`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede restar dos cadenas`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede restar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            default:
                return new Errores('Error Semantico', `No se puede restar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
        }

    }

    multiplicacion(operadorIzq: any, operadorDer: any) {
        let Tipo1 = this.Operando1?.Tipo.getTipo();
        let Tipo2 = this.Operando2?.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch (Tipo1) {
            case TipoDato.ENTERO:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return parseInt(operadorIzq) * parseInt(operadorDer);
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) * parseFloat(operadorDer);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede multiplicar Entero con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER: //al multiplicar un int con un char se multiplica el int al ascii del char
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return parseInt(operadorIzq) * operadorDer.charCodeAt(0);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede multiplicar un Entero y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede multiplicar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.DECIMAL:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) * parseFloat(operadorDer);
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) * parseFloat(operadorDer);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede multiplicar Decimal con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER: //al multiplicar un double con un char se multiplica el double al ascii del char
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) * operadorDer.charCodeAt(0);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede multiplicar un Decimal y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede multiplicar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.BOOLEANO:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        return new Errores('Error Semantico', `No se puede multiplicar Booleano con Entero`, this.Linea, this.Columna);
                    case TipoDato.DECIMAL:
                        return new Errores('Error Semantico', `No se puede multiplicar Booleano con Decimal`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede multiplicar Booleano con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER: //al multiplicar un boolean con un char se multiplica el boolean al ascii del char
                        return new Errores('Error Semantico', `No se puede multiplicar Booleano con Char`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede multiplicar un Booleano y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede multiplicar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.CARACTER:
                switch (Tipo2) {
                    case TipoDato.ENTERO: //al multiplicar un char con un int se multiplica el ascii del char al int
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return operadorIzq.charCodeAt(0) * parseInt(operadorDer);
                    case TipoDato.DECIMAL: //al multiplicar un char con un double se multiplica el ascii del char al double
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return operadorIzq.charCodeAt(0) * parseFloat(operadorDer);
                    case TipoDato.BOOLEANO: //al multiplicar un char con un boolean se multiplica el ascii del char al boolean
                        return new Errores('Error Semantico', `No se puede multiplicar Char con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Error Semantico', `No se puede multiplicar dos caracteres`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede multiplicar un Char y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede multiplicar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.CADENA:
                switch (Tipo2) {//no se pueden multiplicar cadenas con nada
                    case TipoDato.ENTERO:
                        return new Errores('Error Semantico', `No se puede multiplicar una cadena con un entero`, this.Linea, this.Columna);
                    case TipoDato.DECIMAL:
                        return new Errores('Error Semantico', `No se puede multiplicar una cadena con un decimal`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede multiplicar una cadena con un booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Error Semantico', `No se puede multiplicar una cadena con un caracter`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede multiplicar dos cadenas`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede multiplicar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            default:
                return new Errores('Error Semantico', `No se puede multiplicar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
        }
    }

    division(operadorIzq: any, operadorDer: any) {
        let Tipo1 = this.Operando1?.Tipo.getTipo();
        let Tipo2 = this.Operando2?.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        //Division entre 0
        if (operadorDer == 0) {
            return new Errores('Error Semantico', `No se puede dividir entre 0`, this.Linea, this.Columna);
        }

        switch (Tipo1) {
            case TipoDato.ENTERO:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);

                        return parseFloat(operadorIzq) / parseFloat(operadorDer);

                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) / parseFloat(operadorDer);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede dividir Entero con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER: //al dividir un int con un char se divide el int al ascii del char
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseInt(operadorIzq) / operadorDer.charCodeAt(0);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede dividir un Entero y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede dividir ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.DECIMAL:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) / parseFloat(operadorDer);
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) / parseFloat(operadorDer);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede dividir Decimal con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER: //al dividir un double con un char se divide el double al ascii del char
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) / operadorDer.charCodeAt(0);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede dividir un Decimal y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede dividir ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.BOOLEANO:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        return new Errores('Error Semantico', `No se puede dividir Booleano con Entero`, this.Linea, this.Columna);
                    case TipoDato.DECIMAL:
                        return new Errores('Error Semantico', `No se puede dividir Booleano con Decimal`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede dividir Booleano con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER: //al dividir un boolean con un char se divide el ascii del char al boolean
                        return new Errores('Error Semantico', `No se puede dividir Booleano con Char`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede dividir un Booleano y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede dividir ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.CARACTER:
                switch (Tipo2) {
                    case TipoDato.ENTERO: //al dividir un char con un int se divide el ascii del char al int
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return operadorIzq.charCodeAt(0) / parseInt(operadorDer);
                    case TipoDato.DECIMAL: //al dividir un char con un double se divide el ascii del char al double
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return operadorIzq.charCodeAt(0) / parseFloat(operadorDer);
                    case TipoDato.BOOLEANO: //al dividir un char con un boolean se divide el ascii del char al boolean
                        return new Errores('Error Semantico', `No se puede dividir Char con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Error Semantico', `No se puede dividir dos caracteres`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede dividir un Char y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede dividir ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.CADENA:
                switch (Tipo2) {//no se pueden dividir cadenas con nada
                    case TipoDato.ENTERO:
                        return new Errores('Error Semantico', `No se puede dividir una cadena con un entero`, this.Linea, this.Columna);
                    case TipoDato.DECIMAL:
                        return new Errores('Error Semantico', `No se puede dividir una cadena con un decimal`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede dividir una cadena con un booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Error Semantico', `No se puede dividir una cadena con un caracter`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede dividir dos cadenas`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede dividir ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            default:
                return new Errores('Error Semantico', `No se puede dividir ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
        }
    }

    potencia(operadorIzq: any, operadorDer: any) {
        let Tipo1 = this.Operando1?.Tipo.getTipo();
        let Tipo2 = this.Operando2?.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch (Tipo1) {
            case TipoDato.ENTERO:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return Math.pow(parseInt(operadorIzq), parseInt(operadorDer));
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return Math.pow(parseInt(operadorIzq), parseFloat(operadorDer));
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede elevar Entero con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Error Semantico', `No se puede elevar Entero con Char`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede elevar un Entero y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede elevar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.DECIMAL:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return Math.pow(parseFloat(operadorIzq), parseInt(operadorDer));
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return Math.pow(parseFloat(operadorIzq), parseFloat(operadorDer));
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede elevar Decimal con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Error Semantico', `No se puede elevar Decimal con Char`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede elevar un Decimal y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede elevar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.BOOLEANO:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        return new Errores('Error Semantico', `No se puede elevar Booleano con Entero`, this.Linea, this.Columna);
                    case TipoDato.DECIMAL:
                        return new Errores('Error Semantico', `No se puede elevar Booleano con Decimal`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede elevar Booleano con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Error Semantico', `No se puede elevar Booleano con Char`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede elevar un Booleano y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede elevar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.CARACTER:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        return new Errores('Error Semantico', `No se puede elevar Char con Entero`, this.Linea, this.Columna);
                    case TipoDato.DECIMAL:
                        return new Errores('Error Semantico', `No se puede elevar Char con Decimal`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede elevar Char con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Error Semantico', `No se puede elevar dos caracteres`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede elevar un Char y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede elevar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.CADENA:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        return new Errores('Error Semantico', `No se puede elevar una cadena con un entero`, this.Linea, this.Columna);
                    case TipoDato.DECIMAL:
                        return new Errores('Error Semantico', `No se puede elevar una cadena con un decimal`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede elevar una cadena con un booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Error Semantico', `No se puede elevar una cadena con un caracter`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede elevar dos cadenas`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede elevar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            default:
                return new Errores('Error Semantico', `No se puede elevar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
        }
    }

    modulo(operadorIzq: any, operadorDer: any) {//modulo igual que la potencia
        let Tipo1 = this.Operando1?.Tipo.getTipo();
        let Tipo2 = this.Operando2?.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch (Tipo1) {
            case TipoDato.ENTERO:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return parseInt(operadorIzq) % parseInt(operadorDer);
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) % parseFloat(operadorDer);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede sacar modulo Entero con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Error Semantico', `No se puede sacar modulo Entero con Char`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede sacar modulo un Entero y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede sacar modulo ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.DECIMAL:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) % parseFloat(operadorDer);
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) % parseFloat(operadorDer);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede sacar modulo Decimal con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Error Semantico', `No se puede sacar modulo Decimal con Char`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede sacar modulo un Decimal y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede sacar modulo ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.BOOLEANO:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        return new Errores('Error Semantico', `No se puede sacar modulo Booleano con Entero`, this.Linea, this.Columna);
                    case TipoDato.DECIMAL:
                        return new Errores('Error Semantico', `No se puede sacar modulo Booleano con Decimal`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede sacar modulo Booleano con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Error Semantico', `No se puede sacar modulo Booleano con Char`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede sacar modulo un Booleano y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede sacar modulo ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.CARACTER:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        return new Errores('Error Semantico', `No se puede sacar modulo Char con Entero`, this.Linea, this.Columna);
                    case TipoDato.DECIMAL:
                        return new Errores('Error Semantico', `No se puede sacar modulo Char con Decimal`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede sacar modulo Char con Booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Error Semantico', `No se puede sacar modulo dos caracteres`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede sacar modulo un Char y una cadena`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede sacar modulo ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case TipoDato.CADENA:
                switch (Tipo2) {
                    case TipoDato.ENTERO:
                        return new Errores('Error Semantico', `No se puede sacar modulo una cadena con un entero`, this.Linea, this.Columna);
                    case TipoDato.DECIMAL:
                        return new Errores('Error Semantico', `No se puede sacar modulo una cadena con un decimal`, this.Linea, this.Columna);
                    case TipoDato.BOOLEANO:
                        return new Errores('Error Semantico', `No se puede sacar modulo una cadena con un booleano`, this.Linea, this.Columna);
                    case TipoDato.CARACTER:
                        return new Errores('Error Semantico', `No se puede sacar modulo una cadena con un caracter`, this.Linea, this.Columna);
                    case TipoDato.CADENA:
                        return new Errores('Error Semantico', `No se puede sacar modulo dos cadenas`, this.Linea, this.Columna);
                    default:
                        return new Errores('Error Semantico', `No se puede sacar modulo ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            default:
                return new Errores('Error Semantico', `No se puede sacar modulo ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
        }
    }

    negacion(operadorUnico: any) {
        let Tipo1 = this.operandoUnico?.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch (Tipo1) {
            case TipoDato.ENTERO:
                this.Tipo = new Tipo(TipoDato.ENTERO);
                return -parseInt(operadorUnico);
            case TipoDato.DECIMAL:
                this.Tipo = new Tipo(TipoDato.DECIMAL);
                return -parseFloat(operadorUnico);
            case TipoDato.BOOLEANO:
                return new Errores('Error Semantico', `No se puede negar un Booleano`, this.Linea, this.Columna);
            case TipoDato.CARACTER:
                return new Errores('Error Semantico', `No se puede negar un Char`, this.Linea, this.Columna);
            case TipoDato.CADENA:
                return new Errores('Error Semantico', `No se puede negar una cadena`, this.Linea, this.Columna);
            default:
                return new Errores('Error Semantico', `No se puede negar ${Tipo1}`, this.Linea, this.Columna);
        }
    }

    /*
    operacion : expresion MAS expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.SUMA,@1.first_line, @1.first_column, $1, $3);}     
          | expresion RES expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.RESTA,@1.first_line, @1.first_column, $1, $3);}
          | expresion MUL expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.MULTIPLICACION,@1.first_line, @1.first_column, $1, $3);}
          | expresion DIV expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.DIVISION,@1.first_line, @1.first_column, $1, $3);}
          | expresion MOD expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.MODULO,@1.first_line, @1.first_column, $1, $3);}
          | POW PARENTESISI expresion COMA expresion PARENTESISD { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.POTENCIA,@1.first_line, @1.first_column, $3, $5);}
          | RES expresion %prec UMENOS           { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.NEGACION,@1.first_line, @1.first_column, $2);}  
    */

    //poner un nodo expresion del que salga un nodo que sera el numero de la operacion
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let resultado = "";
        let nodoOperacion = `nodo${contador.get()}`;
        resultado += `${nodoOperacion}[label=\"Operacion Aritmetica\"];\n`;

        //validar para cuando sea una operacion unaria
        if (this.Operador == OperadorAritmetico.NEGACION) {
            let nodoNegacion = `nodo${contador.get()}`;

            let nodoExpresion = `nodo${contador.get()}`;
            resultado += `${nodoNegacion}[label=\"-\"];\n`;
            resultado += `${nodoExpresion}[label=\"Expresion\"];\n`;

            resultado += `${anterior} -> ${nodoNegacion};\n`;
            resultado += `${nodoNegacion} -> ${nodoExpresion};\n`;
            resultado += this.Operando1?.buildAst(nodoExpresion);
            resultado += `${nodoOperacion} -> ${nodoNegacion};\n`;

            return resultado;
        } else if (this.Operador == OperadorAritmetico.POTENCIA) {
            let nodoPotencia = `nodo${contador.get()}`;
            let nodoParentesisI = `nodo${contador.get()}`;
            let nodoExpresion1 = `nodo${contador.get()}`;
            let nodoComa = `nodo${contador.get()}`;
            let nodoExpresion2 = `nodo${contador.get()}`;
            let nodoParentesisD = `nodo${contador.get()}`;
            resultado += `${nodoPotencia}[label=\"POW\"];\n`;
            resultado += `${nodoParentesisI}[label=\"(\"];\n`;
            resultado += `${nodoExpresion1}[label=\"Expresion\"];\n`;
            resultado += `${nodoComa}[label=\",\"];\n`;
            resultado += `${nodoExpresion2}[label=\"Expresion\"];\n`;
            resultado += `${nodoParentesisD}[label=\")\"];\n`;
            resultado += this.Operando1?.buildAst(nodoExpresion1);
            resultado += this.Operando2?.buildAst(nodoExpresion2);
            resultado += `${nodoOperacion} -> ${nodoPotencia};\n`;
            resultado += `${nodoPotencia} -> ${nodoParentesisI};\n`;
            resultado += `${nodoPotencia} -> ${nodoExpresion1};\n`;
            resultado += `${nodoPotencia} -> ${nodoComa};\n`;
            resultado += `${nodoPotencia} -> ${nodoExpresion2};\n`;
            resultado += `${nodoPotencia} -> ${nodoParentesisD};\n`;
            return resultado;
        }
        let signoOperacion = "";
        if (this.Operador == OperadorAritmetico.SUMA) {
            signoOperacion = "+";
        } else if (this.Operador == OperadorAritmetico.RESTA) {
            signoOperacion = "-";
        } else if (this.Operador == OperadorAritmetico.MULTIPLICACION) {
            signoOperacion = "*";
        } else if (this.Operador == OperadorAritmetico.DIVISION) {
            signoOperacion = "/";
        } else if (this.Operador == OperadorAritmetico.MODULO) {
            signoOperacion = "%";
        }
        let nodoOperador = `nodo${contador.get()}`;
        let nodoExpresion1 = `nodo${contador.get()}`;
        let nodoExpresion2 = `nodo${contador.get()}`;
        resultado += `${nodoOperador}[label=\"${signoOperacion}\"];\n`;
        resultado += `${nodoExpresion1}[label=\"Expresion\"];\n`;
        resultado += `${nodoExpresion2}[label=\"Expresion\"];\n`;
        resultado += this.Operando1?.buildAst(nodoExpresion1);
        resultado += this.Operando2?.buildAst(nodoExpresion2);
        resultado += `${nodoOperacion} -> ${nodoOperador};\n`;
        resultado += `${nodoOperador} -> ${nodoExpresion1};\n`;
        resultado += `${nodoOperador} -> ${nodoExpresion2};\n`;
        return resultado;

    }

}
export enum OperadorAritmetico {
    SUMA,
    RESTA,
    NEGACION,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    MODULO
}

