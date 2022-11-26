import { NextFunction,Request, Response } from "express";
import finnhubController from "../server/controllers/finnhubController";

describe('Backend Test Server', () =>{
    let res: Response = {} as Response;
    let req:Request = {} as Request;
    const next:NextFunction = jest.fn();

    beforeEach(() =>{
        res = {} as Response;
        req = {} as Request;
        res.locals = {
            price:undefined,
            name:undefined
        }
    })

    test('Function findPrice returning Price', async () =>{
        req.body = {
            symbol:'AAPL'
        }

        await finnhubController.findPrice(req, res,next)
        expect(next).toHaveBeenCalled()
        expect(res.locals).toBeDefined()
    })

    test('Function findSymbol returning a description', async () => {
        req.body = {
            symbol: 'AAPL'
        }

        await finnhubController.findSymbol(req, res, next)

        expect(next).toHaveBeenCalled();
        expect(res.locals.name).toBe('APPLE INC');
    })


    test('Function findPrice returning undefined if symbol is Invalid', async () => {
        req.body = {
            symbol: '1'
        }

        await finnhubController.findPrice(req, res, next)
        expect(next).toHaveBeenCalled()
        expect(res.locals.price).toBe(undefined)
    })

    test('Function findSymbol returning No Result if symbol is Invalid', async () => {
        req.body = {
            symbol: 'Invalid'
        }

        await finnhubController.findSymbol(req, res, next)

        expect(next).toHaveBeenCalled();
        expect(res.locals.name).toBe('No Results');
    })
})