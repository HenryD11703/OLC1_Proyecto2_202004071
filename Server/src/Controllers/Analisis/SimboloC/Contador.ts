export default class Contador {
    private static instance: Contador;
    private contador: number;
    private constructor() {
        this.contador = 0;
    }
    public static getInstance(): Contador {
        if (!Contador.instance) {
            Contador.instance = new Contador();
        }
        return Contador.instance;
    }

    get(){
        this.contador++;
        return this.contador;
    }
}
//Clase para tener un contador global, una unica instancia de la clase, la cual servira
//para tener un orden en los nodos y los links que se creen en el grafo