import express, { NextFunction, Request, Response } from 'express'
const finnhub = require('finnhub');


const FINNHUB_API_KEY = finnhub.ApiClient.instance.authentications['api_key'];
FINNHUB_API_KEY.apiKey = "bv4mnbf48v6qpate9n30"
const finnhubClient = new finnhub.DefaultApi()


type ControllerTypes = {
    findPrice: (req: Request, res: Response, next: NextFunction) => void
    findSymbol: (req: Request, res: Response, next: NextFunction) => void
}

const finnhubController: ControllerTypes = {} as ControllerTypes;

type SymbolResponseTypes = {
    description: string,
    displaySymbol: string,
    symbol: string,
    type: string
}

finnhubController.findPrice = async (req: Request, res: Response, next: NextFunction) => {
    
    console.log('body', req.body)
    const symbol = req.body.symbol || 'Default Symbol'
    
    let promiseResolve: any, promiseReject;
    let promise = new Promise(function (resolve, reject) {
        promiseResolve = resolve;
        promiseReject = reject;
    });
     finnhubClient.quote(symbol, (error: any, data: any, response: any) => {
        console.log('data', data)
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

    
    
    return promise

}

finnhubController.findSymbol = (req: Request, res: Response, next: NextFunction) => {
    const symbol = req.body.symbol || 'Default Symbol'
    let promiseResolve: any, promiseReject;
    let promise = new Promise(function (resolve, reject) {
        promiseResolve = resolve;
        promiseReject = reject;
    });

    // invoke the finnhub API to get the full name of a symbol
    finnhubClient.symbolSearch(symbol, (error: any, data: any, response: any) => {
        // the function below sorts through the incoming data and returns the object which matches the ticker symbol
        const results = data.result.find((element: SymbolResponseTypes, index: number) => {
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

    // The promises below are to facilitate testing   
  
    return promise
}

export default finnhubController