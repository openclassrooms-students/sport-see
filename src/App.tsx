import "./App.css";
import { LineChart, Line } from 'recharts';

const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 500, pv: 2400, amt: 2400 },
  { name: 'Page C', uv: 600, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 700, pv: 2400, amt: 2400 },
  { name: 'Page E', uv: 800, pv: 2400, amt: 2400 },
  { name: 'Page F', uv: 900, pv: 2400, amt: 2400 },
];

function App() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-3xl font-bold text-blue-600">
        Install & Setup Vite + React + Typescript + Tailwind CSS 3
      </h1>

      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default App;
