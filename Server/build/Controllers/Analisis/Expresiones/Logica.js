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
exports.OperadorLogico = void 0;
const Instruccion_1 = require("../Abstracto/Instruccion");
const Tipo_1 = __importStar(require("../SimboloC/Tipo"));
const Errores_1 = __importDefault(require("../Excepciones/Errores"));
class Logica extends Instruccion_1.Instruccion {
    constructor(operador, linea, columna, Expresion1, Expresion2) {
        super(new Tipo_1.default(Tipo_1.TipoDato.BOOLEANO), linea, columna);
        this.Operador = operador;
        if (!Expresion2)
            this.ExpresionUnica = Expresion1;
        else {
            this.Expresion1 = Expresion1;
            this.Expresion2 = Expresion2;
        }
    }
    interpretar(ArbolS, tabla) {
        var _a, _b;
        let Expresion1, Expresion2, ExpresionUnica = null;
        if (this.ExpresionUnica != null) {
            ExpresionUnica = this.ExpresionUnica.interpretar(ArbolS, tabla);
            if (ExpresionUnica instanceof Errores_1.default)
                return ExpresionUnica;
        }
        else {
            Expresion1 = (_a = this.Expresion1) === null || _a === void 0 ? void 0 : _a.interpretar(ArbolS, tabla);
            if (Expresion1 instanceof Errores_1.default)
                return Expresion1;
            Expresion2 = (_b = this.Expresion2) === null || _b === void 0 ? void 0 : _b.interpretar(ArbolS, tabla);
            if (Expresion2 instanceof Errores_1.default)
                return Expresion2;
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
                return new Errores_1.default('Semantico', `No se encontro el operador ${this.Operador}`, this.Linea, this.Columna);
        }
    }
    //Se pueden realizar operaciones relacionales entre: entero-entero,
    //entero-doble, entero-carácter, doble-entero, doble-carácter,
    //carácter-entero, carácter-doble, carácter-carácter y cualquier otra
    //operación relacional entre entero, doble y carácter.
    //Operaciones como cadena-carácter, es error semántico, a menos que
    //se utilice toString en el carácter.
    //Operaciones relacionales entre booleanos es válida.
    Igualdad(Expresion1, Expresion2) {
        var _a, _b;
        let tipo1 = (_a = this.Expresion1) === null || _a === void 0 ? void 0 : _a.Tipo.getTipo();
        let tipo2 = (_b = this.Expresion2) === null || _b === void 0 ? void 0 : _b.Tipo.getTipo();
        switch (tipo1) {
            case Tipo_1.TipoDato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return parseInt(Expresion1) === parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return parseInt(Expresion1) === parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CADENA:
                        return new Errores_1.default('Semantico', `No se puede comparar un entero con una cadena`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.BOOLEANO:
                        return parseInt(Expresion1) === (Expresion2 ? 1 : 0);
                    case Tipo_1.TipoDato.CARACTER:
                        return parseInt(Expresion1) === Expresion2.charCodeAt(0);
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un entero con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case Tipo_1.TipoDato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return parseFloat(Expresion1) === parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return parseFloat(Expresion1) === parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CADENA:
                        return new Errores_1.default('Semantico', `No se puede comparar un decimal con una cadena`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.BOOLEANO:
                        return parseFloat(Expresion1) === (Expresion2 ? 1 : 0);
                    case Tipo_1.TipoDato.CARACTER:
                        return parseFloat(Expresion1) === Expresion2.charCodeAt(0);
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un decimal con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case Tipo_1.TipoDato.CADENA:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return new Errores_1.default('Semantico', `No se puede comparar una cadena con un entero`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', `No se puede comparar una cadena con un decimal`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.CADENA:
                        return Expresion1 === Expresion2;
                    case Tipo_1.TipoDato.BOOLEANO:
                        return new Errores_1.default('Semantico', `No se puede comparar una cadena con un booleano`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.CARACTER:
                        return new Errores_1.default('Semantico', `No se puede comparar una cadena con un caracter`, this.Linea, this.Columna);
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar una cadena con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case Tipo_1.TipoDato.BOOLEANO:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return (Expresion1 ? 1 : 0) === parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return (Expresion1 ? 1 : 0) === parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CADENA:
                        return new Errores_1.default('Semantico', `No se puede comparar un booleano con una cadena`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.BOOLEANO:
                        return Expresion1 === Expresion2;
                    case Tipo_1.TipoDato.CARACTER:
                        return (Expresion1 ? 1 : 0) === Expresion2.charCodeAt(0);
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un booleano con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case Tipo_1.TipoDato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return Expresion1.charCodeAt(0) === parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return Expresion1.charCodeAt(0) === parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CADENA:
                        return new Errores_1.default('Semantico', `No se puede comparar un caracter con una cadena`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.BOOLEANO:
                        return new Errores_1.default('Semantico', `No se puede comparar un caracter con un booleano`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.CARACTER:
                        return Expresion1 === Expresion2;
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un caracter con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            default:
                return new Errores_1.default('Semantico', `No se puede comparar un tipo ${tipo1}`, this.Linea, this.Columna);
        }
    }
    Diferencia(Expresion1, Expresion2) {
        var _a, _b;
        let tipo1 = (_a = this.Expresion1) === null || _a === void 0 ? void 0 : _a.Tipo.getTipo();
        let tipo2 = (_b = this.Expresion2) === null || _b === void 0 ? void 0 : _b.Tipo.getTipo();
        switch (tipo1) {
            case Tipo_1.TipoDato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return parseInt(Expresion1) !== parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return parseInt(Expresion1) !== parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CADENA:
                        return new Errores_1.default('Semantico', `No se puede comparar un entero con una cadena`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.BOOLEANO:
                        return parseInt(Expresion1) !== (Expresion2 ? 1 : 0);
                    case Tipo_1.TipoDato.CARACTER:
                        return parseInt(Expresion1) !== Expresion2.charCodeAt(0);
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un entero con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case Tipo_1.TipoDato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return parseFloat(Expresion1) !== parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return parseFloat(Expresion1) !== parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CADENA:
                        return new Errores_1.default('Semantico', `No se puede comparar un decimal con una cadena`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.BOOLEANO:
                        return parseFloat(Expresion1) !== (Expresion2 ? 1 : 0);
                    case Tipo_1.TipoDato.CARACTER:
                        return parseFloat(Expresion1) !== Expresion2.charCodeAt(0);
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un decimal con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case Tipo_1.TipoDato.CADENA:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return new Errores_1.default('Semantico', `No se puede comparar una cadena con un entero`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', `No se puede comparar una cadena con un decimal`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.CADENA:
                        return Expresion1 !== Expresion2;
                    case Tipo_1.TipoDato.BOOLEANO:
                        return new Errores_1.default('Semantico', `No se puede comparar una cadena con un booleano`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.CARACTER:
                        return new Errores_1.default('Semantico', `No se puede comparar una cadena con un caracter`, this.Linea, this.Columna);
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar una cadena con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case Tipo_1.TipoDato.BOOLEANO:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return (Expresion1 ? 1 : 0) !== parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return (Expresion1 ? 1 : 0) !== parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CADENA:
                        return new Errores_1.default('Semantico', `No se puede comparar un booleano con una cadena`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.BOOLEANO:
                        return Expresion1 !== Expresion2;
                    case Tipo_1.TipoDato.CARACTER:
                        return (Expresion1 ? 1 : 0) !== Expresion2.charCodeAt(0);
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un booleano con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case Tipo_1.TipoDato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return Expresion1.charCodeAt(0) !== parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return Expresion1.charCodeAt(0) !== parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CADENA:
                        return new Errores_1.default('Semantico', `No se puede comparar un caracter con una cadena`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.BOOLEANO:
                        return new Errores_1.default('Semantico', `No se puede comparar un caracter con un booleano`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.CARACTER:
                        return Expresion1 !== Expresion2;
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un caracter con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            default:
                return new Errores_1.default('Semantico', `No se puede comparar un tipo ${tipo1}`, this.Linea, this.Columna);
        }
    }
    MenorQ(Expresion1, Expresion2) {
        var _a, _b;
        let tipo1 = (_a = this.Expresion1) === null || _a === void 0 ? void 0 : _a.Tipo.getTipo();
        let tipo2 = (_b = this.Expresion2) === null || _b === void 0 ? void 0 : _b.Tipo.getTipo();
        switch (tipo1) {
            case Tipo_1.TipoDato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        console.log(Expresion1, Expresion2);
                        console.log(parseInt(Expresion1) < parseInt(Expresion2));
                        return parseInt(Expresion1) < parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return parseInt(Expresion1) < parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CADENA:
                        return new Errores_1.default('Semantico', `No se puede comparar un entero con una cadena`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.BOOLEANO:
                        return parseInt(Expresion1) < (Expresion2 ? 1 : 0);
                    case Tipo_1.TipoDato.CARACTER:
                        return parseInt(Expresion1) < Expresion2.charCodeAt(0);
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un entero con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case Tipo_1.TipoDato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return parseFloat(Expresion1) < parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return parseFloat(Expresion1) < parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CADENA:
                        return new Errores_1.default('Semantico', `No se puede comparar un decimal con una cadena`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.BOOLEANO:
                        return parseFloat(Expresion1) < (Expresion2 ? 1 : 0);
                    case Tipo_1.TipoDato.CARACTER:
                        return parseFloat(Expresion1) < Expresion2.charCodeAt(0);
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un decimal con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case Tipo_1.TipoDato.CADENA:
                return new Errores_1.default('Semantico', `No se puede comparar una cadena con otro tipo`, this.Linea, this.Columna);
            case Tipo_1.TipoDato.BOOLEANO:
                return new Errores_1.default('Semantico', `No se puede comparar un booleano con otro tipo`, this.Linea, this.Columna);
            case Tipo_1.TipoDato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return Expresion1.charCodeAt(0) < parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return Expresion1.charCodeAt(0) < parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CARACTER:
                        return Expresion1 < Expresion2;
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un caracter con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            default:
                return new Errores_1.default('Semantico', `No se puede comparar un tipo ${tipo1}`, this.Linea, this.Columna);
        }
    }
    MenorIgualQ(Expresion1, Expresion2) {
        var _a, _b;
        let tipo1 = (_a = this.Expresion1) === null || _a === void 0 ? void 0 : _a.Tipo.getTipo();
        let tipo2 = (_b = this.Expresion2) === null || _b === void 0 ? void 0 : _b.Tipo.getTipo();
        switch (tipo1) {
            case Tipo_1.TipoDato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return parseInt(Expresion1) <= parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return parseInt(Expresion1) <= parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CADENA:
                        return new Errores_1.default('Semantico', `No se puede comparar un entero con una cadena`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.BOOLEANO:
                        return parseInt(Expresion1) <= (Expresion2 ? 1 : 0);
                    case Tipo_1.TipoDato.CARACTER:
                        return parseInt(Expresion1) <= Expresion2.charCodeAt(0);
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un entero con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case Tipo_1.TipoDato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return parseFloat(Expresion1) <= parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return parseFloat(Expresion1) <= parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CADENA:
                        return new Errores_1.default('Semantico', `No se puede comparar un decimal con una cadena`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.BOOLEANO:
                        return parseFloat(Expresion1) <= (Expresion2 ? 1 : 0);
                    case Tipo_1.TipoDato.CARACTER:
                        return parseFloat(Expresion1) <= Expresion2.charCodeAt(0);
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un decimal con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case Tipo_1.TipoDato.CADENA:
                return new Errores_1.default('Semantico', `No se puede comparar una cadena con otro tipo`, this.Linea, this.Columna);
            case Tipo_1.TipoDato.BOOLEANO:
                return new Errores_1.default('Semantico', `No se puede comparar un booleano con otro tipo`, this.Linea, this.Columna);
            case Tipo_1.TipoDato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return Expresion1.charCodeAt(0) <= parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return Expresion1.charCodeAt(0) <= parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CARACTER:
                        return Expresion1 < Expresion2;
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un caracter con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            default:
                return new Errores_1.default('Semantico', `No se puede comparar un tipo ${tipo1}`, this.Linea, this.Columna);
        }
    }
    MayorQ(Expresion1, Expresion2) {
        var _a, _b;
        let tipo1 = (_a = this.Expresion1) === null || _a === void 0 ? void 0 : _a.Tipo.getTipo();
        let tipo2 = (_b = this.Expresion2) === null || _b === void 0 ? void 0 : _b.Tipo.getTipo();
        switch (tipo1) {
            case Tipo_1.TipoDato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return parseInt(Expresion1) > parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return parseInt(Expresion1) > parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CADENA:
                        return new Errores_1.default('Semantico', `No se puede comparar un entero con una cadena`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.BOOLEANO:
                        return parseInt(Expresion1) > (Expresion2 ? 1 : 0);
                    case Tipo_1.TipoDato.CARACTER:
                        return parseInt(Expresion1) > Expresion2.charCodeAt(0);
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un entero con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case Tipo_1.TipoDato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return parseFloat(Expresion1) > parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return parseFloat(Expresion1) > parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CADENA:
                        return new Errores_1.default('Semantico', `No se puede comparar un decimal con una cadena`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.BOOLEANO:
                        return parseFloat(Expresion1) > (Expresion2 ? 1 : 0);
                    case Tipo_1.TipoDato.CARACTER:
                        return parseFloat(Expresion1) > Expresion2.charCodeAt(0);
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un decimal con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case Tipo_1.TipoDato.CADENA:
                return new Errores_1.default('Semantico', `No se puede comparar una cadena con otro tipo`, this.Linea, this.Columna);
            case Tipo_1.TipoDato.BOOLEANO:
                return new Errores_1.default('Semantico', `No se puede comparar un booleano con otro tipo`, this.Linea, this.Columna);
            case Tipo_1.TipoDato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return Expresion1.charCodeAt(0) > parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return Expresion1.charCodeAt(0) > parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CARACTER:
                        return Expresion1 < Expresion2;
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un caracter con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            default:
                return new Errores_1.default('Semantico', `No se puede comparar un tipo ${tipo1}`, this.Linea, this.Columna);
        }
    }
    MayorIgualQ(Expresion1, Expresion2) {
        var _a, _b;
        let tipo1 = (_a = this.Expresion1) === null || _a === void 0 ? void 0 : _a.Tipo.getTipo();
        let tipo2 = (_b = this.Expresion2) === null || _b === void 0 ? void 0 : _b.Tipo.getTipo();
        switch (tipo1) {
            case Tipo_1.TipoDato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return parseInt(Expresion1) >= parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return parseInt(Expresion1) >= parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CADENA:
                        return new Errores_1.default('Semantico', `No se puede comparar un entero con una cadena`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.BOOLEANO:
                        return parseInt(Expresion1) >= (Expresion2 ? 1 : 0);
                    case Tipo_1.TipoDato.CARACTER:
                        return parseInt(Expresion1) >= Expresion2.charCodeAt(0);
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un entero con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case Tipo_1.TipoDato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return parseFloat(Expresion1) >= parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return parseFloat(Expresion1) >= parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CADENA:
                        return new Errores_1.default('Semantico', `No se puede comparar un decimal con una cadena`, this.Linea, this.Columna);
                    case Tipo_1.TipoDato.BOOLEANO:
                        return parseFloat(Expresion1) >= (Expresion2 ? 1 : 0);
                    case Tipo_1.TipoDato.CARACTER:
                        return parseFloat(Expresion1) >= Expresion2.charCodeAt(0);
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un decimal con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            case Tipo_1.TipoDato.CADENA:
                return new Errores_1.default('Semantico', `No se puede comparar una cadena con otro tipo`, this.Linea, this.Columna);
            case Tipo_1.TipoDato.BOOLEANO:
                return new Errores_1.default('Semantico', `No se puede comparar un booleano con otro tipo`, this.Linea, this.Columna);
            case Tipo_1.TipoDato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.TipoDato.ENTERO:
                        return Expresion1.charCodeAt(0) >= parseInt(Expresion2);
                    case Tipo_1.TipoDato.DECIMAL:
                        return Expresion1.charCodeAt(0) >= parseFloat(Expresion2);
                    case Tipo_1.TipoDato.CARACTER:
                        return Expresion1 < Expresion2;
                    default:
                        return new Errores_1.default('Semantico', `No se puede comparar un caracter con un tipo ${tipo2}`, this.Linea, this.Columna);
                }
            default:
                return new Errores_1.default('Semantico', `No se puede comparar un tipo ${tipo1}`, this.Linea, this.Columna);
        }
    }
    Or(Expresion1, Expresion2) {
        var _a, _b;
        let tipo1 = (_a = this.Expresion1) === null || _a === void 0 ? void 0 : _a.Tipo.getTipo();
        let tipo2 = (_b = this.Expresion2) === null || _b === void 0 ? void 0 : _b.Tipo.getTipo();
        // Validar tipos de datos válidos para la operación OR
        if (tipo1 === Tipo_1.TipoDato.BOOLEANO && tipo2 === Tipo_1.TipoDato.BOOLEANO) {
            return Expresion1 || Expresion2;
        }
        else {
            return new Errores_1.default('Semantico', `No se pueden realizar operaciones lógicas OR entre tipos ${tipo1} y ${tipo2}`, this.Linea, this.Columna);
        }
    }
    And(Expresion1, Expresion2) {
        var _a, _b;
        let tipo1 = (_a = this.Expresion1) === null || _a === void 0 ? void 0 : _a.Tipo.getTipo();
        let tipo2 = (_b = this.Expresion2) === null || _b === void 0 ? void 0 : _b.Tipo.getTipo();
        // Validar tipos de datos válidos para la operación AND
        if (tipo1 === Tipo_1.TipoDato.BOOLEANO && tipo2 === Tipo_1.TipoDato.BOOLEANO) {
            return Expresion1 && Expresion2;
        }
        else {
            return new Errores_1.default('Semantico', `No se pueden realizar operaciones lógicas AND entre tipos ${tipo1} y ${tipo2}`, this.Linea, this.Columna);
        }
    }
    Not(ExpresionUnica) {
        var _a;
        let tipo = (_a = this.ExpresionUnica) === null || _a === void 0 ? void 0 : _a.Tipo.getTipo();
        // Validar tipo de dato válido para la operación NOT
        if (tipo === Tipo_1.TipoDato.BOOLEANO) {
            return !ExpresionUnica;
        }
        else {
            return new Errores_1.default('Semantico', `No se puede realizar la operación lógica NOT sobre un tipo ${tipo}`, this.Linea, this.Columna);
        }
    }
}
exports.default = Logica;
var OperadorLogico;
(function (OperadorLogico) {
    OperadorLogico[OperadorLogico["IGUALIGUAL"] = 0] = "IGUALIGUAL";
    OperadorLogico[OperadorLogico["DIFERENTE"] = 1] = "DIFERENTE";
    OperadorLogico[OperadorLogico["MENOR"] = 2] = "MENOR";
    OperadorLogico[OperadorLogico["MENORIGUAL"] = 3] = "MENORIGUAL";
    OperadorLogico[OperadorLogico["MAYOR"] = 4] = "MAYOR";
    OperadorLogico[OperadorLogico["MAYORIGUAL"] = 5] = "MAYORIGUAL";
    OperadorLogico[OperadorLogico["OR"] = 6] = "OR";
    OperadorLogico[OperadorLogico["AND"] = 7] = "AND";
    OperadorLogico[OperadorLogico["NOT"] = 8] = "NOT";
})(OperadorLogico || (exports.OperadorLogico = OperadorLogico = {}));
