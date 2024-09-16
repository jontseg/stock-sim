import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';
import client from './APIClient'; // Import the shared client
import StockAPI from './StockAPI';
import StockControls from './StockControls';
import StockList from './StockList';


async function showStocks() {
  try {
    const response = await client.graphql({
      query: LIST_STOCKS_QUERY,
    });

    if ('data' in response && response.data) {
      const stocks = response.data.listStocks?.items;
      return stocks;
    } else {
      console.error('Unexpected response structure:', response);
    }
  } catch (error) {
    console.error('Error listing stocks:', error);
    throw error;
  }
}


function convertToUnixTimestamp(daysAgo) {
  // Get the current date
  const currentDate = new Date();

  // Calculate the date `daysAgo` by subtracting the number of days from the current date
  const pastDate = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - daysAgo);

  // Convert the past date to Unix timestamp (divide by 1000 to get seconds)
  const unixTimestamp = Math.floor(pastDate.getTime() / 1000);

  return unixTimestamp;
}

type StockData = {
  c: number[];  // List of close prices
  h: number[];  // List of high prices
  l: number[];  // List of low prices
  o: number[];  // List of open prices
  s: 'ok' | 'no_data';  // Status of the response (either 'ok' or 'no_data')
  t: number[];  // List of timestamps
  v: number[];  // List of volume data
};

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [advanceDateValue, setAdvanceDateValue] = useState<string>('Day');
  const [cash, setCash] = useState<number>(10000);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [stocksOwned, setStocksOwned] = useState<number>(0);
  const [numberStocksBuy, setNumberStocksBuy] = useState<number>(0);
  const [numberStocksSell, setNumberStocksSell] = useState<number>(0);
  const [data, setData] = useState<StockData | null>(null);
  const [daysAgo, setDaysAgo] = useState<number>(0);
  const [from, setFrom] = useState<number>(0);
  
  const handleBuyStock = (numStocks: number) => {
    if (cash >= currentPrice * numStocks){
      const newStocksOwned = stocksOwned + numStocks
      const newCash = cash - (currentPrice * numStocks);
      setStocksOwned(newStocksOwned);
      setCash(newCash);
    }
    
  }

  const handleSellStock = (numStocks: number) => {
    if (stocksOwned >= numStocks) {
      const newStocksOwned = stocksOwned - numStocks
      const newCash = cash + (currentPrice * numStocks);
      setCash(newCash);
      setStocksOwned(newStocksOwned)
    }
    
  }

  const handleBuyChange = (value: number) => {
    setNumberStocksBuy(value);
  }

  const handleSellChange = (value: number) => {
    setNumberStocksSell(value);
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  }

  const handleDaysChange = (value: number) => {
    setDaysAgo(value);
  }

  const handleAdvanceChange = (advanceInterval: string) => {
    setAdvanceDateValue(advanceInterval);
  }

  function addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const handleAdvanceClick = (value: string) => {
    if (dateRange[0] && dateRange[1]){
      const newStartDate = new Date(dateRange[0])
      let newEndDate = new Date(dateRange[1]);
      if (value === "Day"){
        newEndDate = addDays(newEndDate, 1);
      }
      if (value === "Week"){
        newEndDate = addDays(newEndDate, 7);
      }
      if (value === "Month"){
        newEndDate.setMonth(newEndDate.getMonth() + 1);
      }
      if (value === "Year"){
        newEndDate.setFullYear(newEndDate.getFullYear() + 1);
      }

      setDateRange([newStartDate, newEndDate])
    }
  }


  const handleGo = () => {
    setStockSymbol(searchTerm);
    setFrom(convertToUnixTimestamp(daysAgo));
  }
  
  const updateData = (data: StockData) => {
    setData(data)
  }

  return (
    <Authenticator>
      {({ signOut }) => (
      <main>
        <button onClick={signOut}>Sign out</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* <StockChart
            data={data}
          /> */}
          <StockControls
           onAdvanceClick={handleAdvanceClick} 
           onAdvanceChange={handleAdvanceChange} 
           advanceDateValue={advanceDateValue} 
           onBuy={() => handleBuyStock(numberStocksBuy)} 
           onSell={() => handleSellStock(numberStocksSell)} 
           stocksOwned={stocksOwned}
           cash={cash} 
           currentPrice={currentPrice}
           onBuyChange={handleBuyChange}
           onSellChange={handleSellChange}
           />
        </div>
        <StockList 
          onStockChange={handleSearchChange}
          onGo={handleGo}
          onDaysChange={handleDaysChange}
        />

        <StockAPI
          stockSymbol={stockSymbol}
          updateData={updateData}
          >
        </StockAPI>        
      </main>
        
      )}
      </Authenticator>
  );
}

export default App;
