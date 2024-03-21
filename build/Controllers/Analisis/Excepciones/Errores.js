"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Errores {
    constructor(tipoError, descripcion, linea, columna) {
        this.tipoError = tipoError;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }
    getTipoError() {
        return this.tipoError;
    }
    setTipoError(tipoError) {
        this.tipoError = tipoError;
    }
    getDescripcion() {
        return this.descripcion;
    }
    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }
    getLinea() {
        return this.linea;
    }
    setLinea(linea) {
        this.linea = linea;
    }
    getColumna() {
        return this.columna;
    }
    setColumna(columna) {
        this.columna = columna;
    }
}
exports.default = Errores;
