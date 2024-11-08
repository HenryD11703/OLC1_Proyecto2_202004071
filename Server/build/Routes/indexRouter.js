"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../Controllers/indexController");
const path = __importStar(require("path"));
class router {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', indexController_1.indexController.prueba);
        this.router.post('/post', indexController_1.indexController.postMethod);
        this.router.post('/analizar', indexController_1.indexController.analizar);
        this.router.post('/graficar', indexController_1.indexController.getGraph);
        this.router.post('/errores.html', indexController_1.indexController.reporteErrores);
        this.router.get('/errores', indexController_1.indexController.getErrores);
        this.router.get('/tabla_simbolos', indexController_1.indexController.getTablaSimbolos);
        this.router.get('/imagen-ast.png', (req, res) => {
            res.sendFile(path.join(__dirname, 'temp.png'));
        });
    }
}
const indexRouter = new router();
exports.default = indexRouter.router;
