import { Router } from "express";
import { indexController } from "../Controllers/indexController";
import * as path from 'path';
class router{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
         
        this.router.get('/', indexController.prueba);
        this.router.post('/post', indexController.postMethod);
        this.router.post('/analizar', indexController.analizar);
        this.router.post('/graficar', indexController.getGraph);
        this.router.post('/errores.html', indexController.reporteErrores);
        this.router.get('/errores', indexController.getErrores); 
        this.router.get('/tabla_simbolos', indexController.getTablaSimbolos);
        this.router.get('/imagen-ast.png', (req, res) => {
            res.sendFile(path.join(__dirname, 'temp.png'));
          });
    }
}

const indexRouter = new router();
export default indexRouter.router;
