"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tipo_1 = __importDefault(require("./Tipo"));
const Tipo_2 = require("./Tipo");
class TipoTernario extends Tipo_1.default {
    constructor(tipoVerdadero, tipoFalso) {
        super(Tipo_2.TipoDato.TERNARIO);
        this.tipoVerdadero = tipoVerdadero;
        this.tipoFalso = tipoFalso;
    }
    getTipoVerdadero() {
        return this.tipoVerdadero;
    }
    getTipoFalso() {
        return this.tipoFalso;
    }
    esIgual(tipo) {
        if (tipo instanceof TipoTernario) {
            return (this.tipoVerdadero.getTipo() === tipo.getTipoVerdadero().getTipo() &&
                this.tipoFalso.getTipo() === tipo.getTipoFalso().getTipo());
        }
        return false;
    }
}
exports.default = TipoTernario;
