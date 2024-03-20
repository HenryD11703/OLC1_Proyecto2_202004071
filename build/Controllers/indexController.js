"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
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
            let resultado = parser.parse("int x,y,a,b; int z = 21; x=3; b=2; a=3; y=2; int prueba = x; int sumatoria = x+y+a+b+z;");
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.indexController = new Controller();
