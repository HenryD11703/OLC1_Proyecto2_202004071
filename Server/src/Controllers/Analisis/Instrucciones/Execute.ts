import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import Contador from "../SimboloC/Contador";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Declaracion from "./Declaracion";
import Funcion from "./Funcion";

export default class Execute extends Instruccion{
    private id: string;
    private parametros: Instruccion[];

    constructor(id: string, parametros: Instruccion[], linea: number, columna: number){
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.id = id;
        this.parametros = parametros;
    }
    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let buscarFuncion = ArbolS.getFuncion(this.id);
        if (buscarFuncion == null) {
            return new Errores('Semantico', `La función ${this.id} no existe`, this.Linea, this.Columna);
        }

        if (buscarFuncion instanceof Funcion){
            let newTabla = new TablaSimbolos(tabla);
            newTabla.setNombre("Tabla Execute");

            if(buscarFuncion.parametros.length != this.parametros.length){
                return new Errores('Semantico', `La función ${this.id} necesita ${buscarFuncion.parametros.length} parámetros`, this.Linea, this.Columna);
            }
                for(let i = 0; i < this.parametros.length; i++){
                    let declaracionParametro = new Declaracion(
                        buscarFuncion.parametros[i].tipo, this.Linea, this.Columna,
                        [buscarFuncion.parametros[i].id], this.parametros[i]
                    );
                    let resultado = declaracionParametro.interpretar(ArbolS, newTabla);
                    if(resultado instanceof Errores) return resultado;
                }

                let resultadoFuncion: any = buscarFuncion.interpretar(ArbolS, newTabla);
                if(resultadoFuncion instanceof Errores) return resultadoFuncion;
        }
    }

    /*
    execute: EXECUTE ID PARENTESISI PARENTESISD PYC                      { $$ = new Execute.default($2, [], @1.first_line, @1.first_column); }
       | EXECUTE ID PARENTESISI parametros_llamada PARENTESISD PYC   { $$ = new Execute.default($2, $4, @1.first_line, @1.first_column); }
    */
       buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let nodoExecute = `n${contador.get()}`;
        let nodoId = `n${contador.get()}`;
        let nodoParentesisI = `n${contador.get()}`;
        let nodoParentesisD = `n${contador.get()}`;
        let nodoParametros = null;
    
        let resultado = `${nodoExecute}[label="Execute"]\n`;
        resultado += `${anterior} -> ${nodoExecute}\n`;
        resultado += `${nodoId}[label="${this.id}"]\n`;
        resultado += `${nodoExecute} -> ${nodoId}\n`;
        resultado += `${nodoParentesisI}[label="("]\n`;
        resultado += `${nodoExecute} -> ${nodoParentesisI}\n`;
    
        if (this.parametros.length > 0) {
            nodoParametros = `n${contador.get()}`;
            resultado += `${nodoParametros}[label="Parametros"]\n`;
            resultado += `${nodoExecute} -> ${nodoParametros}\n`;
    
            for (let parametro of this.parametros) {
                let nodoParametro = `n${contador.get()}`;
                resultado += parametro.buildAst(nodoParametro);
                resultado += `${nodoParametros} -> ${nodoParametro}\n`;
            }
        }
    
        resultado += `${nodoParentesisD}[label=")"]\n`;
        resultado += `${nodoExecute} -> ${nodoParentesisD}\n`;
    
        return resultado;
    }
}