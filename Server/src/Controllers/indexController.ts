import {Request, Response} from 'express';
import ArbolS from './Analisis/SimboloC/ArbolS';
import TablaSimbolos from './Analisis/SimboloC/TablaSimbolos';
import cors from 'cors';

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
            for(let i of ast.getInstrucciones()){
                //console.log(i);
                var resultado = i.interpretar(ast, Tabla);
                console.log(resultado);
            }
            res.send({message: 'Analizado :D', consola: ast.getConsola(), errores: ast.getErrores()});
  

        }catch(e: any){
            console.log(e);
            res.json({message: 'Error :( Ya no sale :c'})
        }
    }
}

export const indexController = new Controller();
