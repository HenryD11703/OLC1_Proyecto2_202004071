import { Instruccion } from '../Abstracto/Instruccion';
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import Contador from '../SimboloC/Contador';
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Bloque from './Bloque';
import Break from './Break';
import Continue from './Continue';
import Return from './Return';

export default class FuncionWhile extends Instruccion {
    private condicion: Instruccion;
    private Instrucciones: Instruccion[];

    constructor(condicion: Instruccion, instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.Instrucciones = instrucciones;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let condicionResultado = this.condicion.interpretar(ArbolS, tabla);
        if (condicionResultado instanceof Errores) return condicionResultado;

        if(this.condicion.Tipo.getTipo() !== TipoDato.BOOLEANO){
            ArbolS.createAndAddError(ArbolS, 'Semantico', `La condicion del while tiene que ser de tipo BOOLEAN`, this.Linea, this.Columna);
            return new Errores('Semantico', `La condicion del while tiene que ser de tipo BOOLEAN`, this.Linea, this.Columna);
        }
         
        while (this.condicion.interpretar(ArbolS, tabla)) {
            let newTabla2 = new TablaSimbolos(tabla);
            newTabla2.setNombre("Bloque While");
            for(let instruccion of this.Instrucciones){
                if(instruccion instanceof Errores) return instruccion;
                if(instruccion instanceof Break) return;
                if(instruccion instanceof Continue) break;
                if(instruccion instanceof Return) return instruccion;
                let result = instruccion.interpretar(ArbolS, newTabla2);
                if (result instanceof Break) return;
                if (result instanceof Continue) break;       
                if (result instanceof Return) return result;       
                if (result instanceof Errores) return result;
            }
        }
    }

    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let nodoRaiz = `n${contador.get()}`;
        let nodoWhile = `n${contador.get()}`;
        let nodoCondicion = `n${contador.get()}`;
        let nodoLlaveI = `n${contador.get()}`;
        let nodoBloque = `n${contador.get()}`;
        let nodoLlaveD = `n${contador.get()}`;
    
        let resultado = `${nodoRaiz}[label="Raiz"]\n`;
        resultado += `${anterior} -> ${nodoRaiz}\n`;
        resultado += `${nodoWhile}[label="While"]\n`;
        resultado += `${nodoRaiz} -> ${nodoWhile}\n`;
    
        resultado += `${nodoCondicion}[label="Condición"]\n`;
        resultado += `${nodoWhile} -> ${nodoCondicion}\n`;
        resultado += this.condicion.buildAst(`${nodoCondicion}`);
    
        resultado += `${nodoLlaveI}[label="{"]\n`;
        resultado += `${nodoWhile} -> ${nodoLlaveI}\n`;
    
        resultado += `${nodoBloque}[label="Bloque de Instrucciones"]\n`;
        resultado += `${nodoWhile} -> ${nodoBloque}\n`;
    
        for (let instruccion of this.Instrucciones) {
            if (instruccion instanceof Errores) continue;
            resultado += instruccion.buildAst(`${nodoBloque}`);
        }
    
        resultado += `${nodoLlaveD}[label="}"]\n`;
        resultado += `${nodoWhile} -> ${nodoLlaveD}\n`;
    
        return resultado;
    }

}
