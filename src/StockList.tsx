import React from 'react';
import StockDataList from './StockDataList'; // Adjust the import path as necessary


interface StockListProps {
  onStockChange: (value: string) => void;
  onDaysChange: (value: number) => void;
  onStockClick: (value: string, startDate: Date | null, endDate: Date | null) => void;
  searchTerm: string;
}
const StockList: React.FC<StockListProps> = ({ onStockChange, onDaysChange, onStockClick, searchTerm }) => {

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

      >
        Go
      </button>
      <StockDataList searchTerm={searchTerm} handleClick={onStockClick}/>
    </div>
  );
};

export default StockList;
