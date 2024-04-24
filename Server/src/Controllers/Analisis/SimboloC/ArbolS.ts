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

    public setErrores(errores: any): void {
        this.errores = errores;
    }

    public addError(error: Errores): void {
        this.errores.push(error);
    }
    
    public createAndAddError(ArbolS: ArbolS, tipo: string, descripcion: string, linea: number, columna: number)  {
        let error = new Errores(tipo, descripcion, linea, columna);
        ArbolS.addError(error);
      
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