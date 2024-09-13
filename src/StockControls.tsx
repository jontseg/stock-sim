import './index.css';


interface StockControlsProps {
  onAdvanceChange: (value: string) => void;
  advanceDateValue: string;
  onAdvanceClick: (value: string) => void;
  cash: number;
  currentPrice: number;
  onBuy: () => void;
  onSell: () => void;
  stocksOwned: number;
  onBuyChange: (value: number) => void;
  onSellChange: (value: number) => void;
}
  
const StockControls: React.FC<StockControlsProps> = ({ onAdvanceChange, advanceDateValue, onAdvanceClick, cash, currentPrice, onBuy, onSell, stocksOwned, onBuyChange, onSellChange }) => {
  

  return (
    <div className='chart-container'>
        <div>
            <button onClick={() => onAdvanceChange('Day')}>Day</button>
            <button onClick={() => onAdvanceChange('Week')}>Week</button>
            <button onClick={() => onAdvanceChange('Month')}>Month</button>
            <button onClick={() => onAdvanceChange('Year')}>Year</button>
            <button onClick={() => onAdvanceClick(advanceDateValue)}>Advance</button>
            <p>Advance date value: {advanceDateValue}</p>
        </div>
        <div>
          <div>
            <button
             onClick={onBuy}
            >
              Buy
            </button>
            <input
              type="number"
              min="1"
              onChange={(event) => onBuyChange(Number(event.target.value))}>
            </input>
          </div>
          <div>
            <button onClick={onSell}>Sell</button>
            <input
              type="number"
              min="1"
              onChange={(event) => onSellChange(Number(event.target.value))}>
            </input>
          </div>
        </div>
        <div>
          <p>Cash: {cash}</p>
          <div>
            <p>Current Price: {currentPrice}</p>
          </div>
          <p>Stocks Owned: {stocksOwned}</p>
          <p>Portfolio Value: {stocksOwned*currentPrice}</p>
          <p>Profit/Loss: {cash - (stocksOwned*currentPrice) - 10000}</p>
        </div>
    </div>
  );
};

export default StockControls;
