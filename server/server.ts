import express, { NextFunction, Request, Response ,Errback} from 'express'
import finnhubController from './controllers/finnhubController';

const PORT = process.env.port || 3000;

const application = express();
application.use(express.json())

application.use('/api/v1',
finnhubController.findPrice,
finnhubController.findSymbol,
(req,res) =>{
    return res.status(200).json(res.locals)
})

application.use(express.static('build'));

application.use((req: Request, res: Response) => res.status(404));

application.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
    const defaultErr = {
        log: 'Caught Unknown Express Error',
        status: 500,
        message: { err: 'Error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

application.listen(PORT, () => {
    console.log(`Listening port ${PORT}...`);
  });