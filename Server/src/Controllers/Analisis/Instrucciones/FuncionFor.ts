import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
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
}