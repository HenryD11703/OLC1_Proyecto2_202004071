import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";

export default class Length extends Instruccion {
    private expresion: Instruccion;

    constructor(expresion: Instruccion, linea: number, columna: number) {
        super(new Tipo(TipoDato.ENTERO), linea, columna);
        this.expresion = expresion;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let resultado = this.expresion.interpretar(ArbolS, tabla);
        let TipoResultado = this.expresion.Tipo.getTipo();
        if (resultado instanceof Errores) return resultado;
        
        if (Array.isArray(resultado)) {
            return resultado.length;
        } else if (TipoResultado == TipoDato.CADENA) {
            return resultado.length;
        }else{
            return new Errores('Semantico', `No se puede obtener la longitud de un valor de tipo ${this.expresion.Tipo.getTipo()}`, this.Linea, this.Columna);
        }
    }
}