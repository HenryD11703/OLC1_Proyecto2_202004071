import { Router } from "express";
import { indexController } from "../Controllers/indexController";

class router{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', indexController.prueba);
        this.router.post('/post', indexController.postMethod);
    }
}

const indexRouter = new router();
export default indexRouter.router;
