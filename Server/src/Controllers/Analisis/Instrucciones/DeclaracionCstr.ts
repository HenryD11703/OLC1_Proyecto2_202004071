import { Instruccion } from '../Abstracto/Instruccion';
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
import Contador from '../SimboloC/Contador';
import Simbolo from "../SimboloC/Simbolo";
import TablaSimbolos from '../SimboloC/TablaSimbolos';
import Tipo, { TipoDato } from "../SimboloC/Tipo";
 
export default class DeclaracionCstr extends Instruccion {
    private tipo: Tipo;
    private id: string[];
    private Instruccion: Instruccion;

    constructor(tipo: Tipo, id : string[], Instruccion: Instruccion, linea: number, columna: number) {
        super(tipo, linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.Instruccion = Instruccion;
    }
    interpretar(ArbolS: ArbolS, tabla: TablaSimbolos) {
        
 
        let valor = this.Instruccion.interpretar(ArbolS, tabla);
        if(valor instanceof Errores) return valor;
 

        let valorC = valor.split('');

       
        for(let Identificador of this.id){
            if(!tabla.setVariable(new Simbolo(this.tipo, Identificador, valorC))){
                return new Errores('Semantico', 'Ya existe una variable con el mismo nombre', this.Linea, this.Columna);
            }
        }
     
        
    }
    // | tipo ids CORCHETEI CORCHETED IGUAL funcioncstr PYC { $$ = new DeclaracionCstr.default($1,$2,$6,@1.first_line,@1.first_column); }
    //funcioncstr : expresion C_STR PARENTESISI PARENTESISD

    buildAst(anterior: string): string {
        let contador = Contador.getInstance();
        let funcionDeclaracion = `n${contador.get()}`;
        let nodoTipo = `n${contador.get()}`;
        let nodoIds = `n${contador.get()}`;
        let nodoCorcheteI = `n${contador.get()}`;
        let nodoCorcheteD = `n${contador.get()}`;
        let nodoIgual = `n${contador.get()}`;
        let nodoFuncionCstr = `n${contador.get()}`;
        let nodoExpresion = `n${contador.get()}`;
    
        let resultado = `${funcionDeclaracion}[label="Declaracion"]\n`;
        resultado += `${nodoTipo}[label="${this.tipo.getTipo().toString()}"]\n`;
        resultado += `${funcionDeclaracion} -> ${nodoTipo}\n`;
        resultado += `${nodoIds}[label="Ids"]\n`;
        for (let id of this.id) {
            resultado += `${nodoIds} -> n${contador.get()}[label="${id}"]\n`;
        }
        resultado += `${funcionDeclaracion} -> ${nodoIds}\n`;
        resultado += `${nodoCorcheteI}[label="["]\n`;
        resultado += `${funcionDeclaracion} -> ${nodoCorcheteI}\n`;
        resultado += `${nodoCorcheteD}[label="]"]\n`;
        resultado += `${funcionDeclaracion} -> ${nodoCorcheteD}\n`;
        resultado += `${nodoIgual}[label="="]\n`;
        resultado += `${funcionDeclaracion} -> ${nodoIgual}\n`;
        resultado += `${nodoFuncionCstr}[label="FuncionCstr"]\n`;
        resultado += `${funcionDeclaracion} -> ${nodoFuncionCstr}\n`;
        resultado += this.Instruccion.buildAst(nodoExpresion);
        resultado += `${nodoFuncionCstr} -> ${nodoExpresion}\n`;
        resultado += `${anterior} -> ${funcionDeclaracion}\n`;
        return resultado;
    }
}