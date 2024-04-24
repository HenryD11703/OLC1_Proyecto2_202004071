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
export default class FuncionFor extends Instruccion {
    private declaracion: Instruccion;
    private condicion: Instruccion;
    private incremento: Instruccion;
    private instrucciones: Instruccion[];

    constructor(declaracion: Instruccion, condicion: Instruccion, incremento: Instruccion, instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.incremento = incremento;
        this.instrucciones = instrucciones;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos): any {
        // Interpretar la declaración
        let TablaFor = new TablaSimbolos(tabla);
        TablaFor.setNombre("Bloque For");

        this.declaracion.interpretar(ArbolS, TablaFor);

        // Evaluar la condición
        let condicionResultado = this.condicion.interpretar(ArbolS, TablaFor);
        if (condicionResultado instanceof Errores) return condicionResultado;
        if (this.condicion.Tipo.getTipo() !== TipoDato.BOOLEANO) {
            ArbolS.createAndAddError(ArbolS, 'Semantico', `La condición del for tiene que ser de tipo BOOLEAN`, this.Linea, this.Columna);
            return new Errores('Semantico', `La condición del for tiene que ser de tipo BOOLEAN`, this.Linea, this.Columna);
        }

        // Ejecutar el bloque de código mientras se cumpla la condición
        while (this.condicion.interpretar(ArbolS, TablaFor)) {
            let newTabla = new TablaSimbolos(TablaFor);
            newTabla.setNombre("Bloque For");
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

            // Ejecutar el incremento
            this.incremento.interpretar(ArbolS, TablaFor);
        }

        return null;
    }
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let nodoRaiz = `n${contador.get()}`;
        let nodoFor = `n${contador.get()}`;
        let nodoParentesisI = `n${contador.get()}`;
        let nodoDeclaracion = `n${contador.get()}`;
        let nodoPuntoComa1 = `n${contador.get()}`;
        let nodoCondicion = `n${contador.get()}`;
        let nodoPuntoComa2 = `n${contador.get()}`;
        let nodoIncremento = `n${contador.get()}`;
        let nodoParentesisD = `n${contador.get()}`;
        let nodoLlaveI = `n${contador.get()}`;
        let nodoBloque = `n${contador.get()}`;
        let nodoLlaveD = `n${contador.get()}`;
    
        let resultado = `${nodoRaiz}[label="Raiz"]\n`;
        resultado += `${anterior} -> ${nodoRaiz}\n`;
        resultado += `${nodoFor}[label="For"]\n`;
        resultado += `${nodoRaiz} -> ${nodoFor}\n`;
        resultado += `${nodoParentesisI}[label="("]\n`;
        resultado += `${nodoFor} -> ${nodoParentesisI}\n`;
    
        resultado += `${nodoDeclaracion}[label="Declaración"]\n`;
        resultado += `${nodoFor} -> ${nodoDeclaracion}\n`;
        resultado += this.declaracion.buildAst(`${nodoDeclaracion}`);
    
        resultado += `${nodoPuntoComa1}[label=";"]\n`;
        resultado += `${nodoFor} -> ${nodoPuntoComa1}\n`;
    
        resultado += `${nodoCondicion}[label="Condición"]\n`;
        resultado += `${nodoFor} -> ${nodoCondicion}\n`;
        resultado += this.condicion.buildAst(`${nodoCondicion}`);
    
        resultado += `${nodoPuntoComa2}[label=";"]\n`;
        resultado += `${nodoFor} -> ${nodoPuntoComa2}\n`;
    
        resultado += `${nodoIncremento}[label="Incremento"]\n`;
        resultado += `${nodoFor} -> ${nodoIncremento}\n`;
        resultado += this.incremento.buildAst(`${nodoIncremento}`);
    
        resultado += `${nodoParentesisD}[label=")"]\n`;
        resultado += `${nodoFor} -> ${nodoParentesisD}\n`;
    
        resultado += `${nodoLlaveI}[label="{"]\n`;
        resultado += `${nodoFor} -> ${nodoLlaveI}\n`;
    
        resultado += `${nodoBloque}[label="Bloque de Instrucciones"]\n`;
        resultado += `${nodoFor} -> ${nodoBloque}\n`;
    
        for (let instruccion of this.instrucciones) {
            resultado += instruccion.buildAst(`${nodoBloque}`);
        }
    
        resultado += `${nodoLlaveD}[label="}"]\n`;
        resultado += `${nodoFor} -> ${nodoLlaveD}\n`;
    
        return resultado;
    }
    
}