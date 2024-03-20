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
            let resultado = parser.parse("int x,y,a,b; int z = 21; x=3; b=2; a=3; y=2; int prueba = x; int sumatoria = x+y+a+b+z;");
  

        }catch(e: any){
            console.log(e);
        }
    }
}

export const indexController = new Controller();
