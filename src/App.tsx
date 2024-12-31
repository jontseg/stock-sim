import * as CSS from 'csstype';
import React, { useState } from 'react';
import "./index.css";
import StockAPI from './StockAPI';
import StockChart from './StockChart';
import StockControlsBottom from './StockControlsBottom';
import StockControlsTop from './StockControlsTop';


function convertToUnixTimestamp(daysAgo: number): number {
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - daysAgo);
  return Math.floor(pastDate.getTime() / 1000);
}

type StockData = {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  s: 'ok' | 'no_data';
  t: number[];
  v: number[];
};


// Define allowed resolution values
type Resolution = 1 | 5 | 15 | 30 | 60 | 'D' | 'W' | 'M';
function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [data, setData] = useState<StockData | null>(null);
  const [daysAgo, setDaysAgo] = useState<number>(0);
  const [from, setFrom] = useState<number>(0);
  const [cash, setCash] = useState<number>(10000);
  const [stocksOwned, setStocksOwned] = useState<number>(0);
  const [resolution, setResolution] = useState<Resolution>(60)
  const oneDayInSeconds = 86400;

  const handleSearchChange = (value: string) => setSearchTerm(value);
  const handleDaysChange = (value: number) => setDaysAgo(value);
  const handleGo = () => {
    setStockSymbol(searchTerm);
    setFrom(convertToUnixTimestamp(daysAgo));
  };

  const updateData = (data: StockData) => setData(data);

  const resolutionInSeconds: Record<Resolution, number> = {
    1: 60,         // 1 minute
    5: 300,        // 5 minutes
    15: 900,       // 15 minutes
    30: 1800,      // 30 minutes
    60: 3600,      // 1 hour
    D: 86400,      // 1 day
    W: 604800,     // 1 week
    M: 2592000,    // Approx 1 month (30 days)
  };

  // const to = from + resolutionInSeconds[resolution]; 

  const handleNextDay = () => setFrom(from + resolutionInSeconds["D"]);
  const handlePrevDay = () => setFrom(from - resolutionInSeconds["D"]);

  const onBuy = (numberOfStocks: number) => {
    if (data) {
      const costOfStock = data.c[data.c.length - 1];
      if (cash >= costOfStock * numberOfStocks) {
        setCash(cash - costOfStock * numberOfStocks);
        setStocksOwned(stocksOwned + numberOfStocks);
      }
    }
  };

  const onSell = (numberOfStocks: number) => {
    if (data && stocksOwned >= numberOfStocks) {
      const costOfStock = data.c[data.c.length - 1];
      setCash(cash + costOfStock * numberOfStocks);
      setStocksOwned(stocksOwned - numberOfStocks);
    }
  };

  const handleResolutionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setResolution(event.target.value as Resolution)
  }

  return (
    <main style={mainStyle}>
      <div  style={containerStyle}>
        <div style={contentStyle}>
          <StockAPI
            stockSymbol={stockSymbol}
            updateData={updateData}
            from={from}
            resolution={resolution}
          />
          <StockControlsTop
            onStockChange={handleSearchChange}
            onGo={handleGo}
            onDaysChange={handleDaysChange}
            onResolutionChange={handleResolutionChange}
            resolution={resolution}
          />
          <StockChart data={data} />
          <StockControlsBottom
            onNextDay={handleNextDay}
            onPrevDay={handlePrevDay}
            onBuy={onBuy}
            onSell={onSell}
            cash={cash}
            stocksOwned={stocksOwned}
          />
        </div>
      </div>
    </main>
  );
}

export default App;

const mainStyle: CSS.Properties = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f4f7fb',
};

// const headerStyle: CSS.Properties = {
//   padding: '1em',
//   backgroundColor: '#0057d9',
//   color: 'white',
//   textAlign: 'center',
// };

const containerStyle: CSS.Properties = {
  display: 'flex',
  padding: '20px',
  backgroundColor: 'grey'
};

const contentStyle: CSS.Properties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
};



