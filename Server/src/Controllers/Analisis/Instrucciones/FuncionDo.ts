import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Bloque from './Bloque';

export default class FuncionDo extends Instruccion { //Igual que el while solo que se ejecuta una vez a fuerza el bloque de códigos
    private bloque: Bloque;
    private condicion: Instruccion;

    constructor(bloque: Bloque, condicion: Instruccion, linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.bloque = bloque;
        this.condicion = condicion;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let newTabla = new TablaSimbolos(tabla);
        newTabla.setNombre("Bloque Do-While");
        this.bloque.interpretar(ArbolS, newTabla); //En este caso se ejecuta el bloque de código al menos una vez

        let condicionResultado = this.condicion.interpretar(ArbolS, newTabla);
        if (condicionResultado instanceof Errores) return condicionResultado;

        if (this.condicion.Tipo.getTipo() !== TipoDato.BOOLEANO) {
            return new Errores('Semantico', `La condición del do-while tiene que ser de tipo BOOLEAN`, this.Linea, this.Columna);
        }
                    // Y ya después se evalúa la condición y se ejecuta el bloque de código mientras se cumpla la condición
        while (this.condicion.interpretar(ArbolS, newTabla)) {
            newTabla = new TablaSimbolos(tabla);
            newTabla.setNombre("Bloque Do-While");
            this.bloque.interpretar(ArbolS, newTabla);
            condicionResultado = this.condicion.interpretar(ArbolS, newTabla);
            if (condicionResultado instanceof Errores) return condicionResultado;
        }
    }
}