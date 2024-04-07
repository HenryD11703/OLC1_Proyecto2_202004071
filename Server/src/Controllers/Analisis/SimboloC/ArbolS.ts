import TablaSimbolos from "./TablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import Errores from '../Excepciones/Errores';

export default class ArbolS {
    private instrucciones: Array<Instruccion>;
    private consola: string;
    private tablaGlobal: TablaSimbolos;
    private errores: Array<Errores>;

    constructor(instrucciones: Array<Instruccion>){
        this.instrucciones = instrucciones;
        this.consola = "";
        this.tablaGlobal = new TablaSimbolos();
        this.errores = new Array<Errores>();
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
}