import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';
import './index.css';

const colors = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
];

type StockData = {
  c: number[];  // List of close prices
  h: number[];  // List of high prices
  l: number[];  // List of low prices
  o: number[];  // List of open prices
  s: 'ok' | 'no_data';  // Status of the response (either 'ok' or 'no_data')
  t: number[];  // List of timestamps
  v: number[];  // List of volume data
};

interface CandlestickProps {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
  low: number;
  high: number;
  openClose: [number, number]; // tuple representing [open, close]
}

const Candlestick: React.FC<CandlestickProps> = (props) => {
  const {
    x,
    y,
    width,
    height,
    low,
    high,
    openClose: [open, close],
  } = props;
  
  const isGrowing = open < close;
  const color = isGrowing ? 'green' : 'red';
  const ratio = Math.abs(height / (open - close));

  console.log(props);

  return (
    <g stroke={color} fill="none" strokeWidth="2">
      <path
        d={`
          M ${x},${y}
          L ${x},${y + height}
          L ${x + width},${y + height}
          L ${x + width},${y}
          L ${x},${y}
        `}
      />
      {/* bottom line */}
      {isGrowing ? (
        <path
          d={`
            M ${x + width / 2}, ${y + height}
            v ${(open - low) * ratio}
          `}
        />
      ) : (
        <path
          d={`
            M ${x + width / 2}, ${y}
            v ${(close - low) * ratio}
          `}
        />
      )}
      {/* top line */}
      {isGrowing ? (
        <path
          d={`
            M ${x + width / 2}, ${y}
            v ${(close - high) * ratio}
          `}
        />
      ) : (
        <path
          d={`
            M ${x + width / 2}, ${y + height}
            v ${(open - high) * ratio}
          `}
        />
      )}
    </g>
  );
};

type PreparedData = {
  high: number;
  low: number;
  openClose: [number, number];
  ts: number;
};

const prepareData = (data: StockData | null): PreparedData[] => {
  if (data) {
    return data.t.map((timestamp, index) => {
      return {
        high: data.h[index],
        low: data.l[index],
        openClose: [data.o[index], data.c[index]], // open and close prices
        ts: timestamp,  // timestamp
      };
    });
  }
  return [];
};
  
interface StockChartProps {
  data: StockData | null;
}
const StockChart: React.FC<StockChartProps> = ({ data }) => {
  // Prepare data for the chart
  const preparedData = prepareData(data);

  // Find min and max values for Y-axis domain
  const minValue = preparedData.reduce(
    (minValue, { low, openClose: [open, close] }) => {
      const currentMin = Math.min(low, open, close);
      return minValue === null || currentMin < minValue ? currentMin : minValue;
    },
    null as number | null,
  );

  const maxValue = preparedData.reduce(
    (maxValue, { high, openClose: [open, close] }) => {
      const currentMax = Math.max(high, open, close);
      return maxValue === null || currentMax > maxValue ? currentMax : maxValue;
    },
    minValue as number,
  );

   // Format function for date
   const formatXAxis = (tickItem: number) => {
    const date = new Date(tickItem * 1000); // Convert Unix timestamp to milliseconds
    return date.toLocaleDateString(); // Format as readable date (e.g., 'MM/DD/YYYY')
  };
  // Debugging: log the data, minValue, and maxValue
  // console.log('Data:', preparedData);
  // console.log('Min value:', minValue);
  // console.log('Max value:', maxValue);

  return (
    <BarChart
      width={600}
      height={300}
      data={preparedData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="ts" tickFormatter={formatXAxis} />
      <YAxis domain={[minValue ?? 0, maxValue ?? 100]} />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar
        dataKey="openClose"
        fill="#8884d8"
        shape={<Candlestick />}
      >
        {preparedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default StockChart;

