import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface DataItem {
  StockSymbol: string;
  Date: string; // Adjust this field name according to your actual data
}

interface SymbolDateRange {
  symbol: string;
  minDate: Date;
  maxDate: Date;
}

interface StockDataListProps {
  searchTerm: string;
}

const StockDataList: React.FC<StockDataListProps> = ({ searchTerm }) => {
  const [stockList, setStockList] = useState<SymbolDateRange[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = 'https://7pc5bok4ajfnguozu7bhb3utj40lqaae.lambda-url.us-west-1.on.aws/';

    axios.get<DataItem[]>(url)
      .then(response => {
        console.log('API Response:', response.data); // Log response to inspect structure
        if (!Array.isArray(response.data)) {
          throw new Error('Unexpected response format: Data is not an array');
        }

        // Group dates by stock symbol
        const datesBySymbol: { [key: string]: Date[] } = {};
        response.data.forEach(item => {
          const symbol = item.StockSymbol.toUpperCase().split('.')[0];
          const date = new Date(item.Date); // Replace 'Date' with the actual field name containing dates

          if (!datesBySymbol[symbol]) {
            datesBySymbol[symbol] = [];
          }
          datesBySymbol[symbol].push(date);
        });

        // Calculate min and max dates for each symbol
        const symbolDateRanges: SymbolDateRange[] = Object.entries(datesBySymbol).map(([symbol, dates]) => {
          const minDate = new Date(Math.min(...dates));
          const maxDate = new Date(Math.max(...dates));
          return { symbol, minDate, maxDate };
        });

        setStockList(symbolDateRanges);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.');
        setLoading(false);
      });
  }, []);

  const filteredStockList = stockList.filter(({ symbol }) =>
    symbol.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  )

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Stock List</h1>
      <ul>
        {filteredStockList.map(({ symbol, minDate, maxDate }) => (
          <li key={symbol} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{symbol}</h2>
            <p>
              Start: {minDate.toLocaleDateString()} - End: {maxDate.toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockDataList;
