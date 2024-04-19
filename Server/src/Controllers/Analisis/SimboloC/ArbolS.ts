import TablaSimbolos from "./TablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Errores from '../Excepciones/Errores';
import Funcion from "../Instrucciones/Funcion";

export default class ArbolS {
    private instrucciones: Array<Instruccion>;
    private consola: string;
    private tablaGlobal: TablaSimbolos;
    private errores: Array<Errores>;
    private funciones: Array<Instruccion>;

    constructor(instrucciones: Array<Instruccion>){
        this.instrucciones = instrucciones;
        this.consola = "";
        this.tablaGlobal = new TablaSimbolos();
        this.errores = new Array<Errores>;
        this.funciones = new Array<Instruccion>;
    }
    public Imprimir(contenido: any) {
        this.consola = `${this.consola}${contenido}`;
    }

    public getConsola(): string {
        return this.consola;
    }
    public setConsola(consola: string): void {
        this.consola = consola;
    }
    public getInstrucciones(): Array<Instruccion> {
        return this.instrucciones;
    }
    public setInstrucciones(instrucciones: Array<Instruccion>): void {
        this.instrucciones = instrucciones;
    }
    public getTablaGlobal(): TablaSimbolos {
        return this.tablaGlobal;
    }
    public setTablaGlobal(tablaGlobal: TablaSimbolos){
        this.tablaGlobal = tablaGlobal;
    }
    public getErrores(): any {
        return this.errores;
    }
    public getFunciones(){
        return this.funciones;
    }
    public setFunciones(funciones: Array<Instruccion>){
        this.funciones = funciones;
    }
    public addFunciones(funcion: Instruccion){
        this.funciones.push(funcion);
    }
    public getFuncion(id: string){
        for(let i of this.getFunciones()){
            if (i instanceof Funcion){
                if(i.id.toLocaleLowerCase() == id.toLocaleLowerCase()) return i;
            }
        }
        return null;
    }
}