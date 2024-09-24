import './index.css';


interface StockControlsProps {
  onNextDay: () => void;
}
  
const StockControls: React.FC<StockControlsProps> = ({ onNextDay }) => {
  

  return (
    <div className='chart-container'>
        <button>Buy</button>
        <button>Sell</button>
        <button
          onClick={onNextDay}>
            Next Day
        </button>
    </div>
  );
};

export default StockControls;
