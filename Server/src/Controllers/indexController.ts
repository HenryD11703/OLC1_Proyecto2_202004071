import e, { Request, Response } from 'express';
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

    constructor() {
        this.analizar = this.analizar.bind(this);
    }

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

                console.log(i);

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
                if (i instanceof Errores) {
                    ast.addError(i);

                }


            }


            
            if (execute != null) {
                execute.interpretar(ast, Tabla);
            }

            this.reporteErrores(ast.getErrores());
            this.reporteTablaSimbolos(Tabla);


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

    private generarTablaHTML(tabla: TablaSimbolos, html: string, nivel: number = 0): string {
        if (tabla === undefined) {
            return html;
        }
    
        let tablaActual = tabla.getTablaActual();
        for (let [identificador, simbolo] of tablaActual) {
            
            let tipoSimbolo = ""

            if(simbolo.getTipoSimbolo().getTipo() == 0){
                tipoSimbolo = "Entero"
            }  else if(simbolo.getTipoSimbolo().getTipo() == 1){
                tipoSimbolo = "Decimal"
            } else if(simbolo.getTipoSimbolo().getTipo() == 2){
                tipoSimbolo = "boolean"
            } else if(simbolo.getTipoSimbolo().getTipo() == 3){
                tipoSimbolo = "Caracter"
            } else if(simbolo.getTipoSimbolo().getTipo() == 4){
                tipoSimbolo = "Cadena"
            } else if(simbolo.getTipoSimbolo().getTipo() == 5){
                tipoSimbolo = "Void"
            } else if(simbolo.getTipoSimbolo().getTipo() == 6){
                tipoSimbolo = "Vector"
            }

            html += `
                <tr>
                    <td>${'&nbsp;'.repeat(nivel * 4)}${identificador}</td>
                    <td>${tipoSimbolo}</td>
                    <td>${simbolo.getValor()}</td>
                </tr>
            `;
        }
    
        let tablaAnterior = tabla.getTablaAnterior();
        if (tablaAnterior) {
            html = this.generarTablaHTML(tablaAnterior, html, nivel + 1);
        }
    
        return html;
    }

    public reporteTablaSimbolos(tablaGlobal: TablaSimbolos) {
        let html = `
        <html>
            <head>
                <title>Tabla de Símbolos</title>
                <style>
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid black;
                        padding: 15px;
                        text-align: left;
                    }
                    th {
                        background-color: #4CAF50;
                        color: white;
                    }
                </style>
            </head>
            <body>
                <h1>Tabla de Símbolos</h1>
                <table>
                    <tr>
                        <th>Identificador</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                    </tr>
        `;


        const tablaHTML = this.generarTablaHTML(tablaGlobal, html);
        if (tablaHTML !== undefined) {
            html = tablaHTML;
        }

        html += `
                </table>
            </body>
        </html>
        `;

        // Escribir el archivo HTML en la carpeta Routes
        fs.writeFileSync('D:\\OLC1_Proyecto2_202004071\\Server\\build\\Routes\\tabla_simbolos.html', html);
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

    public getTablaSimbolos(req: Request, res: Response) {
        res.sendFile('D:\\OLC1_Proyecto2_202004071\\Server\\build\\Routes\\tabla_simbolos.html');
    }

    public getErrores(req: Request, res: Response) {
        res.sendFile('D:\\OLC1_Proyecto2_202004071\\Server\\build\\Routes\\errores.html');
    }


    public reporteErrores(errores: Errores[]) {
        let html = `
        <html>
            <head>
                <title>Reporte de Errores</title>
                <style>
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid black;
                        padding: 15px;
                        text-align: left;
                    }
                    th {
                        background-color: #4CAF50;
                        color: white;
                    }
                </style>
            </head>
            <body>
                <h1>Reporte de Errores</h1>
                <table>
                    <tr>
                        <th>Tipo</th>
                        <th>Descripción</th>
                        <th>Línea</th>
                        <th>Columna</th>
                    </tr>
        `;

        errores.forEach(error => {
            html += `
                <tr>
                    <td>${error.getTipoError()}</td>
                    <td>${error.getDescripcion()}</td>
                    <td>${error.getLinea()}</td>
                    <td>${error.getColumna()}</td>
                </tr>
            `;
        });

        html += `
                </table>
            </body>
        </html>
        `;
        //crear archivo html en la carpeta Routes con el contenido de la variable html
        fs.writeFileSync('D:\\OLC1_Proyecto2_202004071\\Server\\build\\Routes\\errores.html', html);

    }
}

export const indexController = new Controller();