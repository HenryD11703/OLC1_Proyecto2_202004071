"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../Controllers/indexController");
class router {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', indexController_1.indexController.prueba);
        this.router.post('/post', indexController_1.indexController.postMethod);
        this.router.get('/analizar', indexController_1.indexController.analizar);
    }
}
const indexRouter = new router();
exports.default = indexRouter.router;
