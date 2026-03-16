import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

const data = [
  { month: "Jan", sales: 400 },
  { month: "Feb", sales: 800 },
  { month: "Mar", sales: 600 },
  { month: "Apr", sales: 1200 }
];

export default function SalesChart() {

  return (
    <LineChart width={500} height={300} data={data}>

      <XAxis dataKey="month" />

      <YAxis />

      <Tooltip />

      <CartesianGrid stroke="#ccc" />

      <Line type="monotone" dataKey="sales" stroke="#8884d8" />

    </LineChart>
  );
}