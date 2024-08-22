// import { generateClient } from 'aws-amplify/api';
import React, { useEffect, useState } from 'react';
// import { Schema } from '../amplify/data/resource';
import client from './APIClient'; // Import the shared client

const LIST_STOCKS_QUERY = `
  query {
    listStocks {
      items {
        StockSymbol
        Date
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
      const nextToken = response.data.listStocks?.nextToken;

      return { stocks, nextToken };
    } else {
      console.error('Unexpected response structure:', response);
    }
  } catch (error) {
    console.error('Error listing stocks:', error);
    throw error;
  }
}

interface SymbolDateRange {
  symbol: string;
  minDate: Date;
  maxDate: Date;
}

interface StockDataListProps {
  handleClick: (value: string, startDate: Date | null, endDate: Date | null) => void;
  searchTerm: string;
}


const StockDataList: React.FC<StockDataListProps> = ({ handleClick, searchTerm }) => {
  const [stockList, setStockList] = useState<SymbolDateRange[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      try {
        const result = await showStocks();
        if (result && result.stocks) {
          // Group dates by stock symbol
          const datesBySymbol: { [key: string]: Date[] } = {};
          result.stocks.forEach((item: { StockSymbol: string; Date: string }) => {
            const symbol = item.StockSymbol.toUpperCase().split('.')[0];
            const date = new Date(item.Date); // Replace 'Date' with the actual field name containing dates

            if (!datesBySymbol[symbol]) {
              datesBySymbol[symbol] = [];
            }
            datesBySymbol[symbol].push(date);
          });

          // Calculate min and max dates for each symbol
          const symbolDateRanges: SymbolDateRange[] = Object.entries(datesBySymbol).map(
            ([symbol, dates]) => {
              const minDate = new Date(Math.min(...dates.map(date => date.getTime())));
              const maxDate = new Date(Math.max(...dates.map(date => date.getTime())));
              console.log(symbol, minDate, maxDate)
              return { symbol, minDate, maxDate };
            }
            
          );

          setStockList(symbolDateRanges);
        }
      } catch (error) {
        console.error('Error fetching stocks:', error);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const filteredStockList = stockList.filter(({ symbol }) =>
    symbol.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
 

  return (
    <div>
      <h1>Stock List</h1>
      <ul>
        {filteredStockList.map(({ symbol, minDate, maxDate }) => {
          let startDateInput: HTMLInputElement | null = null;
          let endDateInput: HTMLInputElement | null = null;

          return (
            <li
              key={symbol}
              onClick={() => handleClick(
                symbol.toLocaleLowerCase() + '.us',
                startDateInput ? new Date(startDateInput.value) : null,
                endDateInput ? new Date(endDateInput.value) : null,
              )}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{symbol}</h2>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div>
                <p>Start: {minDate.toLocaleDateString()}</p>
                <input
                  type="date"
                  defaultValue={minDate.toISOString().split('T')[0]}
                  ref={(input) => startDateInput = input}
                />
              </div>
              <div>
                <p>End: {maxDate.toLocaleDateString()}</p>
                <input
                  type="date"
                  defaultValue={maxDate.toISOString().split('T')[0]}
                  ref={(input)=> endDateInput = input}
                  />
              </div>
            </div>
          </li>
          );
        })}        
      </ul>
    </div>
  );
};

export default StockDataList;
