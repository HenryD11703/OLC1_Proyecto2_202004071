import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";

export default class Aritmetica extends Instruccion {
    private Operando1: Instruccion | undefined;
    private Operando2: Instruccion | undefined;
    private Operador: OperadorAritmetico;
    private operandoUnico: Instruccion | undefined;

    constructor(operador:OperadorAritmetico, fila: number, columna: number, operando1:Instruccion, operando2?:Instruccion){
        super(new Tipo(TipoDato.VOID), fila, columna);
        this.Operador = operador;
        if(!operando2) this.operandoUnico = operando1;
        else {
            this.Operando1 = operando1;
            this.Operando2 = operando2;
        }
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let operadorIzq, operadorDer, operadorUnico = null; 
        if(this.operandoUnico!=null){
            operadorUnico = this.operandoUnico.interpretar(ArbolS, tabla);
            if(operadorUnico instanceof Errores) return operadorUnico;
        }else{
            operadorIzq = this.Operando1?.interpretar(ArbolS, tabla);
            if(operadorIzq instanceof Errores) return operadorIzq;
            operadorDer = this.Operando2?.interpretar(ArbolS, tabla);
            if(operadorDer instanceof Errores) return operadorDer;
        
        }
        switch(this.Operador){
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

    division(operadorIzq: any, operadorDer: any){
        let Tipo1 = this.Operando1?.Tipo.getTipo();
        let Tipo2 = this.Operando2?.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch(Tipo1){
            case TipoDato.ENTERO:
                switch(Tipo2){
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseInt(operadorIzq) / parseInt(operadorDer);
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) / parseFloat(operadorDer);
                    default:
                        return new Errores('Error Semantico', `No se puede dividir ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                break; 
                }
            case TipoDato.DECIMAL:
                switch(Tipo2){
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) / parseFloat(operadorDer); 
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) / parseFloat(operadorDer);
                    default:
                        return new Errores('Error Semantico', `No se puede dividir ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                break;
                }
            //case TipoDato.CARACTER: Aca hacer las operaciones de division segun el tipo de dato segun el enunciado del proyecto
            default:
                return new Errores('Error Semantico', `No se puede dividir ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
            }
    }

    multiplicacion(operadorIzq: any, operadorDer: any){
        let Tipo1 = this.Operando1?.Tipo.getTipo();
        let Tipo2 = this.Operando2?.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch(Tipo1){
            case TipoDato.ENTERO:
                switch(Tipo2){
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return parseInt(operadorIzq) * parseInt(operadorDer);
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) * parseFloat(operadorDer);
                    default:
                        return new Errores('Error Semantico', `No se puede multiplicar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                break; 
                }
            case TipoDato.DECIMAL:
                switch(Tipo2){
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) * parseFloat(operadorDer); 
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) * parseFloat(operadorDer);
                    default:
                        return new Errores('Error Semantico', `No se puede multiplicar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                break;
                }
            //case TipoDato.CARACTER: Aca hacer las operaciones de multiplicacion segun el tipo de dato segun el enunciado del proyecto
            default:
                return new Errores('Error Semantico', `No se puede multiplicar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
            }
    }

    suma(operadorIzq: any, operadorDer: any){
        let Tipo1 = this.Operando1?.Tipo.getTipo();
        let Tipo2 = this.Operando2?.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch(Tipo1){
            case TipoDato.ENTERO:
                switch(Tipo2){
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
                switch(Tipo2){
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
                switch(Tipo2){
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
            default:
                return new Errores('Error Semantico', `No se puede sumar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
            }

        }
    
    resta(operadorIzq: any, operadorDer: any){
        let Tipo1 = this.Operando1?.Tipo.getTipo();
        let Tipo2 = this.Operando2?.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch(Tipo1){
            case TipoDato.ENTERO:
                switch(Tipo2){
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return parseInt(operadorIzq) - parseInt(operadorDer);
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) - parseFloat(operadorDer);
                    default:
                        return new Errores('Error Semantico', `No se puede restar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                break; 
                }
            case TipoDato.DECIMAL:
                switch(Tipo2){
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) - parseFloat(operadorDer); 
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) - parseFloat(operadorDer);
                    default:
                        return new Errores('Error Semantico', `No se puede restar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                break;
                }
            //case TipoDato.CARACTER: Aca hacer las operaciones de resta segun el tipo de dato segun el enunciado del proyecto
            default:
                return new Errores('Error Semantico', `No se puede restar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
            }

        }
    
    negacion(operadorUnico: any){
        let Tipo1 = this.operandoUnico?.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch(Tipo1){
            case TipoDato.ENTERO:
                this.Tipo = new Tipo(TipoDato.ENTERO);
                return -parseInt(operadorUnico);
            case TipoDato.DECIMAL:
                this.Tipo = new Tipo(TipoDato.DECIMAL);
                return -parseFloat(operadorUnico);
            default:
                return new Errores('Error Semantico', `No se puede negar ${Tipo1}`, this.Linea, this.Columna);
        }
    }

    potencia(operadorIzq: any, operadorDer: any){
        let Tipo1 = this.Operando1?.Tipo.getTipo();
        let Tipo2 = this.Operando2?.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch(Tipo1){
            case TipoDato.ENTERO:
                switch(Tipo2){
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return Math.pow(parseInt(operadorIzq), parseInt(operadorDer));  
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return Math.pow(parseInt(operadorIzq), parseFloat(operadorDer));
                    default:
                        return new Errores('Error Semantico', `No se puede elevar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                break; 
                }
            case TipoDato.DECIMAL:
                switch(Tipo2){
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return Math.pow(parseFloat(operadorIzq), parseInt(operadorDer)); 
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return Math.pow(parseFloat(operadorIzq), parseFloat(operadorDer));
                    default:
                        return new Errores('Error Semantico', `No se puede elevar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                break;
                }
            
            default:
                return new Errores('Error Semantico', `No se puede elevar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
            }
    }    
    
    modulo(operadorIzq: any, operadorDer: any){
        let Tipo1 = this.Operando1?.Tipo.getTipo();
        let Tipo2 = this.Operando2?.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch(Tipo1){
            case TipoDato.ENTERO:
                switch(Tipo2){
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.ENTERO);
                        return parseInt(operadorIzq) % parseInt(operadorDer);
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) % parseFloat(operadorDer);
                    default:
                        return new Errores('Error Semantico', `No se puede sacar modulo ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                break; 
                }
            case TipoDato.DECIMAL:
                switch(Tipo2){
                    case TipoDato.ENTERO:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) % parseFloat(operadorDer); 
                    case TipoDato.DECIMAL:
                        this.Tipo = new Tipo(TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) % parseFloat(operadorDer);
                    default:
                        return new Errores('Error Semantico', `No se puede sacar modulo ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                break;
                }
            //case TipoDato.CARACTER: Aca hacer las operaciones de modulo segun el tipo de dato segun el enunciado del proyecto
            default:
                return new Errores('Error Semantico', `No se puede sacar modulo ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
            }
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

