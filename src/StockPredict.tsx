import React from 'react';


interface StockPredictProps {
    currentPrice: number;
}
const StockPredict: React.FC<StockPredictProps> = ({ currentPrice }) => {
let direction = Math.random()
  if (direction < 0.5) {
    direction = 1
  }
  else {
    direction = -1
  }
  
  const change = Math.random() * (0.5 - 0) + 0;

  return (
    <div>
        <p>Predicted Price: {currentPrice + (direction * change * currentPrice)}</p>
    </div>
  );
};

export default StockPredict;
