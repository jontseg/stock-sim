import React from 'react';


interface StockListProps {
  onStockChange: (value: string) => void;
  onGo: () => void;
  onDaysChange: (value: number) => void;
  // searchTerm: string;
}
const StockList: React.FC<StockListProps> = ({ onStockChange, onDaysChange, onGo }) => {

  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onStockChange(event.target.value);
  }
  
  const handleDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const days = parseInt(event.target.value, 10); // parse the input value as a number
    if (!isNaN(days)) {
      onDaysChange(days); // pass the number to onDaysChange
    }

  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search stock symbols"
        onChange={handleStockChange}
      />
      <input
        type="number"
        placeholder="Days Past"
        onChange={handleDaysChange}
      />
      <button
        onClick={onGo}>
        Go
      </button>
    </div>
  );
};

export default StockList;
