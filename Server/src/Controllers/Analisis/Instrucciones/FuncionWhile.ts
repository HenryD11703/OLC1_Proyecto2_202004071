import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Bloque from './Bloque';

export default class FuncionWhile extends Instruccion {
    private condicion: Instruccion;
    private bloque: Bloque;

    constructor(condicion: Instruccion, bloque: Bloque, linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.bloque = bloque;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let condicionResultado = this.condicion.interpretar(ArbolS, tabla);
        if (condicionResultado instanceof Errores) return condicionResultado;

        if(this.condicion.Tipo.getTipo() !== TipoDato.BOOLEANO){
            return new Errores('Semantico', `La condicion del while tiene que ser de tipo BOOLEAN`, this.Linea, this.Columna);
        }
         
        while (this.condicion.interpretar(ArbolS, tabla)) {
            let newTabla2 = new TablaSimbolos(tabla);
            newTabla2.setNombre("Bloque While");
            this.bloque.interpretar(ArbolS, newTabla2);
        }
    }
}
