import { Instruccion } from '../Abstracto/Instruccion';
import Errores from "../Excepciones/Errores";
import ArbolS from "../SimboloC/ArbolS";
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
        
        console.log("ENTRO A DECLARACION CSTR");
        let valor = this.Instruccion.interpretar(ArbolS, tabla);
        if(valor instanceof Errores) return valor;
        console.log("VALOR DE INSTRUCCION: ", valor);

        let valorC = valor.split('');

        console.log("VALOR DE INSTRUCCION ARRAY : ", valorC);
        for(let Identificador of this.id){
            if(!tabla.setVariable(new Simbolo(this.tipo, Identificador, valorC))){
                return new Errores('Semantico', 'Ya existe una variable con el mismo nombre', this.Linea, this.Columna);
            }
        }
     
        
    }
}