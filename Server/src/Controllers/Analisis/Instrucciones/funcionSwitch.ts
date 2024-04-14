import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Bloque from "./Bloque";
import Break from "./Break";
import Caso from "./Caso";
import Continue from "./Continue";
import Return from "./Return";

export default class FuncionSwitch extends Instruccion {
    private expresion: Instruccion;
    private casos: Array<Caso>;
    private casoDefault: Caso | null;

    constructor(expresion: Instruccion, casos: Array<Caso>, casoDefault: Caso | null, linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.expresion = expresion;
        this.casos = casos;
        this.casoDefault = casoDefault;
    }
    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let condicionResultado = this.expresion.interpretar(ArbolS, tabla);
        if (condicionResultado instanceof Errores) return condicionResultado;

        for (let caso of this.casos) {
            let result = caso.interpretar(ArbolS, tabla);
            if (result instanceof Break) return;
            if (result instanceof Continue) break;
            if (result instanceof Return) return result;
            if (result instanceof Errores) return result;
        }
        if (this.casoDefault != null) {
            let result = this.casoDefault.interpretar(ArbolS, tabla);
            if (result instanceof Break) return;
            if (result instanceof Continue) return;
            if (result instanceof Return) return result;
            if (result instanceof Errores) return result;
        }        
    }
}