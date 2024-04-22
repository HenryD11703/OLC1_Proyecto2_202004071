import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import Contador from "../SimboloC/Contador";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Bloque from './Bloque';
import Break from "./Break";
import Continue from "./Continue";
import Return from "./Return";
 


export default class FuncionIf extends Instruccion {
    condicion: Instruccion;
    bloqueIf: Bloque;
    BloqueElse: Bloque | null;

    constructor(condicion: Instruccion, bloqueIf: Bloque, BloqueElse: Bloque | null, linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.bloqueIf = bloqueIf;
        this.BloqueElse = BloqueElse;
    }

    public interpretar(arbolS: ArbolS, tabla: TablaSimbolos) {
        const condicionResultado = this.condicion.interpretar(arbolS, tabla);
        if (condicionResultado instanceof Errores) return condicionResultado;


        let newTabla = new TablaSimbolos(tabla);
        newTabla.setNombre("Bloque");

        if (condicionResultado) {
            let result = this.bloqueIf.interpretar(arbolS, newTabla);
            if (result instanceof Errores) return result;
            if (result instanceof Break) return result;
            if (result instanceof Continue) return result;
            if (result instanceof Return) return result;     
                  
        }else if(this.BloqueElse != null){
            let result = this.BloqueElse.interpretar(arbolS, newTabla);
            if (result instanceof Errores) return result;
            if (result instanceof Break) return result;
            if (result instanceof Continue) return result;
            if (result instanceof Return) return result;    
        }
        return null;
    }

    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let nodoRaiz = `n${contador.get()}`;
        let nodoIf = `n${contador.get()}`;
        let nodoCondicion = `n${contador.get()}`;
        let nodoLlaveIIf = `n${contador.get()}`;
        let nodoBloqueThenIf = `n${contador.get()}`;
        let nodoLlaveDIf = `n${contador.get()}`;
        let nodoElse = null;
        let nodoLlaveIElse = null;
        let nodoBloqueThenElse = null;
        let nodoLlaveDElse = null;
    
        let resultado = `${nodoRaiz}[label="Raiz"]\n`;
        resultado += `${anterior} -> ${nodoRaiz}\n`;
        resultado += `${nodoIf}[label="If"]\n`;
        resultado += `${nodoRaiz} -> ${nodoIf}\n`;
    
        resultado += `${nodoCondicion}[label="Condición"]\n`;
        resultado += `${nodoIf} -> ${nodoCondicion}\n`;
        resultado += this.condicion.buildAst(`${nodoCondicion}`);
    
        resultado += `${nodoLlaveIIf}[label="{"]\n`;
        resultado += `${nodoIf} -> ${nodoLlaveIIf}\n`;
    
        resultado += `${nodoBloqueThenIf}[label="Bloque Then"]\n`;
        resultado += `${nodoIf} -> ${nodoBloqueThenIf}\n`;
        resultado += this.bloqueIf.buildAst(`${nodoBloqueThenIf}`);
    
        resultado += `${nodoLlaveDIf}[label="}"]\n`;
        resultado += `${nodoIf} -> ${nodoLlaveDIf}\n`;
    
        if (this.BloqueElse !== null) {
            nodoElse = `n${contador.get()}`;
            nodoLlaveIElse = `n${contador.get()}`;
            nodoBloqueThenElse = `n${contador.get()}`;
            nodoLlaveDElse = `n${contador.get()}`;
    
            resultado += `${nodoElse}[label="Else"]\n`;
            resultado += `${nodoIf} -> ${nodoElse}\n`;
    
            resultado += `${nodoLlaveIElse}[label="{"]\n`;
            resultado += `${nodoElse} -> ${nodoLlaveIElse}\n`;
    
            resultado += `${nodoBloqueThenElse}[label="Bloque Then"]\n`;
            resultado += `${nodoElse} -> ${nodoBloqueThenElse}\n`;
            resultado += this.BloqueElse.buildAst(`${nodoBloqueThenElse}`);
    
            resultado += `${nodoLlaveDElse}[label="}"]\n`;
            resultado += `${nodoElse} -> ${nodoLlaveDElse}\n`;
        }
    
        return resultado;
    }

}