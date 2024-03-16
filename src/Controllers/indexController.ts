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
}

export const indexController = new Controller();
