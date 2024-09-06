import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import client from './APIClient'; // Import the shared client
import StockChart from './StockChart';
import StockControls from './StockControls';
import StockList from './StockList';

const LIST_STOCKS_QUERY = `
  query {
    listStocks {
      items {
        StockSymbol
        Date
        Open
      }
    }
  }
`;

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


function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [advanceDateValue, setAdvanceDateValue] = useState<string>('Day');
  const [cash, setCash] = useState<number>(10000);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [predictedPrice, setPredictedPrice] = useState<number>(0);
  const [stocksOwned, setStocksOwned] = useState<number>(0);
  const [numberStocksBuy, setNumberStocksBuy] = useState<number>(0);
  const [numberStocksSell, setNumberStocksSell] = useState<number>(0);
  const [data, setData] = useState<{ Date: string; Open: number }[]>([]);
  

  useEffect(() => {
    const fetchStockData = async () => {
      const stocks = await showStocks();
      if (stocks && stockSymbol) {
        const [startDate, endDate] = dateRange;
        // Filter for the specific stock symbol "PLYM"
        const filteredStocks = stocks
          .filter((stock: { StockSymbol: string; Date: string }) => {
            const stockDate = new Date(stock.Date);
            return (stock.StockSymbol === stockSymbol &&
              (!startDate || stockDate >= startDate) &&
              (!endDate || stockDate <= endDate)
            );
          })
          .map((stock: { Date: string; Open: number }) => ({
            Date: new Date(stock.Date).toLocaleDateString(), // Format date for display
            Open: stock.Open,
          }));
        setData(filteredStocks);
        // console.log(data)
        sendData()
        setCurrentPrice(filteredStocks[filteredStocks.length-1]["Open"])
        
      }
    };

    fetchStockData();
  }, [stockSymbol, dateRange]);

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

  const handleAdvanceChange = (advanceInterval: string) => {
    setAdvanceDateValue(advanceInterval);
  }

  const handleStockClick = (value: string, startDate: Date | null, endDate: Date | null) => {
    setStockSymbol(value)
    setDateRange([startDate, endDate])
    
  }

  // const updateCurrentPrice = (currentPrice: number) => {
  //   setCurrentPrice(currentPrice);
  // }

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
  

  const sendData = async () => {
    const data = { input: [currentPrice] };
    try {
      const response = await axios.post('http://localhost:5000/predict', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      setPredictedPrice(response.data["prediction"][0])
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  console.log("PREDICTED: ", predictedPrice)

  return (
    
    <Authenticator>
      {({ signOut }) => (
      <main>
        <button onClick={signOut}>Sign out</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <StockChart
            data={data}
          />
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
           predictedPrice={predictedPrice}
           />
        </div>
        <StockList 
          onInputChange={handleSearchChange} 
          searchTerm={searchTerm} 
          onStockClick={handleStockClick}
        />
        
      </main>
        
      )}
      </Authenticator>
  );
}

export default App;
