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
}
  
const StockControls: React.FC<StockControlsProps> = ({ onAdvanceChange, advanceDateValue, onAdvanceClick, cash, currentPrice, onBuy, onSell, stocksOwned }) => {


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
          <button onClick={onBuy}>Buy</button>
          <button onClick={onSell}>Sell</button>
        </div>
        <div>
          <p>Cash: {cash}</p>
          <p>Current Price: {currentPrice}</p>
          <p>Stocks Owned: {stocksOwned}</p>
          <p>Portfolio Value: {stocksOwned*currentPrice}</p>
        </div>
    </div>
  );
};

export default StockControls;
