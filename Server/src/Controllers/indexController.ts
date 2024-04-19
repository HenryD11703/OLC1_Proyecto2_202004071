import {Request, Response} from 'express';
import ArbolS from './Analisis/SimboloC/ArbolS';
import TablaSimbolos from './Analisis/SimboloC/TablaSimbolos';
import cors from 'cors';
import Funcion from './Analisis/Instrucciones/Funcion';
import Declaracion from './Analisis/Instrucciones/Declaracion';
import DeclaracionArr from './Analisis/Instrucciones/DeclaracionArr';
import DeclaracionCstr from './Analisis/Instrucciones/DeclaracionCstr';
import Execute from './Analisis/Instrucciones/Execute';
import VariablesA from './Analisis/Instrucciones/VariablesA';
import Impresion from './Analisis/Instrucciones/Impresion';
import Incremento from './Analisis/Instrucciones/Incremento';
import FuncionIf from './Analisis/Instrucciones/FuncionIf';
import Break from './Analisis/Instrucciones/Break';
import FuncionWhile from './Analisis/Instrucciones/FuncionWhile';
import FuncionFor from './Analisis/Instrucciones/FuncionFor';
import FuncionDo from './Analisis/Instrucciones/FuncionDo';
import Continue from './Analisis/Instrucciones/Continue';
import Return from './Analisis/Instrucciones/Return';
import AccesoVec from './Analisis/Expresiones/AccesoVec';
import FuncionSwitch from './Analisis/Instrucciones/funcionSwitch';
import Llamada from './Analisis/Instrucciones/Llamada';

class Controller {
    public prueba(req: Request, res: Response) {
        res.json({message: 'Hello World'})
    }

    public postMethod(req: Request, res: Response) {
        console.log(req.body);
        console.log(req.body.notas);
        res.json({message: 'Post Method'})
    }

   

    public analizar(req: Request, res: Response) {
        try{
            let parser = require('./Analizador.js');
            let ast = new ArbolS(parser.parse(req.body.Entrada));
            let Tabla = new TablaSimbolos();
            Tabla.setNombre("Tabla Global");
            ast.setTablaGlobal(Tabla);
            ast.setConsola("");

            let execute = null;

            for( let i of ast.getInstrucciones()){
                if(i instanceof Funcion){
                    i.id = i.id.toLocaleLowerCase();
                    ast.addFunciones(i);
                }
                if(i instanceof Declaracion){
                    i.interpretar(ast, Tabla);
                }

                if(i instanceof DeclaracionArr){
                    i.interpretar(ast, Tabla);
                }
                if(i instanceof DeclaracionCstr){
                    i.interpretar(ast, Tabla);
                }
                                 
                if(i instanceof Execute){
                    execute = i
                }
               
            }
            if(execute != null){
                execute.interpretar(ast, Tabla);
            }
             
            res.send({message: 'Analizado :D', consola: ast.getConsola(), errores: ast.getErrores()});

        }catch(e: any){
            console.log(e);
            res.json({message: 'Error :( Ya no sale :c'})
        }
    }
}

export const indexController = new Controller();
