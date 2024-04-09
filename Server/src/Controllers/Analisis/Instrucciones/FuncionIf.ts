import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Bloque from './Bloque';
 

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
     


    }
}