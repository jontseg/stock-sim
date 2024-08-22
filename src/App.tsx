import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';
import StockChart from './StockChart';
import StockControls from './StockControls';
import StockList from './StockList';



function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [advanceDateValue, setAdvanceDateValue] = useState<string>('Day');
  const [cash, setCash] = useState<number>(10000);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [stocksOwned, setStocksOwned] = useState<number>(0);



  const handleBuyStock = () => {
    if (cash >= currentPrice){
      const newStocksOwned = stocksOwned + 1
      const newCash = cash - currentPrice;
      setStocksOwned(newStocksOwned);
      setCash(newCash);
    }
    
  }

  const handleSellStock = () => {
    if (stocksOwned > 0) {
      const newStocksOwned = stocksOwned - 1
      const newCash = cash + currentPrice;
      setCash(newCash);
      setStocksOwned(newStocksOwned)
    }
    
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  }

  const handleAdvanceChange = (advanceInterval: string) => {
    setAdvanceDateValue(advanceInterval);
  }

  const handleStockClick = (value: string, startDate: Date | null, endDate: Date | null) => {
    setStockSymbol(value)
    setDateRange([startDate, endDate])
  }

  const updateCurrentPrice = (currentPrice: number) => {
    setCurrentPrice(currentPrice);
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
 
  return (
        
    <Authenticator>
      {({ signOut }) => (
      <main>
        <button onClick={signOut}>Sign out</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <StockChart stockSymbol={stockSymbol} dateRange={dateRange} onCurrentPriceChange={updateCurrentPrice}/>
          <StockControls
           onAdvanceClick={handleAdvanceClick} 
           onAdvanceChange={handleAdvanceChange} 
           advanceDateValue={advanceDateValue} 
           onBuy={handleBuyStock} 
           onSell={handleSellStock} 
           stocksOwned={stocksOwned}
           cash={cash} 
           currentPrice={currentPrice} />
        </div>
        <StockList onInputChange={handleSearchChange} searchTerm={searchTerm} onStockClick={handleStockClick}/>
      </main>
        
      )}
      </Authenticator>
  );
}

export default App;
