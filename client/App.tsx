import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Loader } from "./components/Loader";

import { StockDetails } from "./components/StockDetails";
import { store } from "./store";

const App = () => {
  const [stockData, setStockData] = useRecoilState(store);
  const [loading, setLoading] = useState<boolean>(false);

  const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = ("" + event.target.value).toUpperCase();
  };

  const submitHandler = (event: React.FormEvent) => {
    const target = event.target as typeof event.target & {
      stockTicker: { value: string };
    };

    const onSubmit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symbol: target.stockTicker.value }),
    };

    fetch("/api/v1", onSubmit)
      .then((data) => {
        setLoading(false);
        return data.json();
      })
      .then((data) => {
        setStockData({
          currentTime: new Date().toLocaleTimeString(),
          price: data.price,
          changePercent: Math.round(data.percent * 100) / 100,
          name: data.name,
          symbol: target.stockTicker.value,
          success: true,
        });
      })
      .catch((error) => {
        setStockData({
          currentTime: "No Data",
          price: NaN,
          changePercent: 0,
          name: "No Data",
          symbol: target.stockTicker.value,
          success: false,
        });
        throw new Error(error);
      });
  };

  return (
    <div>
      <h1 className="header">Latest Stock Quote</h1>
      {loading && <Loader />}
      {!stockData.success && (
        <p className="error--no-data-received">No Data Received</p>
      )}
      <div className="wrapper">
        <form
          className="ticker-form"
          onSubmit={(event) => {
            event.preventDefault();
            submitHandler(event);
            setLoading(true);
            setStockData({ ...stockData, success: true });
          }}
        >
          <input
            className="stock-ticker-symbol"
            type="text"
            name="stockTicker"
            placeholder={"Enter Symbol: AAPL"}
            onInput={onInputHandler}
          ></input>
          <button
            className="submit-button"
            type="submit"
            id="form-button"
            value={"Submit"}
          >
            SUBMIT
          </button>
        </form>

        <StockDetails
          name={stockData.name}
          symbol={stockData.symbol}
          price={stockData.price}
          changePercent={stockData.changePercent}
          currentTime={stockData.currentTime}
        />
      </div>
    </div>
  );
};

export default App;
