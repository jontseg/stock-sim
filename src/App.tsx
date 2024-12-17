import { useState } from 'react';
import StockAPI from './StockAPI';
import StockChart from './StockChart';
import StockControls from './StockControls';
import StockList from './StockList';

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

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [data, setData] = useState<StockData | null>(null);
  const [daysAgo, setDaysAgo] = useState<number>(0);
  const [from, setFrom] = useState<number>(0);
  const [cash, setCash] = useState<number>(10000);
  const [stocksOwned, setStocksOwned] = useState<number>(0);
  const oneDayInSeconds = 86400;

  const handleSearchChange = (value: string) => setSearchTerm(value);
  const handleDaysChange = (value: number) => setDaysAgo(value);
  const handleGo = () => {
    setStockSymbol(searchTerm);
    setFrom(convertToUnixTimestamp(daysAgo));
  };

  const updateData = (data: StockData) => setData(data);

  const handleNextDay = () => setFrom(from + oneDayInSeconds);

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

  return (
    <main style={mainStyle}>
      <header style={headerStyle}>
        <h1>Stock Simulator</h1>
      </header>
      <div style={containerStyle}>
        <aside style={sidebarStyle}>
          <h2 style={sidebarTitleStyle}>Stock Simulator</h2>
          <div style={portfolioStyle}>
            <h3>Portfolio</h3>
            <p><strong>Cash:</strong> ${cash.toFixed(2)}</p>
            <p><strong>Stocks Owned:</strong> {stocksOwned}</p>
          </div>
          <StockControls
            onNextDay={handleNextDay}
            onBuy={onBuy}
            onSell={onSell}
          />
        </aside>
        <div style={contentStyle}>
          <StockChart data={data} />
          <StockList
            onStockChange={handleSearchChange}
            onGo={handleGo}
            onDaysChange={handleDaysChange}
          />
          <StockAPI
            stockSymbol={stockSymbol}
            updateData={updateData}
            from={from}
          />
        </div>
      </div>
    </main>
  );
}

export default App;

import * as CSS from 'csstype';

const mainStyle: CSS.Properties = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f4f7fb',
};

const headerStyle: CSS.Properties = {
  padding: '1em',
  backgroundColor: '#0057d9',
  color: 'white',
  textAlign: 'center',
};

const containerStyle: CSS.Properties = {
  display: 'flex',
  padding: '20px',
  backgroundColor: ''
};

const sidebarStyle: CSS.Properties = {
  width: '300px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  marginRight: '20px',
};

const sidebarTitleStyle: CSS.Properties = {
  color: '#0057d9',
  textAlign: 'center',
};

const portfolioStyle: CSS.Properties = {
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f9f9f9',
  textAlign: 'center',
  marginBottom: '20px',
};

const contentStyle: CSS.Properties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
};
