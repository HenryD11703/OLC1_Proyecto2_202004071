import TablaSimbolos from "../Simbolo/TablaSimbolos";
import Tipo from '../Simbolo/Tipo';
import ArbolS from '../Simbolo/ArbolS';
//Esta clase nos servira para crear el arbol con los nodos de instruccion que contendran 
//a su vez otros nodos de instruccion o nodos de expresion para leer e interpretar ese arbol
export abstract class Instruccion { 
    public Tipo: Tipo;
    public Linea: number; 
    public Columna: number;

    constructor(tipo: Tipo, linea: number, columna: number){
        this.Tipo = tipo;
        this.Linea = linea;
        this.Columna = columna;
    }

    abstract interpretar(ArbolS: ArbolS, tabla: TablaSimbolos): any;
    
}
