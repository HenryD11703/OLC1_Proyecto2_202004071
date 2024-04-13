"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const ArbolS_1 = __importDefault(require("./Analisis/SimboloC/ArbolS"));
const TablaSimbolos_1 = __importDefault(require("./Analisis/SimboloC/TablaSimbolos"));
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
            let parser = require('./Analizador.js');
            let ast = new ArbolS_1.default(parser.parse(req.body.Entrada));
            let Tabla = new TablaSimbolos_1.default();
            Tabla.setNombre("Tabla Global");
            ast.setTablaGlobal(Tabla);
            ast.setConsola("");
            for (let i of ast.getInstrucciones()) {
                //console.log(i);
                var resultado = i.interpretar(ast, Tabla);
                console.log(resultado);
            }
            res.send({ message: 'Analizado :D', consola: ast.getConsola(), errores: ast.getErrores() });
        }
        catch (e) {
            console.log(e);
            res.json({ message: 'Error :( Ya no sale :c' });
        }
    }
}
exports.indexController = new Controller();
