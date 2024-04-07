"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Simbolo {
    constructor(tipoSimbolo, identificador, valor) {
        this.tipoSimbolo = tipoSimbolo;
        this.identificador = identificador.toLowerCase();
        this.valor = valor;
    }
    getTipoSimbolo() {
        return this.tipoSimbolo;
    }
    setTipoSimbolo(tipoSimbolo) {
        this.tipoSimbolo = tipoSimbolo;
    }
    getIdentificador() {
        return this.identificador;
    }
    setIdentificador(identificador) {
        this.identificador = identificador;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
}
exports.default = Simbolo;
