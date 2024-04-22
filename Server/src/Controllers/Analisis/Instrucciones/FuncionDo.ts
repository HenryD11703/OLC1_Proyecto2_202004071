import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import Contador from "../SimboloC/Contador";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Bloque from './Bloque';
import Break from "./Break";
import Continue from "./Continue";
import Return from './Return';
export default class FuncionDo extends Instruccion { //Igual que el while solo que se ejecuta una vez a fuerza el bloque de códigos
    private instrucciones: Instruccion[];
    private condicion: Instruccion;

    constructor(instrucciones: Instruccion[], condicion: Instruccion, linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.instrucciones = instrucciones;
        this.condicion = condicion;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let newTabla = new TablaSimbolos(tabla);
        newTabla.setNombre("Bloque Do-While");
        for(let instruccion of this.instrucciones){
            if(instruccion instanceof Break) return;
            if(instruccion instanceof Continue) break;
            let result = instruccion.interpretar(ArbolS, newTabla);
            if (result instanceof Continue) break;
            if (result instanceof Break) return;
            if (result instanceof Errores) return result;
        }

        let condicionResultado = this.condicion.interpretar(ArbolS, newTabla);
        if (condicionResultado instanceof Errores) return condicionResultado;

        if (this.condicion.Tipo.getTipo() !== TipoDato.BOOLEANO) {
            return new Errores('Semantico', `La condición del do-while tiene que ser de tipo BOOLEAN`, this.Linea, this.Columna);
        }
                    // Y ya después se evalúa la condición y se ejecuta el bloque de código mientras se cumpla la condición
        while (this.condicion.interpretar(ArbolS, newTabla)) {
            newTabla = new TablaSimbolos(tabla);
            newTabla.setNombre("Bloque Do-While");
            for(let instruccion of this.instrucciones){
                if(instruccion instanceof Break) return;
                if(instruccion instanceof Continue) break;
                if(instruccion instanceof Return) return instruccion;
                let result = instruccion.interpretar(ArbolS, newTabla);
                if (result instanceof Break) return;
                if (result instanceof Continue) break;
                if (result instanceof Errores) return result;
                if (result instanceof Return) return result;
            }
            condicionResultado = this.condicion.interpretar(ArbolS, newTabla);
            if (condicionResultado instanceof Errores) return condicionResultado;
        }
    }
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let nodoRaiz = `n${contador.get()}`;
        let nodoDoWhile = `n${contador.get()}`;
        let nodoBloque = `n${contador.get()}`;
        let nodoCondicion = `n${contador.get()}`;
        let nodoIgual = `n${contador.get()}`;
        let nodoLlaveI = `n${contador.get()}`;
        let nodoLlaveD = `n${contador.get()}`;
    
        let resultado = `${nodoRaiz}[label="Raiz"]\n`;
        resultado += `${anterior} -> ${nodoRaiz}\n`;
        resultado += `${nodoDoWhile}[label="Do-While"]\n`;
        resultado += `${nodoRaiz} -> ${nodoDoWhile}\n`;
    
        resultado += `${nodoLlaveI}[label="{"]\n`;
        resultado += `${nodoDoWhile} -> ${nodoLlaveI}\n`;
    
        resultado += `${nodoBloque}[label="Bloque de Instrucciones"]\n`;
        resultado += `${nodoDoWhile} -> ${nodoBloque}\n`;
    
        for (let instruccion of this.instrucciones) {
            resultado += instruccion.buildAst(`${nodoBloque}`);
        }
    
        resultado += `${nodoLlaveD}[label="}"]\n`;
        resultado += `${nodoDoWhile} -> ${nodoLlaveD}\n`;
    
        resultado += `${nodoIgual}[label="while"]\n`;
        resultado += `${nodoDoWhile} -> ${nodoIgual}\n`;
    
        resultado += `${nodoCondicion}[label="Condición"]\n`;
        resultado += `${nodoDoWhile} -> ${nodoCondicion}\n`;
        resultado += this.condicion.buildAst(`${nodoCondicion}`);

    
    
        return resultado;
    }
}