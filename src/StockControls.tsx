import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import './index.css';

interface StockControlsProps {
  onNextDay: () => void;
  onPrevDay: () => void; 
  onBuy: (value: number) => void;
  onSell: (value: number) => void
}
  
const StockControls: React.FC<StockControlsProps> = ({ onPrevDay, onNextDay, onBuy, onSell }) => {
  

  return (
    <div className='chart-container'>
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
  );
};

export default StockControls;
