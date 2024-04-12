import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
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
}