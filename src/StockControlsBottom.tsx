import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import './index.css';

interface StockControlsBottomProps {
  onNextDay: () => void;
  onPrevDay: () => void; 
  onBuy: (value: number) => void;
  onSell: (value: number) => void;
  cash: number;
  stocksOwned: number;
}
  
const StockControlsBottom: React.FC<StockControlsBottomProps> = ({ onPrevDay, onNextDay, onBuy, onSell, cash, stocksOwned }) => {
  

  return (
    <div className='chart-container'>
      <div className="controls-row">
        <p className='text-white'><strong>Cash:</strong> ${cash.toFixed(2)}</p>
        <p className='text-white'><strong>Stocks Owned:</strong> {stocksOwned}</p>
        <button
          onClick={()=> onBuy(1)}>
          Buy
        </button>
        <button 
        onClick= {()=> onSell(1)}
        >
        Sell
        </button>
        <button
          onClick={onPrevDay}>
            <SlArrowLeft />
        </button>
        <button
          onClick={onNextDay}>
            <SlArrowRight />
        </button>
      </div>
    </div>
  );
};

export default StockControlsBottom;
