"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Contador {
    constructor() {
        this.contador = 0;
    }
    static getInstance() {
        if (!Contador.instance) {
            Contador.instance = new Contador();
        }
        return Contador.instance;
    }
    get() {
        this.contador++;
        return this.contador;
    }
}
exports.default = Contador;
//Clase para tener un contador global, una unica instancia de la clase, la cual servira
//para tener un orden en los nodos y los links que se creen en el grafo
