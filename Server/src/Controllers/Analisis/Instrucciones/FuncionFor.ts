import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Bloque from './Bloque';

export default class FuncionFor extends Instruccion {
    private declaracion: Instruccion;
    private condicion: Instruccion;
    private incremento: Instruccion;
    private bloque: Bloque;

    constructor(declaracion: Instruccion, condicion: Instruccion, incremento: Instruccion, bloque: Bloque, linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.incremento = incremento;
        this.bloque = bloque;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos): any {
        // Interpretar la declaración
        this.declaracion.interpretar(ArbolS, tabla);

        // Evaluar la condición
        let condicionResultado = this.condicion.interpretar(ArbolS, tabla);
        if (condicionResultado instanceof Errores) return condicionResultado;
        if (this.condicion.Tipo.getTipo() !== TipoDato.BOOLEANO) {
            return new Errores('Semantico', `La condición del for tiene que ser de tipo BOOLEAN`, this.Linea, this.Columna);
        }

        // Ejecutar el bloque de código mientras se cumpla la condición
        while (this.condicion.interpretar(ArbolS, tabla)) {
            let newTabla = new TablaSimbolos(tabla);
            newTabla.setNombre("Bloque For");
            this.bloque.interpretar(ArbolS, newTabla);

            // Ejecutar el incremento
            this.incremento.interpretar(ArbolS, tabla);
        }

        return null;
    }
}