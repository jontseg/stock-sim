import React from 'react';

type Resolution = 1 | 5 | 15 | 30 | 60 | 'D' | 'W' | 'M';

interface StockControlsTopProps {
  onStockChange: (value: string) => void;
  onGo: () => void;
  onDaysChange: (value: number) => void;
  onResolutionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  resolution: Resolution;
  // searchTerm: string;
}
const StockControlsTop: React.FC<StockControlsTopProps> = ({ onStockChange, onDaysChange, onGo, onResolutionChange, resolution }) => {

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
      <select
              id="resolution-select"
              value={resolution}
              onChange={onResolutionChange}
              style={dropdownStyle}
          >
              <option value="1">1m</option>
              <option value="5">5m</option>
              <option value="15">15m</option>
              <option value="30">30m</option>
              <option value="60">60m</option>
              <option value="D">1D</option>
              <option value="W">1W</option>
              <option value="M">1M</option>
          </select>
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

export default StockControlsTop;


import * as CSS from 'csstype';


const dropdownStyle: CSS.Properties = {
  marginTop: '10px',
  padding: '5px',
  borderRadius: '4px',
};