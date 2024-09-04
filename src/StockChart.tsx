import React from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import './index.css';


interface StockChartProps {
  data: { Date: string; Open: number }[];
}
  
const StockChart: React.FC<StockChartProps> = ({ data }) => {

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



