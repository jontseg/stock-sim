import React from 'react';




const StockChart: React.FC = () => {

  return (
    <div>
      <h1>Stock List</h1>
    </div>
  );
};






// const data = [
//     { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
//     { name: 'Page B', uv: 300, pv: 1398, amt: 2210 },
//     { name: 'Page C', uv: 200, pv: 9800, amt: 2290 },
//     { name: 'Page D', uv: 278, pv: 3908, amt: 2000 },
//     { name: 'Page E', uv: 189, pv: 4800, amt: 2181 },
//     { name: 'Page F', uv: 239, pv: 3800, amt: 2500 },
//     { name: 'Page G', uv: 349, pv: 4300, amt: 2100 },
//     { name: 'Page H', uv: 400, pv: 2400, amt: 2400 },
//     { name: 'Page I', uv: 300, pv: 1398, amt: 2210 },
//     { name: 'Page J', uv: 450, pv: 3000, amt: 2700 },
//     { name: 'Page K', uv: 320, pv: 2300, amt: 2300 },
//     { name: 'Page L', uv: 270, pv: 3800, amt: 2600 }
//   ];


  
// const StockChart: React.FC = () => {


  
  
//   return (
//     <>
//       <LineChart width={600} height={300} data={data} margin={{ top: 4, right: 20, bottom: 5, left: 0}}>
//         <Line type="monotone" dataKey="uv" stroke="#8884d8"/>
//         <CartesianGrid stroke="#ccc" strokeDasharray= "5 5"/>
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip/>
//       </LineChart>
//       <ul>
//         {items.map((item) => (
//           <li key={item.id}>{item.name}: {item.description}</li>
//         ))}
//       </ul>
//     </>
//   );
// };

export default StockChart;
