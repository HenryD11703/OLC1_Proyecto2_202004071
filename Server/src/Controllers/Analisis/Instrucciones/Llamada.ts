import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Declaracion from "./Declaracion";
import Funcion from "./Funcion";
import Return from "./Return";

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
            newTabla.setNombre("Llamada de función" + this.id );

            if (buscarFuncion.parametros.length != this.parametros.length) {
                return new Errores('Semantico', `La función ${this.id} necesita ${buscarFuncion.parametros.length} parámetros`, this.Linea, this.Columna);
            }

            for (let i = 0; i < buscarFuncion.parametros.length; i++) {
                 
                let declaracionParametro = new Declaracion(
                    buscarFuncion.parametros[i].tipo, this.Linea, this.Columna,
                    [buscarFuncion.parametros[i].id], this.parametros[i]
                );
                

                let resultado = declaracionParametro.interpretar(ArbolS, newTabla);
                if (resultado instanceof Errores) return resultado;
            }
            let resultadoFuncion: any = buscarFuncion.interpretar(ArbolS, newTabla);
            if( resultadoFuncion instanceof Return) {
                let result = resultadoFuncion.interpretar(ArbolS, newTabla);
                if (result instanceof Errores) return result;
                console.log("Resultado de la llamada a la función: ", result);
                return result;
                
            }
            if (resultadoFuncion instanceof Errores) return resultadoFuncion;
             
        }
    }
}