import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify'; // Import Amplify
import { generateClient } from 'aws-amplify/api';
import { useEffect, useState } from 'react';
import { Schema } from '../amplify/data/resource';
import StockChart from './StockChart';
import StockList from './StockList';
// import config from './aws-exports';
// import { Amplify } from 'aws-amplify';

Amplify.configure({
  API: {
    GraphQL: {
      endpoint: 'https://7kkdnsp3pfhcbm76da5kf2h2na.appsync-api.us-west-1.amazonaws.com/graphql',
      region: 'us-west-1',
      defaultAuthMode: 'apiKey',
      apiKey: 'da2-czzafpu5xredplaww57cveyhde'
    }
  }
});

const client = generateClient<Schema>();

const LIST_STOCKS_QUERY = `
  query ListStocks($filter: TableStockFilterInput, $limit: Int, $nextToken: String) {
    listStocks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        Close
        Date
        High
        Low
        Open
        OpenInt
        StockSymbol
        Volume
      }
      nextToken
    }
  }
`;

async function showStocks() {
  try {
    const response = await client.graphql({
      query: LIST_STOCKS_QUERY,
      variables: {
        filter: {
          StockSymbol: { eq: 'AAPL' },
        },
        limit: 10,
        nextToken: null,
      },
    });

    if ('data' in response && response.data) {
      const stocks = response.data.listStocks?.items;
      const nextToken = response.data.listStocks?.nextToken;

      console.log('Stocks:', stocks);
      console.log('Next Token:', nextToken);

      return { stocks, nextToken };
    } else {
      console.error('Unexpected response structure:', response);
    }
  } catch (error) {
    console.error('Error listing stocks:', error);
    throw error;
  }
}







function App() {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  }
  
  useEffect(() => {
    const fetchStocks = async () => {
      const result = await showStocks();
      if (result) {
        setStocks(result.stocks);
      }
    };

    fetchStocks();
  }, []);
  
 
  return (
        
    <Authenticator>
      {({ signOut }) => (
      <main>
        <button onClick={signOut}>Sign out</button>
        <StockChart/>
        <StockList onInputChange={handleSearchChange} searchTerm={searchTerm}/>
        <ul>{stocks && stocks.map(stock => <li key={stock.stockSymbol}>{stock.stockSymbol}</li>)}</ul>
        {/* <ul>{stocks.map(stock => <li key={stock.stockSymbol}>{stock.stockSymbol}</li>)}</ul> */}
      </main>
        
      )}
      </Authenticator>
  );
}

export default App;
