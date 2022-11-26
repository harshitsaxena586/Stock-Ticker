import React from "react";

type Props = {
  name: string;
  symbol: string;
  price: number;
  changePercent: number;
  currentTime: number;
};

const StockDetails: React.FC<Props> = ({
  name,
  symbol,
  price,
  changePercent,
  currentTime,
}) => {
  return (
    <div className="details-container" data-testid="detailsContainer">
      <p className="name" data-testid="name">
        Name: {name}
      </p>
      <p className="symbol" data-testid="symbol">
        Symbol: {symbol}
      </p>
      <p className="price" data-testid="price">
        Price: {price}
      </p>
      <p className="change-percent" data-testid="changePercent">
        Change Percent: {changePercent} %
      </p>
      <p className="current-time" data-testid="currentTime">
        Current Time: {currentTime}
      </p>
    </div>
  );
};

export { StockDetails };
