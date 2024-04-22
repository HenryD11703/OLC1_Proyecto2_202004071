import { Instruccion } from "../Abstracto/Instruccion";
import Errores from '../Excepciones/Errores';
import ArbolS from "../SimboloC/ArbolS";
import Contador from "../SimboloC/Contador";
import Simbolo from "../SimboloC/Simbolo";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";

export default class Incremento extends Instruccion {
    private id: string;
    private tipo: string;

    constructor(id: string, tipo: string, linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.id = id;
        this.tipo = tipo;
    }

    interpretar(arbolS: ArbolS, tabla: TablaSimbolos) {
        const valor = tabla.getVariable(this.id.toLowerCase());
        if (valor == null) return new Errores('Semantico', `La variable ${this.id} no existe`, this.Linea, this.Columna);
        if (this.tipo == '++') {
            if (valor.getTipoSimbolo().getTipo() == TipoDato.ENTERO) {
                valor.setValor(parseInt(valor.getValor().toString()) + 1);
            } else if (valor.getTipoSimbolo().getTipo() == TipoDato.DECIMAL) {
                valor.setValor(parseFloat(valor.getValor().toString()) + 1);
            } else {
                return new Errores('Semantico', `No se puede incrementar un tipo de dato ${valor.getTipoSimbolo().getTipo()}`, this.Linea, this.Columna);
            }
        } else {
            if (valor.getTipoSimbolo().getTipo() == TipoDato.ENTERO) {
                valor.setValor(parseInt(valor.getValor().toString()) - 1);
            } else if (valor.getTipoSimbolo().getTipo() == TipoDato.DECIMAL) {
                valor.setValor(parseFloat(valor.getValor().toString()) - 1);
            } else {
                return new Errores('Semantico', `No se puede decrementar un tipo de dato ${valor.getTipoSimbolo().getTipo()}`, this.Linea, this.Columna);
            }
        }
    }

    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let nodoRaiz = `n${contador.get()}`;
        let nodoIncremento = `n${contador.get()}`;
        let nodoId = `n${contador.get()}`;
        let nodoTipo = `n${contador.get()}`;
    
        let resultado = `${nodoRaiz}[label="Raiz"]\n`;
        resultado += `${anterior} -> ${nodoRaiz}\n`;
        resultado += `${nodoIncremento}[label="Incremento/Decremento"]\n`;
        resultado += `${nodoRaiz} -> ${nodoIncremento}\n`;
    
        resultado += `${nodoId}[label="${this.id}"]\n`;
        resultado += `${nodoIncremento} -> ${nodoId}\n`;
    
        resultado += `${nodoTipo}[label="${this.tipo}"]\n`;
        resultado += `${nodoIncremento} -> ${nodoTipo}\n`;
    
        return resultado;
    }
}