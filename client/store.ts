import { atom } from "recoil";

export interface StockData {
    name: string;
    symbol:string;
    price:number;
    changePercent:number;
    currentTime:number;
    success: boolean;
}

export const store = atom({
    key:"stockData",
    default: {success:true} as StockData,
})