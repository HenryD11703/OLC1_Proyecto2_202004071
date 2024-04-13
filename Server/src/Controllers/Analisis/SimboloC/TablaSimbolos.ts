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
 
            let buscar: Simbolo = <Simbolo>i.getTablaActual().get(identificador.toLocaleLowerCase());
            if (buscar != null) return buscar;
        }
            return null;
        
    }

    public getVariableVector(identificador: string, posicion: number)  {
        for (let i: TablaSimbolos = this; i != null; i = i.getTablaAnterior()) {
            let buscar: Simbolo = <Simbolo>i.getTablaActual().get(identificador.toLocaleLowerCase());
            if (buscar != null) {
                let valor: any = buscar.getValor();
                if (Array.isArray(valor) && posicion >= 0 && posicion < valor.length) {
                    return new Simbolo(buscar.getTipoSimbolo(), `${buscar.getIdentificador()}[${posicion}]`, valor[posicion]);
                }
            }
        }
        return null;
    }

    public getVariableVector2(identificador: string, posicion1: number, posicion2: number) {
        for (let i: TablaSimbolos = this; i != null; i = i.getTablaAnterior()) {
          let buscar: Simbolo = <Simbolo>i.getTablaActual().get(identificador.toLocaleLowerCase());
          if (buscar != null) {
            let valor: any = buscar.getValor();
            if (Array.isArray(valor) && Array.isArray(valor[0]) && posicion1 >= 0 && posicion1 < valor.length && posicion2 >= 0 && posicion2 < valor[0].length) {
              return new Simbolo(buscar.getTipoSimbolo(), `${buscar.getIdentificador()}[${posicion1}][${posicion2}]`, valor[posicion1][posicion2]);
            }
          }
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

    public setVariableVector(identificador: string, posicion: number, valor: any): boolean {
        for (let i: TablaSimbolos = this; i != null; i = i.getTablaAnterior()) {
          let buscar: Simbolo = <Simbolo>i.getTablaActual().get(identificador.toLocaleLowerCase());
          if (buscar != null) {
            let valorActual: any = buscar.getValor();
            if (Array.isArray(valorActual) && posicion >= 0 && posicion < valorActual.length) {
              valorActual[posicion] = valor;
              buscar.setValor(valorActual);
              i.getTablaActual().set(identificador.toLocaleLowerCase(), buscar);
              return true;
            }
          }
        }
        return false;
      }
      
      public setVariableVector2(identificador: string, posicion1: number, posicion2: number, valor: any): boolean {
        for (let i: TablaSimbolos = this; i != null; i = i.getTablaAnterior()) {
          let buscar: Simbolo = <Simbolo>i.getTablaActual().get(identificador.toLocaleLowerCase());
          if (buscar != null) {
            let valorActual: any = buscar.getValor();
            if (Array.isArray(valorActual) && Array.isArray(valorActual[0]) && posicion1 >= 0 && posicion1 < valorActual.length && posicion2 >= 0 && posicion2 < valorActual[0].length) {
              valorActual[posicion1][posicion2] = valor;
              buscar.setValor(valorActual);
              i.getTablaActual().set(identificador.toLocaleLowerCase(), buscar);
              return true;
            }
          }
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