import React from 'react';
import StockDataList from './StockDataList'; // Adjust the import path as necessary


interface StockListProps {
  onInputChange: (value: string) => void;
  onStockClick: (value: string, startDate: Date | null, endDate: Date | null) => void;
  searchTerm: string;
}
const StockList: React.FC<StockListProps> = ({ onInputChange, onStockClick, searchTerm }) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search stock symbols"
        onChange={handleChange}
      />
      <StockDataList searchTerm={searchTerm} handleClick={onStockClick}/>
    </div>
  );
};

export default StockList;
