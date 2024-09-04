import React from 'react';


interface StockPredictProps {
    currentPrice: number;
}
const StockPredict: React.FC<StockPredictProps> = ({ currentPrice }) => {
  const direction = Math.random()
  let sign = 0
  if (direction < 0.5) {
    sign = 1
  }
  else {
    sign = -1
  }
  
  const change = Math.random() * (0.5 - 0) + 0;

  return (
    <div>
        <p>Predicted Price: {currentPrice + (sign * change * currentPrice)}</p>
    </div>
  );
};

export default StockPredict;
