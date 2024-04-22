import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import Nativo from "../Expresiones/Nativo";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Declaracion from "./Declaracion";
import Funcion from "./Funcion";
import Return from "./Return";
import AccessVar from '../Expresiones/AccessVar';
import Contador from "../SimboloC/Contador";

export default class Llamada extends Instruccion {
    private id: string;
    private parametros: Instruccion[];

    constructor(id: string, parametros: Instruccion[], linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.id = id;
        this.parametros = parametros;
    }

    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let buscarFuncion = ArbolS.getFuncion(this.id);
        if (buscarFuncion == null) {
            return new Errores('Semantico', `La función ${this.id} no existe`, this.Linea, this.Columna);
        }

        if (buscarFuncion instanceof Funcion) {
            let newTabla = new TablaSimbolos(tabla);
            newTabla.setNombre("Llamada de función" + this.id);

            if (buscarFuncion.parametros.length != this.parametros.length) {
                return new Errores('Semantico', `La función ${this.id} necesita ${buscarFuncion.parametros.length} parámetros`, this.Linea, this.Columna);
            }

            for (let i = 0; i < buscarFuncion.parametros.length; i++) {
                let declaracionParametro = new Declaracion(buscarFuncion.parametros[i].tipo, this.Linea, this.Columna, [buscarFuncion.parametros[i].id]);
                let valor;

                if (buscarFuncion.parametros[i].arreglo) {
                    // El parámetro es un arreglo
                    valor = this.parametros[i].interpretar(ArbolS, tabla);
                } else {
                    // El parámetro es un valor normal
                    valor = this.parametros[i].interpretar(ArbolS, tabla);
                    if (valor instanceof Errores) return valor;
                }

                let resultado = declaracionParametro.interpretar(ArbolS, newTabla);
                if (resultado instanceof Errores) return resultado;

                let variable = newTabla.getVariable(buscarFuncion.parametros[i].id);
                if (variable == null) return new Errores('Semantico', `La variable ${buscarFuncion.parametros[i].id} no existe`, this.Linea, this.Columna);

                if (!buscarFuncion.parametros[i].arreglo && variable.getTipoSimbolo().getTipo() != this.parametros[i].Tipo.getTipo()) {
                    return new Errores('Semantico', `El tipo de la variable ${buscarFuncion.parametros[i].id} no coincide con el tipo del parámetro`, this.Linea, this.Columna);
                }

                variable.setValor(valor);
            }

            let resultadoFuncion: any = buscarFuncion.interpretar(ArbolS, newTabla);
            if (resultadoFuncion instanceof Return) {
                let result = resultadoFuncion.interpretar(ArbolS, newTabla);
                if (result instanceof Nativo) {
                    this.Tipo.setTipo(result.Tipo.getTipo());
                    result.Tipo.setTipo(buscarFuncion.Tipo.getTipo());
                    return result.interpretar(ArbolS, tabla);
                }
            }
            if (resultadoFuncion instanceof Errores) return resultadoFuncion;
        }
    }
    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let nodoRaiz = `n${contador.get()}`;
        let nodoLlamada = `n${contador.get()}`;
        let nodoId = `n${contador.get()}`;
        let nodoParentesisI = `n${contador.get()}`;
        let nodoParametros = null;
        let nodoParentesisD = `n${contador.get()}`;
    
        let resultado = `${nodoRaiz}[label="Funcion llamada"]\n`;
        resultado += `${anterior} -> ${nodoRaiz}\n`;
        resultado += `${nodoLlamada}[label="Llamada"]\n`;
        resultado += `${nodoRaiz} -> ${nodoLlamada}\n`;
    
        resultado += `${nodoId}[label="${this.id}"]\n`;
        resultado += `${nodoLlamada} -> ${nodoId}\n`;
    
        resultado += `${nodoParentesisI}[label="("]\n`;
        resultado += `${nodoLlamada} -> ${nodoParentesisI}\n`;
    
        if (this.parametros.length > 0) {
            nodoParametros = `n${contador.get()}`;
            resultado += `${nodoParametros}[label="Parámetros"]\n`;
            resultado += `${nodoLlamada} -> ${nodoParametros}\n`;
    
            for (let parametro of this.parametros) {
                let nodoParametro = `n${contador.get()}`;
                resultado += `${nodoParametro}[label="Parámetro"]\n`;
                resultado += `${nodoParametros} -> ${nodoParametro}\n`;
                resultado += parametro.buildAst(`${nodoParametro}`);
            }
        }
    
        resultado += `${nodoParentesisD}[label=")"]\n`;
        resultado += `${nodoLlamada} -> ${nodoParentesisD}\n`;
    
        return resultado;
    }
}