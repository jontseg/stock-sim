import React, { useEffect, useState } from 'react';

type StockData = {
    c: number;    // Current price
    d: number;    // Change
    dp: number;   // Percent change
    h: number;    // High price of the day
    l: number;    // Low price of the day
    o: number;    // Open price of the day
    pc: number;   // Previous close price
  };

const StockAPI: React.FC = () => {
  const [data, setData] = useState<StockData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          'http://localhost:3000/quote?symbol=AAPL'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: StockData = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }
  return (
    <div>
      <h1>Stock Data for AAPL</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default StockAPI;
