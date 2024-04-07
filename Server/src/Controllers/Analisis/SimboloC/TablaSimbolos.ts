import Simbolo from './Simbolo';
import Tipo,{ TipoDato } from './Tipo';

export default class TablaSimbolos {
    private tablaAnterior: TablaSimbolos | any;
    private tablaActual: Map<string, Simbolo>;
    private nombre: string;

    constructor(tablaAnterior?: TablaSimbolos){
        this.tablaAnterior = tablaAnterior;
        this.tablaActual = new Map<string, Simbolo>();
        this.nombre = "";
    }

    public getTablaAnterior(): TablaSimbolos | any {
        return this.tablaAnterior;
    }
    public setTablaAnterior(tablaAnterior: TablaSimbolos): void {
        this.tablaAnterior = tablaAnterior;
    }
    public getTablaActual(): Map<string, Simbolo> {
        return this.tablaActual;
    }
    public setTablaActual(tablaActual: Map<string, Simbolo>): void {
        this.tablaActual = tablaActual;
    }
    public getVariable(identificador: string){
         return <Simbolo> this.getTablaActual().get(identificador.toLowerCase());
    }
    public setVariable(Simbolo: Simbolo){
        let buscar: Simbolo = <Simbolo>this.getTablaActual().get(Simbolo.getIdentificador().toLowerCase());
        if(buscar == null){
            this.getTablaActual().set(Simbolo.getIdentificador().toLowerCase(), Simbolo);
            return true;
        }
        return false;        
    }
    public getNombre(): string {
        return this.nombre;
    }
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }


}