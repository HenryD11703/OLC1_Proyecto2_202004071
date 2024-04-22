"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const ArbolS_1 = __importDefault(require("./Analisis/SimboloC/ArbolS"));
const TablaSimbolos_1 = __importDefault(require("./Analisis/SimboloC/TablaSimbolos"));
const Funcion_1 = __importDefault(require("./Analisis/Instrucciones/Funcion"));
const Declaracion_1 = __importDefault(require("./Analisis/Instrucciones/Declaracion"));
const DeclaracionArr_1 = __importDefault(require("./Analisis/Instrucciones/DeclaracionArr"));
const DeclaracionCstr_1 = __importDefault(require("./Analisis/Instrucciones/DeclaracionCstr"));
const Execute_1 = __importDefault(require("./Analisis/Instrucciones/Execute"));
const Contador_1 = __importDefault(require("./Analisis/SimboloC/Contador"));
const Errores_1 = __importDefault(require("./Analisis/Excepciones/Errores"));
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
var AstGraphviz;
//para hacer la grafica del ast
class Controller {
    prueba(req, res) {
        res.json({ message: 'Hello World' });
    }
    postMethod(req, res) {
        console.log(req.body);
        console.log(req.body.notas);
        res.json({ message: 'Post Method' });
    }
    analizar(req, res) {
        try {
            AstGraphviz = "";
            let parser = require('./Analizador.js');
            let ast = new ArbolS_1.default(parser.parse(req.body.Entrada));
            ast.setConsola("");
            let Tabla = new TablaSimbolos_1.default();
            Tabla.setNombre("Tabla Global");
            ast.setTablaGlobal(Tabla);
            ast.setConsola("");
            let execute = null;
            for (let i of ast.getInstrucciones()) {
                console.log(i);
                if (i instanceof Funcion_1.default) {
                    i.id = i.id.toLocaleLowerCase();
                    ast.addFunciones(i);
                }
                if (i instanceof Declaracion_1.default) {
                    i.interpretar(ast, Tabla);
                }
                if (i instanceof DeclaracionArr_1.default) {
                    i.interpretar(ast, Tabla);
                }
                if (i instanceof DeclaracionCstr_1.default) {
                    i.interpretar(ast, Tabla);
                }
                if (i instanceof Execute_1.default) {
                    execute = i;
                }
                if (i instanceof Errores_1.default) {
                    ast.addError(i);
                }
            }
            console.log(ast.getErrores());
            if (execute != null) {
                execute.interpretar(ast, Tabla);
            }
            let contador = Contador_1.default.getInstance();
            let cadenaGraph = "digraph G {\n";
            cadenaGraph += "n0[label=\"Inicio\"]\n";
            cadenaGraph += "nCodigo[label=\"Codigo\"]\n";
            cadenaGraph += "n0 -> nCodigo\n";
            //aca recorrer el ast con getInstrucciones para ir creando los nodos
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Errores_1.default)
                    continue;
                let NodoAst = `n${contador.get()}`;
                cadenaGraph += `${NodoAst}[label="Instruccion"]\n`;
                cadenaGraph += `nCodigo -> ${NodoAst}\n`;
                cadenaGraph += i.buildAst(NodoAst);
            }
            cadenaGraph += "\n}";
            AstGraphviz = cadenaGraph;
            res.send({ message: 'Analizado :D', consola: ast.getConsola(), errores: ast.getErrores() });
        }
        catch (e) {
            console.log(e);
            res.json({ message: 'Error :( Ya no sale :c' });
        }
    }
    getGraph(req, res) {
        const dotContent = AstGraphviz;
        const tempDotFile = 'D:\\OLC1_Proyecto2_202004071\\Server\\build\\Routes\\temp.dot';
        fs_1.default.writeFileSync(tempDotFile, dotContent);
        const tempPngFile = 'D:\\OLC1_Proyecto2_202004071\\Server\\build\\Routes\\temp.png';
        const dot = (0, child_process_1.spawn)('dot', ['-Tpng', tempDotFile, '-o', tempPngFile]);
        dot.on('close', () => {
            res.sendFile(tempPngFile);
        });
    }
    reporteErrores(errores) {
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
                    <td>${error.getTipoError}</td>
                    <td>${error.getDescripcion}</td>
                    <td>${error.getLinea}</td>
                    <td>${error.getColumna}</td>
                </tr>
            `;
        });
        html += `
                </table>
            </body>
        </html>
        `;
        console.log(html);
        return html;
    }
}
exports.indexController = new Controller();
