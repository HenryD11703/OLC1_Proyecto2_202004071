import { Request, Response } from 'express';
import ArbolS from './Analisis/SimboloC/ArbolS';
import TablaSimbolos from './Analisis/SimboloC/TablaSimbolos';
import cors from 'cors';
import Funcion from './Analisis/Instrucciones/Funcion';
import Declaracion from './Analisis/Instrucciones/Declaracion';
import DeclaracionArr from './Analisis/Instrucciones/DeclaracionArr';
import DeclaracionCstr from './Analisis/Instrucciones/DeclaracionCstr';
import Execute from './Analisis/Instrucciones/Execute';
import Contador from './Analisis/SimboloC/Contador';
import Errores from './Analisis/Excepciones/Errores';
import { writeFile } from 'fs';
import fs from 'fs';
import { spawn } from 'child_process';

var AstGraphviz: string;
//para hacer la grafica del ast

class Controller {
    public prueba(req: Request, res: Response) {
        res.json({ message: 'Hello World' })
    }

    public postMethod(req: Request, res: Response) {
        console.log(req.body);
        console.log(req.body.notas);
        res.json({ message: 'Post Method' })
    }



    public analizar(req: Request, res: Response) {
        
        try {

            AstGraphviz = "";
            let parser = require('./Analizador.js');
            let ast = new ArbolS(parser.parse(req.body.Entrada));
            ast.setConsola("");
            let Tabla = new TablaSimbolos();
            Tabla.setNombre("Tabla Global");
            ast.setTablaGlobal(Tabla);
            ast.setConsola("");

            let execute = null;

            for (let i of ast.getInstrucciones()) {

        

                if (i instanceof Funcion) {
                    i.id = i.id.toLocaleLowerCase();
                    ast.addFunciones(i);
                }
                if (i instanceof Declaracion) {
                    i.interpretar(ast, Tabla);
                }

                if (i instanceof DeclaracionArr) {
                    i.interpretar(ast, Tabla);
                }
                if (i instanceof DeclaracionCstr) {
                    i.interpretar(ast, Tabla);
                }

                if (i instanceof Execute) {
                    execute = i
                }

            }
            if (execute != null) {
                execute.interpretar(ast, Tabla);
            }

            let contador = Contador.getInstance();
            let cadenaGraph = "digraph G {\n";
            cadenaGraph += "n0[label=\"Inicio\"]\n";
            cadenaGraph += "nCodigo[label=\"Codigo\"]\n";
            cadenaGraph += "n0 -> nCodigo\n";

            //aca recorrer el ast con getInstrucciones para ir creando los nodos

            for (let i of ast.getInstrucciones()) {
                if (i instanceof Errores) continue;
                let NodoAst = `n${contador.get()}`
                cadenaGraph += `${NodoAst}[label="Instruccion"]\n`;
                cadenaGraph += `nCodigo -> ${NodoAst}\n`;
                cadenaGraph += i.buildAst(NodoAst);
            }
            cadenaGraph += "\n}";
            AstGraphviz = cadenaGraph;

            res.send({ message: 'Analizado :D', consola: ast.getConsola(), errores: ast.getErrores() });

        } catch (e: any) {
            console.log(e);
            res.json({ message: 'Error :( Ya no sale :c' })
        }
    }
    public getGraph(req: Request, res: Response) {
        const dotContent = AstGraphviz;
        const tempDotFile = 'D:\\OLC1_Proyecto2_202004071\\Server\\build\\Routes\\temp.dot';
        fs.writeFileSync(tempDotFile, dotContent);
        const tempPngFile = 'D:\\OLC1_Proyecto2_202004071\\Server\\build\\Routes\\temp.png';
        const dot = spawn('dot', ['-Tpng', tempDotFile, '-o', tempPngFile]);
        dot.on('close', () => {
            res.sendFile(tempPngFile);
        });
        

    }
}

export const indexController = new Controller();
