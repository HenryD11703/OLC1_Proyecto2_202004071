import { Instruccion } from "../Abstracto/Instruccion";
import ArbolS from "../SimboloC/ArbolS";
import TablaSimbolos from "../SimboloC/TablaSimbolos";
import Tipo, { TipoDato } from "../SimboloC/Tipo";
import Errores from "../Excepciones/Errores";


export default class Casteos extends Instruccion {
    private TipoCast: TipoCasteo;
    private valor: Instruccion;

    constructor(TipoCast: TipoCasteo, valor: Instruccion, linea: number, columna: number) {
        super(new Tipo(TipoDato.VOID), linea, columna);
        this.TipoCast = TipoCast;
        this.valor = valor;
    }

    interpretar(arbolS: ArbolS, tabla: TablaSimbolos) {
        const valor = this.valor.interpretar(arbolS, tabla);
        if (valor instanceof Errores) return valor;

        switch (this.TipoCast) {
            case TipoCasteo.aENTERO:
                return this.aEntero(valor);
            case TipoCasteo.aDECIMAL:
                return this.aDecimal(valor);
            case TipoCasteo.aCADENA:
                return this.aCadena(valor);
            case TipoCasteo.aCARACTER:
                return this.aCaracter(valor);
            default:
                return new Errores('Semantico', `Casteo de Tipo invalido`, this.Linea, this.Columna);
        }
    }

    aEntero(valor: any) {
        let TipoV = this.valor.Tipo.getTipo();

        switch (TipoV) {
            //Si es un entero se retorna el mismo valor
            case TipoDato.ENTERO:
                this.Tipo = new Tipo(TipoDato.ENTERO);
                return valor;
            //Si es un decimal se convierte a entero
            case TipoDato.DECIMAL:
                this.Tipo = new Tipo(TipoDato.ENTERO);
                return Math.floor(valor);
            //Si es un caracter se convierte a entero
            case TipoDato.CARACTER:
                this.Tipo = new Tipo(TipoDato.ENTERO);
                return valor.charCodeAt(0);
            //Los demas tipos de datos no se pueden convertir a entero
            case TipoDato.BOOLEANO:
                return new Errores('Semantico', `No se puede convertir un booleano a entero`, this.Linea, this.Columna);
            case TipoDato.CADENA:
                return new Errores('Semantico', `No se puede convertir una cadena a entero`, this.Linea, this.Columna);
            default:
                return new Errores('Semantico', `Tipo de dato no valido`, this.Linea, this.Columna);
        }
    }

    aDecimal(valor: any) {
        let TipoV = this.valor.Tipo.getTipo();
        switch (TipoV) {
            //Si es un decimal se retorna el mismo valor
            case TipoDato.DECIMAL:
                this.Tipo = new Tipo(TipoDato.DECIMAL);
                return valor;
            //Si es un entero se convierte a decimal
            case TipoDato.ENTERO:
                this.Tipo = new Tipo(TipoDato.DECIMAL);
                return parseFloat(valor);
            //Si es un caracter se convierte a decimal
            case TipoDato.CARACTER:
                this.Tipo = new Tipo(TipoDato.DECIMAL);
                return parseFloat(valor.charCodeAt(0));
            //Los demas tipos de datos no se pueden convertir a decimal
            case TipoDato.BOOLEANO:
                return new Errores('Semantico', `No se puede convertir un booleano a decimal`, this.Linea, this.Columna);
            case TipoDato.CADENA:
                return new Errores('Semantico', `No se puede convertir una cadena a decimal`, this.Linea, this.Columna);
            default:
                return new Errores('Semantico', `Tipo de dato no valido`, this.Linea, this.Columna);
        }
    }

    aCadena(valor: any) {
        let TipoV = this.valor.Tipo.getTipo();
        switch (TipoV) {
            case TipoDato.CADENA:
                this.Tipo = new Tipo(TipoDato.CADENA);
                return valor;
            //Si es un entero se convierte a cadena
            case TipoDato.ENTERO:
                this.Tipo = new Tipo(TipoDato.CADENA);
                return valor.toString();
            //Si es un decimal se convierte a cadena
            case TipoDato.DECIMAL:
                this.Tipo = new Tipo(TipoDato.CADENA);
                return valor.toString();
            //Los demas tipos de datos no se pueden convertir a cadena
            case TipoDato.BOOLEANO:
                return new Errores('Semantico', `No se puede convertir un booleano a cadena`, this.Linea, this.Columna);
            case TipoDato.CARACTER:
                return new Errores('Semantico', `No se puede convertir un caracter a cadena`, this.Linea, this.Columna);
            default:
                return new Errores('Semantico', `Tipo de dato no valido`, this.Linea, this.Columna);
        }
    }

    aCaracter(valor: any) {
        let TipoV = this.valor.Tipo.getTipo();
        switch (TipoV) {
            //Solo se puede convertir un entero a caracter
            case TipoDato.ENTERO:
                this.Tipo = new Tipo(TipoDato.CARACTER);
                return String.fromCharCode(valor);
            //Los demas tipos de datos no se pueden convertir a caracter
            case TipoDato.DECIMAL:
                return new Errores('Semantico', `No se puede convertir un decimal a caracter`, this.Linea, this.Columna);
            case TipoDato.BOOLEANO:
                return new Errores('Semantico', `No se puede convertir un booleano a caracter`, this.Linea, this.Columna);
            case TipoDato.CADENA:
                return new Errores('Semantico', `No se puede convertir una cadena a caracter`, this.Linea, this.Columna);
            case TipoDato.CARACTER:
                this.Tipo = new Tipo(TipoDato.CARACTER);
                return valor;
            default:
                return new Errores('Semantico', `Tipo de dato no valido`, this.Linea, this.Columna);
        }
    }
}

export enum TipoCasteo {
    aENTERO,
    aDECIMAL,
    aCADENA,
    aCARACTER
}