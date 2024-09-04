import React, { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import './index.css';


import client from './APIClient'; // Import the shared client

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

interface StockChartProps {
  stockSymbol: string;
  dateRange: [Date | null, Date | null];
  onCurrentPriceChange: (currentPrice: number) => void;
  // data: { Date: string; Open: number }[];
}
  
const StockChart: React.FC<StockChartProps> = ({ stockSymbol, dateRange, onCurrentPriceChange  }) => {
  const [data, setData] = useState<{ Date: string; Open: number }[]>([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const stocks = await showStocks();
      if (stocks) {
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
        onCurrentPriceChange(filteredStocks[filteredStocks.length-1]["Open"])
      }
    };

    fetchStockData();
  }, [stockSymbol, dateRange, onCurrentPriceChange]);


  return (
    <div className='chart-container'>
      <LineChart width={600} height={300} data={data} margin={{ top: 4, right: 20, bottom: 5, left: 0 }}>
        <Line 
          type="monotone" 
          dataKey="Open" 
          stroke="#8884d8"
          dot={false}
          activeDot={{ r: 8}}
        />
        <CartesianGrid 
          stroke="#ccc"
          strokeDasharray="5 5" 
        />
        <XAxis 
          dataKey="Date" 
        />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default StockChart;



