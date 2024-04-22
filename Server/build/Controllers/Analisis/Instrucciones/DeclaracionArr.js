"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstracto/Instruccion");
const Errores_1 = __importDefault(require("../Excepciones/Errores"));
const Contador_1 = __importDefault(require("../SimboloC/Contador"));
const Simbolo_1 = __importDefault(require("../SimboloC/Simbolo"));
const Tipo_1 = require("../SimboloC/Tipo");
//Para la declaracion de arreglos de tipo1 donde solo se obtendra el tipo, el id y el tamaño (para de una o dos dimensiones)
//Ejemplo: int vector1[] = new int[4];      char vector2[][] = new char[4][4];
//Para la declaracion de arreglos de tipo2 donde se obtendra el tipo, el id y una lista de valores (para de una o dos dimensiones)
//Ejemplo: std::string vector3[] = ["Hola", "Mundo"];   int vector4 [][] = [ [1, 2], [3, 4] ];
//En el caso uno asignar cada espacio del arreglo con el valor por defecto del tipo de dato
//En el caso dos asignar cada espacio del arreglo con el valor de la lista de valores
//Por lo tanto el constructor recibira el tipo de dato, el id, el tamaño1 y el tamaño2? o la lista de valores1 y la lista de valores2?, por la manera 
//en la que se declaran los arreglos tambien se recibel el otro tipo de dato que se encuentra en el arreglo para el tipo1, y para el tipo2 hay que verificar
//que todos los valores sean del mismo tipo de dato que el arreglo
class DeclaracionArr extends Instruccion_1.Instruccion {
    constructor(tipo, linea, columna, id, tamaño1, tamaño2, tipo2, valores, valores2) {
        super(tipo, linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.tamaño1 = tamaño1;
        this.tamaño2 = tamaño2;
        this.tipo2 = tipo2;
        this.valores = valores;
        this.valores2 = valores2;
    }
    interpretar(ArbolS, tabla) {
        //primero verificaremos si es tipo1 o tipo2, el tipo uno tiene null en valores y valores2
        //y el tipo dos tiene null en tamaño1 y tamaño2 y tipo2
        //ya luego se revisara en tipo1 si es de una o dos dimensiones
        var _a, _b, _c, _d;
        if (this.tamaño1 !== null && this.tamaño2 == null) {
            if (this.tipo.getTipo() !== ((_a = this.tipo2) === null || _a === void 0 ? void 0 : _a.getTipo())) {
                return new Errores_1.default('Semantico', `El tipo de dato ${this.tipo.getTipo()} no es igual al tipo de dato ${(_b = this.tipo2) === null || _b === void 0 ? void 0 : _b.getTipo()}`, this.Linea, this.Columna);
            }
            //Es de tipo 1 de una dimension
            let Longitud1 = this.tamaño1.interpretar(ArbolS, tabla);
            if (Longitud1 instanceof Errores_1.default)
                return Longitud1;
            //como es un arreglo de tipo1 crearlo y asignar valores por defecto del tipo de dato
            let arreglo = [];
            for (let i = 0; i < Longitud1; i++) {
                let valorPorDefecto;
                switch (this.tipo.getTipo()) {
                    case Tipo_1.TipoDato.ENTERO:
                        valorPorDefecto = 0;
                        break;
                    case Tipo_1.TipoDato.DECIMAL:
                        valorPorDefecto = 0.0;
                        break;
                    case Tipo_1.TipoDato.BOOLEANO:
                        valorPorDefecto = true;
                        break;
                    case Tipo_1.TipoDato.CADENA:
                        valorPorDefecto = "";
                        break;
                    case Tipo_1.TipoDato.CARACTER:
                        valorPorDefecto = '0';
                        break;
                    default:
                        return new Errores_1.default('Semantico', `El tipo de dato ${this.tipo.getTipo()} no es valido`, this.Linea, this.Columna);
                        break;
                }
                arreglo.push(valorPorDefecto);
            }
            //agregar a la tabla de simbolos
            for (let ide of this.id) {
                if (!tabla.setVariable(new Simbolo_1.default(this.tipo, ide, arreglo))) {
                    return new Errores_1.default('Semantico', `La variable ${this.id} ya existe`, this.Linea, this.Columna);
                }
            }
        }
        else if (this.tamaño1 !== null && this.tamaño2 !== null) {
            if (this.tipo.getTipo() !== ((_c = this.tipo2) === null || _c === void 0 ? void 0 : _c.getTipo())) {
                return new Errores_1.default('Semantico', `El tipo de dato ${this.tipo.getTipo()} no es igual al tipo de dato ${(_d = this.tipo2) === null || _d === void 0 ? void 0 : _d.getTipo()}`, this.Linea, this.Columna);
            }
            // Es de tipo 1 de dos dimensiones
            let Longitud1 = this.tamaño1.interpretar(ArbolS, tabla);
            if (Longitud1 instanceof Errores_1.default)
                return Longitud1;
            let Longitud2 = this.tamaño2.interpretar(ArbolS, tabla);
            if (Longitud2 instanceof Errores_1.default)
                return Longitud2;
            // Como es un arreglo de tipo1, crearlo y asignar valores por defecto del tipo de dato, de sus dos dimensiones
            let arreglo = [];
            for (let i = 0; i < Longitud1; i++) {
                let arreglo2 = [];
                for (let j = 0; j < Longitud2; j++) {
                    let valorPorDefecto;
                    switch (this.tipo.getTipo()) {
                        case Tipo_1.TipoDato.ENTERO:
                            valorPorDefecto = 0;
                            break;
                        case Tipo_1.TipoDato.DECIMAL:
                            valorPorDefecto = 0.0;
                            break;
                        case Tipo_1.TipoDato.BOOLEANO:
                            valorPorDefecto = true;
                            break;
                        case Tipo_1.TipoDato.CADENA:
                            valorPorDefecto = "";
                            break;
                        case Tipo_1.TipoDato.CARACTER:
                            valorPorDefecto = '0';
                            break;
                        default:
                            return new Errores_1.default('Semantico', `El tipo de dato ${this.tipo.getTipo()} no es valido`, this.Linea, this.Columna);
                            break;
                    }
                    arreglo2.push(valorPorDefecto);
                }
                arreglo.push(arreglo2);
            }
            // Agregar a la tabla de símbolos
            for (let ide of this.id) {
                if (!tabla.setVariable(new Simbolo_1.default(this.tipo, ide, arreglo))) {
                    return new Errores_1.default('Semantico', `La variable ${this.id} ya existe`, this.Linea, this.Columna);
                }
            }
        }
        else if (this.valores !== null && this.valores2 == null) {
            //Es de tipo 2 de una dimension
            let arreglo3 = [];
            for (let val of this.valores) {
                let valorFinal = val.interpretar(ArbolS, tabla);
                if (valorFinal instanceof Errores_1.default)
                    return valorFinal;
                arreglo3.push(valorFinal);
            }
            //agregar a la tabla de simbolos
            for (let ide of this.id) {
                if (!tabla.setVariable(new Simbolo_1.default(this.tipo, ide, arreglo3))) {
                    return new Errores_1.default('Semantico', `La variable ${this.id} ya existe`, this.Linea, this.Columna);
                }
            }
        }
        else if (this.valores !== null && this.valores2 !== null) {
            //Es de tipo 2 de dos dimensiones
            let arreglo4 = [];
            let arreglo5 = [];
            for (let val of this.valores) {
                let valorFinal = val.interpretar(ArbolS, tabla);
                if (valorFinal instanceof Errores_1.default)
                    return valorFinal;
                arreglo5.push(valorFinal);
            }
            let arreglo6 = [];
            for (let val of this.valores2) {
                let valorFinal = val.interpretar(ArbolS, tabla);
                if (valorFinal instanceof Errores_1.default)
                    return valorFinal;
                arreglo6.push(valorFinal);
            }
            arreglo4.push(arreglo5);
            arreglo4.push(arreglo6);
            //agregar a la tabla de simbolos
            for (let ide of this.id) {
                if (!tabla.setVariable(new Simbolo_1.default(this.tipo, ide, arreglo4))) {
                    return new Errores_1.default('Semantico', `La variable ${this.id} ya existe`, this.Linea, this.Columna);
                }
            }
        }
    }
    /*
    declaracionArr : tipo ids CORCHETEI CORCHETED IGUAL NEW tipo CORCHETEI expresion CORCHETED PYC  { $$ = new DeclaracionArr.default($1, @1.first_line, @1.first_column, $2, $9,null,$7,null,null); }
               | tipo ids CORCHETEI CORCHETED CORCHETEI CORCHETED IGUAL NEW tipo CORCHETEI expresion CORCHETED CORCHETEI expresion CORCHETED PYC        { $$ = new DeclaracionArr.default($1, @1.first_line, @1.first_column, $2, $11,$14,$9,null,null); }
               | tipo ids CORCHETEI CORCHETED IGUAL CORCHETEI lista_valores CORCHETED PYC     { $$ = new DeclaracionArr.default($1, @1.first_line, @1.first_column, $2, null,null,null,$7,null); }
               | tipo ids CORCHETEI CORCHETED CORCHETEI CORCHETED IGUAL CORCHETEI CORCHETEI lista_valores CORCHETED COMA  CORCHETEI lista_valores CORCHETED CORCHETED PYC { $$ = new DeclaracionArr.default($1, @1.first_line, @1.first_column, $2, null,null,null,$10,$14); }
               | tipo ids CORCHETEI CORCHETED IGUAL funcioncstr PYC { $$ = new DeclaracionCstr.default($1,$2,$6,@1.first_line,@1.first_column); }

;

    lista_valores : lista_valores COMA expresion        { $1.push($3); $$ = $1; }
                | expresion                           { $$ = [$1]; }
    
    */
    buildAst(anterior) {
        var _a, _b;
        let contador = Contador_1.default.getInstance();
        let funcionDeclaracion = `n${contador.get()}`;
        let nodoTipo = `n${contador.get()}`;
        let nodoIds = `n${contador.get()}`;
        let nodoCorcheteI = `n${contador.get()}`;
        let nodoCorcheteD = `n${contador.get()}`;
        // Para el tipo 1
        if (this.tamaño1 !== null && this.tamaño2 == null) {
            let nodoIgual = `n${contador.get()}`;
            let nodoNew = `n${contador.get()}`;
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
            resultado += `${nodoNew}[label="NEW"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoNew}\n`;
            resultado += `${nodoTipo}[label="${(_a = this.tipo2) === null || _a === void 0 ? void 0 : _a.getTipo().toString()}"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoTipo}\n`;
            resultado += `${nodoCorcheteI}[label="["]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoCorcheteI}\n`;
            resultado += this.tamaño1.buildAst(nodoExpresion);
            resultado += `${funcionDeclaracion} -> ${nodoExpresion}\n`;
            resultado += `${nodoCorcheteD}[label="]"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoCorcheteD}\n`;
            resultado += `${anterior} -> ${funcionDeclaracion}\n`;
            return resultado;
        }
        else if (this.tamaño1 !== null && this.tamaño2 !== null) {
            let nodoIgual = `n${contador.get()}`;
            let nodoNew = `n${contador.get()}`;
            let nodoExpresion1 = `n${contador.get()}`;
            let nodoExpresion2 = `n${contador.get()}`;
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
            resultado += `${nodoCorcheteI}[label="["]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoCorcheteI}\n`;
            resultado += `${nodoCorcheteD}[label="]"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoCorcheteD}\n`;
            resultado += `${nodoIgual}[label="="]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoIgual}\n`;
            resultado += `${nodoNew}[label="NEW"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoNew}\n`;
            resultado += `${nodoTipo}[label="${(_b = this.tipo2) === null || _b === void 0 ? void 0 : _b.getTipo().toString()}"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoTipo}\n`;
            resultado += `${nodoCorcheteI}[label="["]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoCorcheteI}\n`;
            resultado += this.tamaño1.buildAst(nodoExpresion1);
            resultado += `${funcionDeclaracion} -> ${nodoExpresion1}\n`;
            resultado += `${nodoCorcheteD}[label="]"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoCorcheteD}\n`;
            resultado += `${nodoCorcheteI}[label="["]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoCorcheteI}\n`;
            resultado += this.tamaño2.buildAst(nodoExpresion2);
            resultado += `${funcionDeclaracion} -> ${nodoExpresion2}\n`;
            resultado += `${nodoCorcheteD}[label="]"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoCorcheteD}\n`;
            resultado += `${anterior} -> ${funcionDeclaracion}\n`;
            return resultado;
        }
        else if (this.valores !== null && this.valores2 == null) {
            let nodoCorcheteI = `n${contador.get()}`;
            let nodoCorcheteD = `n${contador.get()}`;
            let nodoIgual = `n${contador.get()}`;
            let nodoValores = `n${contador.get()}`;
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
            resultado += `${nodoCorcheteI}[label="["]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoCorcheteI}\n`;
            resultado += `${nodoValores}[label="Valores"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoValores}\n`;
            for (let valor of this.valores) {
                let nodoValor = `n${contador.get()}`;
                resultado += valor.buildAst(nodoValor);
                resultado += `${nodoValores} -> ${nodoValor}\n`;
            }
            resultado += `${nodoCorcheteD}[label="]"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoCorcheteD}\n`;
            resultado += `${anterior} -> ${funcionDeclaracion}\n`;
            return resultado;
        }
        else if (this.valores !== null && this.valores2 !== null) {
            let nodoCorcheteI = `n${contador.get()}`;
            let nodoCorcheteD = `n${contador.get()}`;
            let nodoIgual = `n${contador.get()}`;
            let nodoValores = `n${contador.get()}`;
            let nodoValores2 = `n${contador.get()}`;
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
            resultado += `${nodoCorcheteI}[label="["]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoCorcheteI}\n`;
            resultado += `${nodoCorcheteD}[label="]"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoCorcheteD}\n`;
            resultado += `${nodoIgual}[label="="]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoIgual}\n`;
            resultado += `${nodoCorcheteI}[label="["]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoCorcheteI}\n`;
            resultado += `${nodoValores}[label="Valores"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoValores}\n`;
            for (let valor of this.valores) {
                let nodoValor = `n${contador.get()}`;
                resultado += valor.buildAst(nodoValor);
                resultado += `${nodoValores} -> ${nodoValor}\n`;
            }
            resultado += `${nodoCorcheteD}[label="]"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoCorcheteD}\n`;
            resultado += `${nodoCorcheteI}[label="["]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoCorcheteI}\n`;
            resultado += `${nodoValores2}[label="Valores"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoValores2}\n`;
            for (let valor of this.valores2) {
                let nodoValor = `n${contador.get()}`;
                resultado += valor.buildAst(nodoValor);
                resultado += `${nodoValores2} -> ${nodoValor}\n`;
            }
            resultado += `${nodoCorcheteD}[label="]"]\n`;
            resultado += `${funcionDeclaracion} -> ${nodoCorcheteD}\n`;
            resultado += `${anterior} -> ${funcionDeclaracion}\n`;
            return resultado;
        }
        return "";
    }
}
exports.default = DeclaracionArr;
