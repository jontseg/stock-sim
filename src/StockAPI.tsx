import React, { useEffect, useState } from 'react';


type StockData = {
  c: number[];  // List of close prices
  h: number[];  // List of high prices
  l: number[];  // List of low prices
  o: number[];  // List of open prices
  s: 'ok' | 'no_data';  // Status of the response (either 'ok' or 'no_data')
  t: number[];  // List of timestamps
  v: number[];  // List of volume data
};

interface StockAPIProps {
 stockSymbol: string;
 updateData: (data: StockData) => void;
}

const StockAPI: React.FC<StockAPIProps> = ({ stockSymbol, updateData  }) => {
  const [data, setData] = useState<StockData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (stockSymbol){
      const fetchStockData = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:3000/candle?symbol=${stockSymbol}&resolution=D&from=1590988249&to=1591852249`
          );
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const result: StockData = await response.json();
          updateData(result)
          // setData(result);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchStockData();
    }
    
  }, [stockSymbol, updateData]);


  
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }
  // return (
  //   <div>
  //     <h1>Stock Data for AAPL</h1>
      
  //   </div>
  // );
};

export default StockAPI;
