import React, { useState } from 'react';
import StockDataList from './StockDataList'; // Adjust the import path as necessary

const StockList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search stock symbols"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <StockDataList searchTerm={searchTerm} />
    </div>
  );
};

export default StockList;
