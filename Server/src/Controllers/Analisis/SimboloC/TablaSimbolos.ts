import Simbolo from './Simbolo';
import Tipo, { TipoDato } from './Tipo';

export default class TablaSimbolos {
    private tablaAnterior: TablaSimbolos | any;
    private tablaActual: Map<string, Simbolo>;
    private nombre: string;

    constructor(tablaAnterior?: TablaSimbolos) {
        this.tablaAnterior = tablaAnterior;
        this.tablaActual = new Map<string, Simbolo>();
        this.nombre = "";
    }

    public getTablaAnterior(): TablaSimbolos {
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
    public getVariable(identificador: string) {
        for (let i: TablaSimbolos = this; i != null; i = i.getTablaAnterior()) {
            console.log(i.getNombre());
            let buscar: Simbolo = <Simbolo>i.getTablaActual().get(identificador.toLocaleLowerCase());
            if (buscar != null) return buscar;
        }
            return null;
        
    }
    public setVariable(Simbolo: Simbolo) {
        let buscar: Simbolo = <Simbolo>this.getTablaActual().get(Simbolo.getIdentificador().toLowerCase());
        if (buscar == null) {
            this.getTablaActual().set(Simbolo.getIdentificador().toLocaleLowerCase(), Simbolo);
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