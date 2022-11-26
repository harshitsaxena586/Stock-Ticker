import {NextFunction, Request, Response} from "express";

type ControllerTypes = {
    findPrice: (req: Request, res: Response, next: NextFunction) => void
    findSymbol: (req: Request, res: Response, next: NextFunction) => void
}

type SymbolResponseTypes ={
    description: string,
    displaySymbol: string,
    symbol: string,
    type: string
}

const finnhub = require('finnhub');

const FINNHUB_API_KEY = finnhub.ApiClient.instance.authentication['api_key'];
FINNHUB_API_KEY.api_key = "bv4mnbf48v6qpate9n30"

const finnhubClient = new finnhub.DefaultApi();
const finnhubController: ControllerTypes = {} as ControllerTypes;

finnhubController.findPrice = async(req:Request, res: Response, next:NextFunction) =>{
    console.log('body', req.body);
    const symbol = req.body.symbol || 'Default Symbol'

    let promiseResolve: any, promiseReject;
    let promise = new Promise(function (resolve, reject) {
        promiseResolve = resolve;
        promiseReject = reject;
    });

    finnhubClient.quote(symbol,(error:any, data:any, response:any) =>{
        if (data.d === null) {
            next({
                log: 'Entered Symbol not Found.',
                status: 204,
                message: { err: 'Entered Symbol is Invalid' },
            })
            promiseResolve();
        } else {
            res.locals.price = data.c;
            res.locals.percent = data.dp;
            promiseResolve();
            return next()
        }
    })
    return promise;
};

finnhubController.findSymbol = (req:Request, res:Response, next:NextFunction) => {
    const symbol = req.body.symbol || 'Default Symbol'

    let promiseResolve: any, promiseReject;
    let promise = new Promise(function (resolve, reject) {
        promiseResolve = resolve;
        promiseReject = reject;
    });
    
    finnhubClient.symbolSearch(symbol, (error: any, data: any, response: any) => {
        
        const results = data.result.find((element: SymbolResponseTypes) => {
            return element.symbol === symbol;
        })
        if (results) {
            res.locals.name = results.description
        } else {
            res.locals.name = 'No Results'
        }
        promiseResolve()
        return next()
    });
    return promise;
}

export default finnhubController;



