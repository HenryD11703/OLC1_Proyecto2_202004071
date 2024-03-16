import {Request, Response} from 'express';

class Controller {
    public prueba(req: Request, res: Response) {
        res.json({message: 'Hello World'})
    }

    public postMethod(req: Request, res: Response) {
        console.log(req.body);
        console.log(req.body.notas);
        res.json({message: 'Post Method'})
    }

    public analizar(req: Request, res: Response) {
        try{
            let parser = require('./Analizador.js');
            let resultado = parser.parse("int x,y;");
  

        }catch(e: any){
            console.log(e);
        }
    }
}

export const indexController = new Controller();
