import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { StockDetails } from "../client/components/StockDetails";
import { Loader } from "../client/components/Loader";

const testData = {
  name: "Apple",
  symbol: "AAPL",
  price: 30,
  changePercent: 5,
  currentTime: "06:04:06",
};

describe("Basic renders", () => {
  it("should mount the Stock Details Container to the DOM", () => {
    render(
      <StockDetails
        name={testData.name}
        symbol={testData.symbol}
        price={testData.price}
        changePercent={testData.changePercent}
        currentTime={testData.currentTime}
      />
    );

    expect(screen.getByTestId("detailsContainer")).toBeInTheDocument();
  });

  it("should mount the Name to the DOM", () => {
    render(
      <StockDetails
        name={testData.name}
        symbol={testData.symbol}
        price={testData.price}
        changePercent={testData.changePercent}
        currentTime={testData.currentTime}
      />
    );

    expect(screen.getByTestId("name")).toBeInTheDocument();
  });

  it("should mount the Symbol to the DOM", () => {
    render(
      <StockDetails
        name={testData.name}
        symbol={testData.symbol}
        price={testData.price}
        changePercent={testData.changePercent}
        currentTime={testData.currentTime}
      />
    );

    expect(screen.getByTestId("symbol")).toBeInTheDocument();
  });

  it("should mount the Price to the DOM", () => {
    render(
      <StockDetails
        name={testData.name}
        symbol={testData.symbol}
        price={testData.price}
        changePercent={testData.changePercent}
        currentTime={testData.currentTime}
      />
    );

    expect(screen.getByTestId("price")).toBeInTheDocument();
  });

  it("should mount the Change Percent to the DOM", () => {
    render(
      <StockDetails
        name={testData.name}
        symbol={testData.symbol}
        price={testData.price}
        changePercent={testData.changePercent}
        currentTime={testData.currentTime}
      />
    );

    expect(screen.getByTestId("changePercent")).toBeInTheDocument();
  });

  it("should mount the Current Time to the DOM", () => {
    render(
      <StockDetails
        name={testData.name}
        symbol={testData.symbol}
        price={testData.price}
        changePercent={testData.changePercent}
        currentTime={testData.currentTime}
      />
    );

    expect(screen.getByTestId("currentTime")).toBeInTheDocument();
  });

  it("should mount the Loader Container to the DOM", () => {
    render(<Loader />);

    expect(screen.getByTestId("loaderContainer")).toBeInTheDocument();
  });

  it("should mount the Loader  to the DOM", () => {
    render(<Loader />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
