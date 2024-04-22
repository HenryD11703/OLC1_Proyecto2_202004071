import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import Contador from "../SimboloC/Contador";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Return from './Return';

export default class Funcion extends Instruccion {
    public id: string;
    public parametros: any[];
    public instrucciones: Instruccion[];

    //funciones : tipo ids PARENTESISI parametros PARENTESISD LLAVEI codigos LLAVED { $$ = new Funcion.default($1, $2, $4, $7, @1.first_line, @1.first_column); }
    constructor(tipo : Tipo, id: string, parametros: any[], instrucciones: Instruccion[], linea: number, columna: number){
        super(tipo, linea, columna);
        this.id = id;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }
    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        let nuevaTabla = new TablaSimbolos(tabla);
        nuevaTabla.setNombre("Funcion" + this.id);

        for (let instruccion of this.instrucciones) {
            
            if (instruccion instanceof Return) {
                instruccion.Tipo.setTipo(this.Tipo.getTipo());
                
                return instruccion;
            }
          
            let result = instruccion.interpretar(ArbolS, nuevaTabla);

            if (result instanceof Errores) return result;
            if (result instanceof Return){
                result.Tipo.setTipo(this.Tipo.getTipo());
        
                return result;
            }
        }
    }
    /**
     *funciones : tipo ID PARENTESISI parametros PARENTESISD LLAVEI codigos LLAVED { $$ = new Funcion.default($1, $2, $4, $7, @1.first_line, @1.first_column); }
          | tipo ID PARENTESISI PARENTESISD LLAVEI codigos LLAVED            { $$ = new Funcion.default($1, $2, [], $6, @1.first_line, @1.first_column); }
;

        parametros : parametros COMA tipo ID       {$1.push({tipo:$3, id:$4}); $$ = $1;}
                | tipo ID                     { $$ = [{tipo:$1, id:$2}]; }
                | parametros COMA tipo ID CORCHETEI CORCHETED {$1.push({tipo:$3, id:$4, arreglo:true}); $$ = $1;}
                | tipo ID CORCHETEI CORCHETED {$$ = [{tipo:$1, id:$2, arreglo:true}]; }
                | parametros COMA tipo ID CORCHETEI CORCHETED CORCHETEI CORCHETED {$1.push({tipo:$3, id:$4, arreglo:true}); $$ = $1;}
                | tipo ID CORCHETEI CORCHETED CORCHETEI CORCHETED {$$ = [{tipo:$1, id:$2, arreglo:true}]; }
        ; 

     */
        buildAst(anterior: string): string {
            let contador = Contador.getInstance();
            let nodoFuncion = `n${contador.get()}`;
            let nodoTipo = `n${contador.get()}`;
            let nodoId = `n${contador.get()}`;
            let nodoParentesisI = `n${contador.get()}`;
            let nodoParentesisD = `n${contador.get()}`;
            let nodoParametros = null;
            let nodoInstrucciones = `n${contador.get()}`;
        
            let resultado = `${nodoFuncion}[label="Declaracion de Funcion"]\n`;
            resultado += `${anterior} -> ${nodoFuncion}\n`;
            resultado += `${nodoTipo}[label="${this.Tipo.getTipo().toString()}"]\n`;
            resultado += `${nodoFuncion} -> ${nodoTipo}\n`;
            resultado += `${nodoId}[label="${this.id}"]\n`;
            resultado += `${nodoFuncion} -> ${nodoId}\n`;
            resultado += `${nodoParentesisI}[label="("]\n`;
            resultado += `${nodoFuncion} -> ${nodoParentesisI}\n`;
        
            if (this.parametros.length > 0) {
                nodoParametros = `n${contador.get()}`;
                resultado += `${nodoParametros}[label="Parametros"]\n`;
                resultado += `${nodoFuncion} -> ${nodoParametros}\n`;
        
                for (let parametro of this.parametros) {
                    let nodoParametro = `n${contador.get()}`;
                    let nodoTipoParametro = `n${contador.get()}`;
                    let nodoIdParametro = `n${contador.get()}`;
                    let nodoCorcheteI = null;
                    let nodoCorcheteD = null;
        
                    resultado += `${nodoParametro}[label="Parametro"]\n`;
                    resultado += `${nodoParametros} -> ${nodoParametro}\n`;
                    resultado += `${nodoTipoParametro}[label="${parametro.tipo.getTipo().toString()}"]\n`;
                    resultado += `${nodoParametro} -> ${nodoTipoParametro}\n`;
                    resultado += `${nodoIdParametro}[label="${parametro.id}"]\n`;
                    resultado += `${nodoParametro} -> ${nodoIdParametro}\n`;
        
                    if (parametro.arreglo) {
                        nodoCorcheteI = `n${contador.get()}`;
                        nodoCorcheteD = `n${contador.get()}`;
                        resultado += `${nodoCorcheteI}[label="["]\n`;
                        resultado += `${nodoParametro} -> ${nodoCorcheteI}\n`;
                        resultado += `${nodoCorcheteD}[label="]"]\n`;
                        resultado += `${nodoParametro} -> ${nodoCorcheteD}\n`;
        
                        if (parametro.arreglo === true) {
                            nodoCorcheteI = `n${contador.get()}`;
                            nodoCorcheteD = `n${contador.get()}`;
                            resultado += `${nodoCorcheteI}[label="["]\n`;
                            resultado += `${nodoParametro} -> ${nodoCorcheteI}\n`;
                            resultado += `${nodoCorcheteD}[label="]"]\n`;
                            resultado += `${nodoParametro} -> ${nodoCorcheteD}\n`;
                        }
                    }
                }
            }
        
            resultado += `${nodoParentesisD}[label=")"]\n`;
            resultado += `${nodoFuncion} -> ${nodoParentesisD}\n`;
        
            // Generar nodo para las instrucciones
            resultado += `${nodoInstrucciones}[label="Instrucciones"]\n`;
            resultado += `${nodoFuncion} -> ${nodoInstrucciones}\n`;
        
            // Iterar sobre las instrucciones y generar sus nodos
            for (let instruccion of this.instrucciones) {
                resultado += instruccion.buildAst(nodoInstrucciones);
            }
        
            return resultado;
        }
}