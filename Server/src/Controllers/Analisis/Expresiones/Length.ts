import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";
import Contador from "../SimboloC/Contador";

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

    //funcionLength: ID PUNTO LENGTH PARENTESISI PARENTESISD { $$ = new Length.default(new AccesoVar.default($1, @1.first_line, @1.first_column), @1.first_line, @1.first_column); }

    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let nodoLength = `n${contador.get()}`
        let nodoID = `n${contador.get()}`
        let nodoPunto = `n${contador.get()}`
        let Length = `n${contador.get()}`
        let nodoParentesisI = `n${contador.get()}`
        let nodoParentesisD = `n${contador.get()}`
        let resultado = `${nodoLength}[label="Length"]\n`
        //como ID proviene de AccesoVar se llama a su metodo buildAst
        resultado += `${nodoID}[label="ID"]\n`
        resultado += this.expresion.buildAst(nodoID)
        resultado += `${nodoLength} -> ${nodoID}\n`
        resultado += `${nodoPunto}[label="PUNTO"]\n`
        resultado += `${nodoLength} -> ${nodoPunto}\n`
        resultado += `${Length}[label="LENGTH"]\n`
        resultado += `${nodoLength} -> ${Length}\n`
        resultado += `${nodoParentesisI}[label="PARENTESISI"]\n`
        resultado += `${nodoLength} -> ${nodoParentesisI}\n`
        resultado += `${nodoParentesisD}[label="PARENTESISD"]\n`
        resultado += `${nodoLength} -> ${nodoParentesisD}\n`
        resultado += `${anterior} -> ${nodoLength}\n`
        return resultado        
    }
}