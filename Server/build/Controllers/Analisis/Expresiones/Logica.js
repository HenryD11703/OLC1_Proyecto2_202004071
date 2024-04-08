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
    Igualdad(Expresion1, Expresion2) {
        if (Expresion1 === Expresion2)
            return true;
        return false;
    }
    Diferencia(Expresion1, Expresion2) {
        if (Expresion1 !== Expresion2)
            return true;
        return false;
    }
    MenorQ(Expresion1, Expresion2) {
        if (Expresion1 < Expresion2)
            return true;
        return false;
    }
    MenorIgualQ(Expresion1, Expresion2) {
        if (Expresion1 <= Expresion2)
            return true;
        return false;
    }
    MayorQ(Expresion1, Expresion2) {
        if (Expresion1 > Expresion2)
            return true;
        return false;
    }
    MayorIgualQ(Expresion1, Expresion2) {
        if (Expresion1 >= Expresion2)
            return true;
        return false;
    }
    Or(Expresion1, Expresion2) {
        if (Expresion1 || Expresion2)
            return true;
        return false;
    }
    And(Expresion1, Expresion2) {
        if (Expresion1 && Expresion2)
            return true;
        return false;
    }
    Not(ExpresionUnica) {
        if (!ExpresionUnica)
            return true;
        return false;
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
