import './index.css';


interface StockControlsProps {
  onNextDay: () => void; 
  onBuy: (value: number) => void;
  onSell: (value: number) => void
}
  
const StockControls: React.FC<StockControlsProps> = ({ onNextDay, onBuy, onSell }) => {
  

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
          onClick={onNextDay}>
            Next Day
        </button>
    </div>
  );
};

export default StockControls;
