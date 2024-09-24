import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';
import client from './APIClient'; // Import the shared client
import StockAPI from './StockAPI';
import StockChart from './StockChart';
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
  const [data, setData] = useState<StockData | null>(null);
  const [daysAgo, setDaysAgo] = useState<number>(0);
  const [from, setFrom] = useState<number>(0);
  const oneDayInSeconds = 86400;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  }

  const handleDaysChange = (value: number) => {
    setDaysAgo(value);
  }

  const handleGo = () => {
    setStockSymbol(searchTerm);
    setFrom(convertToUnixTimestamp(daysAgo));
  }
  
  const updateData = (data: StockData) => {
    setData(data)
  }

  const handleNextDay = () => {
    const tomorrow = from + oneDayInSeconds
    setFrom(tomorrow)
  }

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
            onNextDay={handleNextDay}
          >
          </StockControls>
        </div>
        <StockList 
          onStockChange={handleSearchChange}
          onGo={handleGo}
          onDaysChange={handleDaysChange}
        />

        

        <StockAPI
          stockSymbol={stockSymbol}
          updateData={updateData}
          from={from}
        >
        </StockAPI>
        {/* {data?.o} */}
        {/* {JSON.stringify(data)} */}
      </main>
        
      )}
      </Authenticator>
  );
}

export default App;
