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
}
exports.indexController = new Controller();
