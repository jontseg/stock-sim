import React, { useEffect, useRef, useState } from 'react';


type StockData = {
  c: number[];  // List of close prices
  h: number[];  // List of high prices
  l: number[];  // List of low prices
  o: number[];  // List of open prices
  s: 'ok' | 'no_data';  // Status of the response (either 'ok' or 'no_data')
  t: number[];  // List of timestamps
  v: number[];  // List of volume data
};
type Resolution = 1 | 5 | 15 | 30 | 60 | 'D' | 'W' | 'M';


interface StockAPIProps {
 stockSymbol: string;
 updateData: (data: StockData) => void;
 from: number;
 resolution: Resolution;
}

const StockAPI: React.FC<StockAPIProps> = ({ stockSymbol, updateData, from, resolution }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const cache = useRef<Record<string, StockData>>({}); // Cache for storing API responses
  const previousFrom = useRef<number | null>(null); // Ref to track the last 'from' time
  const previousStockSymbol = useRef<string | null>(null); // Ref to track the last 'from' time

  useEffect(() => {
    const fetchStockData = async () => {
      if (stockSymbol && (previousFrom.current !== from || stockSymbol !== previousStockSymbol.current)) {
        // Check cache first
        
        setLoading(true);
        const to = from + (86400*7);
        try {
          const response = await fetch(`https://1c9i0sjqcd.execute-api.us-west-1.amazonaws.com/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}`);


          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const result: StockData = await response.json();
          cache.current[stockSymbol] = result; // Cache the response
          updateData(result);
          previousFrom.current = from; // Update the 'from' reference
          previousStockSymbol.current = stockSymbol;
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };

    // Only fetch stock data if 'from' time has changed or no cached data is available
    fetchStockData();
  }, [stockSymbol, updateData, from]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return null;
};

export default StockAPI;
