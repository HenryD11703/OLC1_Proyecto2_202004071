"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperadorAritmetico = void 0;
const Instruccion_1 = require("../Abstracto/Instruccion");
const Tipo_1 = __importStar(require("../SimboloC/Tipo"));
const Errores_1 = __importDefault(require("../Excepciones/Errores"));
class Aritmetica extends Instruccion_1.Instruccion {
    constructor(operador, fila, columna, operando1, operando2) {
        super(new Tipo_1.default(Tipo_1.TipoDato.VOID), fila, columna);
        this.Operador = operador;
        if (!operando2)
            this.operandoUnico = operando1;
        else {
            this.Operando1 = operando1;
            this.Operando2 = operando2;
        }
    }
    interpretar(ArbolS, tabla) {
        var _a, _b;
        let operadorIzq, operadorDer, operadorUnico = null;
        if (this.operandoUnico != null) {
            operadorUnico = this.operandoUnico.interpretar(ArbolS, tabla);
            if (operadorUnico instanceof Errores_1.default)
                return operadorUnico;
        }
        else {
            operadorIzq = (_a = this.Operando1) === null || _a === void 0 ? void 0 : _a.interpretar(ArbolS, tabla);
            if (operadorIzq instanceof Errores_1.default)
                return operadorIzq;
            operadorDer = (_b = this.Operando2) === null || _b === void 0 ? void 0 : _b.interpretar(ArbolS, tabla);
            if (operadorDer instanceof Errores_1.default)
                return operadorDer;
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
                return new Errores_1.default('Error Semantico', `El operador ${this.Operador} no es valido`, this.Linea, this.Columna);
        }
    }
    division(operadorIzq, operadorDer) {
        var _a, _b;
        let Tipo1 = (_a = this.Operando1) === null || _a === void 0 ? void 0 : _a.Tipo.getTipo();
        let Tipo2 = (_b = this.Operando2) === null || _b === void 0 ? void 0 : _b.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch (Tipo1) {
            case Tipo_1.TipoDato.ENTERO:
                switch (Tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseInt(operadorIzq) / parseInt(operadorDer);
                    case Tipo_1.TipoDato.DECIMAL:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) / parseFloat(operadorDer);
                    default:
                        return new Errores_1.default('Error Semantico', `No se puede dividir ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case Tipo_1.TipoDato.DECIMAL:
                switch (Tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) / parseFloat(operadorDer);
                    case Tipo_1.TipoDato.DECIMAL:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) / parseFloat(operadorDer);
                    default:
                        return new Errores_1.default('Error Semantico', `No se puede dividir ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            //case TipoDato.CARACTER: Aca hacer las operaciones de division segun el tipo de dato segun el enunciado del proyecto
            default:
                return new Errores_1.default('Error Semantico', `No se puede dividir ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
        }
    }
    multiplicacion(operadorIzq, operadorDer) {
        var _a, _b;
        let Tipo1 = (_a = this.Operando1) === null || _a === void 0 ? void 0 : _a.Tipo.getTipo();
        let Tipo2 = (_b = this.Operando2) === null || _b === void 0 ? void 0 : _b.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch (Tipo1) {
            case Tipo_1.TipoDato.ENTERO:
                switch (Tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.ENTERO);
                        return parseInt(operadorIzq) * parseInt(operadorDer);
                    case Tipo_1.TipoDato.DECIMAL:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) * parseFloat(operadorDer);
                    default:
                        return new Errores_1.default('Error Semantico', `No se puede multiplicar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case Tipo_1.TipoDato.DECIMAL:
                switch (Tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) * parseFloat(operadorDer);
                    case Tipo_1.TipoDato.DECIMAL:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) * parseFloat(operadorDer);
                    default:
                        return new Errores_1.default('Error Semantico', `No se puede multiplicar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            //case TipoDato.CARACTER: Aca hacer las operaciones de multiplicacion segun el tipo de dato segun el enunciado del proyecto
            default:
                return new Errores_1.default('Error Semantico', `No se puede multiplicar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
        }
    }
    suma(operadorIzq, operadorDer) {
        var _a, _b;
        let Tipo1 = (_a = this.Operando1) === null || _a === void 0 ? void 0 : _a.Tipo.getTipo();
        let Tipo2 = (_b = this.Operando2) === null || _b === void 0 ? void 0 : _b.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch (Tipo1) {
            case Tipo_1.TipoDato.ENTERO:
                switch (Tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.ENTERO);
                        return parseInt(operadorIzq) + parseInt(operadorDer);
                    case Tipo_1.TipoDato.DECIMAL:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) + parseFloat(operadorDer);
                    case Tipo_1.TipoDato.BOOLEANO:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.ENTERO);
                        return parseInt(operadorIzq) + (operadorDer ? 1 : 0);
                    case Tipo_1.TipoDato.CARACTER: //al sumar un int con un char se suma el int al ascii del char
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.ENTERO);
                        return parseInt(operadorIzq) + operadorDer.charCodeAt(0);
                    case Tipo_1.TipoDato.CADENA: //al sumar un int con un string se concatena el int al string
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.CADENA);
                        return operadorIzq + operadorDer;
                    default:
                        return new Errores_1.default('Error Semantico', `No se puede sumar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case Tipo_1.TipoDato.DECIMAL:
                switch (Tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) + parseFloat(operadorDer);
                    case Tipo_1.TipoDato.DECIMAL:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) + parseFloat(operadorDer);
                    case Tipo_1.TipoDato.BOOLEANO:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) + (operadorDer ? 1 : 0);
                    case Tipo_1.TipoDato.CARACTER: //al sumar un double con un char se suma el double al ascii del char
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) + operadorDer.charCodeAt(0);
                    case Tipo_1.TipoDato.CADENA: //al sumar un double con un string se concatena el double al string
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.CADENA);
                        return operadorIzq + operadorDer;
                    default:
                        return new Errores_1.default('Error Semantico', `No se puede sumar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case Tipo_1.TipoDato.BOOLEANO:
                switch (Tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.ENTERO);
                        return (operadorIzq ? 1 : 0) + parseInt(operadorDer);
                    case Tipo_1.TipoDato.DECIMAL:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return (operadorIzq ? 1 : 0) + parseFloat(operadorDer);
                    case Tipo_1.TipoDato.BOOLEANO:
                        return new Errores_1.default('Error Semantico', `No se puede sumar Booleano con Booleano`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.CARACTER: //al sumar un boolean con un char se suma el boolean al ascii del char
                        return new Errores_1.default('Error Semantico', `No se puede sumar Booleano con Char`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.CADENA: //al sumar un boolean con un string se concatena el boolean al string
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.CADENA);
                        return operadorIzq + operadorDer;
                    default:
                        return new Errores_1.default('Error Semantico', `No se puede sumar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            default:
                return new Errores_1.default('Error Semantico', `No se puede sumar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
        }
    }
    resta(operadorIzq, operadorDer) {
        var _a, _b;
        let Tipo1 = (_a = this.Operando1) === null || _a === void 0 ? void 0 : _a.Tipo.getTipo();
        let Tipo2 = (_b = this.Operando2) === null || _b === void 0 ? void 0 : _b.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch (Tipo1) {
            case Tipo_1.TipoDato.ENTERO:
                switch (Tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.ENTERO);
                        return parseInt(operadorIzq) - parseInt(operadorDer);
                    case Tipo_1.TipoDato.DECIMAL:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) - parseFloat(operadorDer);
                    default:
                        return new Errores_1.default('Error Semantico', `No se puede restar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case Tipo_1.TipoDato.DECIMAL:
                switch (Tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) - parseFloat(operadorDer);
                    case Tipo_1.TipoDato.DECIMAL:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) - parseFloat(operadorDer);
                    default:
                        return new Errores_1.default('Error Semantico', `No se puede restar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            //case TipoDato.CARACTER: Aca hacer las operaciones de resta segun el tipo de dato segun el enunciado del proyecto
            default:
                return new Errores_1.default('Error Semantico', `No se puede restar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
        }
    }
    negacion(operadorUnico) {
        var _a;
        let Tipo1 = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch (Tipo1) {
            case Tipo_1.TipoDato.ENTERO:
                this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.ENTERO);
                return -parseInt(operadorUnico);
            case Tipo_1.TipoDato.DECIMAL:
                this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                return -parseFloat(operadorUnico);
            default:
                return new Errores_1.default('Error Semantico', `No se puede negar ${Tipo1}`, this.Linea, this.Columna);
        }
    }
    potencia(operadorIzq, operadorDer) {
        var _a, _b;
        let Tipo1 = (_a = this.Operando1) === null || _a === void 0 ? void 0 : _a.Tipo.getTipo();
        let Tipo2 = (_b = this.Operando2) === null || _b === void 0 ? void 0 : _b.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch (Tipo1) {
            case Tipo_1.TipoDato.ENTERO:
                switch (Tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.ENTERO);
                        return Math.pow(parseInt(operadorIzq), parseInt(operadorDer));
                    case Tipo_1.TipoDato.DECIMAL:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return Math.pow(parseInt(operadorIzq), parseFloat(operadorDer));
                    default:
                        return new Errores_1.default('Error Semantico', `No se puede elevar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case Tipo_1.TipoDato.DECIMAL:
                switch (Tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return Math.pow(parseFloat(operadorIzq), parseInt(operadorDer));
                    case Tipo_1.TipoDato.DECIMAL:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return Math.pow(parseFloat(operadorIzq), parseFloat(operadorDer));
                    default:
                        return new Errores_1.default('Error Semantico', `No se puede elevar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            default:
                return new Errores_1.default('Error Semantico', `No se puede elevar ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
        }
    }
    modulo(operadorIzq, operadorDer) {
        var _a, _b;
        let Tipo1 = (_a = this.Operando1) === null || _a === void 0 ? void 0 : _a.Tipo.getTipo();
        let Tipo2 = (_b = this.Operando2) === null || _b === void 0 ? void 0 : _b.Tipo.getTipo();
        // Aca se pueden validar los tipos de datos
        switch (Tipo1) {
            case Tipo_1.TipoDato.ENTERO:
                switch (Tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.ENTERO);
                        return parseInt(operadorIzq) % parseInt(operadorDer);
                    case Tipo_1.TipoDato.DECIMAL:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) % parseFloat(operadorDer);
                    default:
                        return new Errores_1.default('Error Semantico', `No se puede sacar modulo ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            case Tipo_1.TipoDato.DECIMAL:
                switch (Tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) % parseFloat(operadorDer);
                    case Tipo_1.TipoDato.DECIMAL:
                        this.Tipo = new Tipo_1.default(Tipo_1.TipoDato.DECIMAL);
                        return parseFloat(operadorIzq) % parseFloat(operadorDer);
                    default:
                        return new Errores_1.default('Error Semantico', `No se puede sacar modulo ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
                        break;
                }
            //case TipoDato.CARACTER: Aca hacer las operaciones de modulo segun el tipo de dato segun el enunciado del proyecto
            default:
                return new Errores_1.default('Error Semantico', `No se puede sacar modulo ${Tipo1} con ${Tipo2}`, this.Linea, this.Columna);
        }
    }
}
exports.default = Aritmetica;
var OperadorAritmetico;
(function (OperadorAritmetico) {
    OperadorAritmetico[OperadorAritmetico["SUMA"] = 0] = "SUMA";
    OperadorAritmetico[OperadorAritmetico["RESTA"] = 1] = "RESTA";
    OperadorAritmetico[OperadorAritmetico["NEGACION"] = 2] = "NEGACION";
    OperadorAritmetico[OperadorAritmetico["MULTIPLICACION"] = 3] = "MULTIPLICACION";
    OperadorAritmetico[OperadorAritmetico["DIVISION"] = 4] = "DIVISION";
    OperadorAritmetico[OperadorAritmetico["POTENCIA"] = 5] = "POTENCIA";
    OperadorAritmetico[OperadorAritmetico["MODULO"] = 6] = "MODULO";
})(OperadorAritmetico || (exports.OperadorAritmetico = OperadorAritmetico = {}));
