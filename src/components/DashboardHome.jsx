import { useState ,useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    customers: 0,
    dishes: 0,
    orders: 0,
  });
 useEffect(() => {
  const fetchStats = async () => {
   // console.log("gggggg");

    const res = await axios.get("http://localhost:5000/stats");

    setStats(res.data.data);

   console.log(res.data.data, "fff");
  };

  fetchStats();
}, []);

  // const stats = {
  //   customers: 120,
  //   dishes: 45,
  //   orders: 320,
  // };

  // 📅 Get current month (0 = Jan, 11 = Dec)
  const currentMonth = new Date().getMonth();
  
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const data = months.slice(0, currentMonth + 1).map((month) => ({
    name: month,
    orders: Math.floor(Math.random() * 100) + 20, // dummy dynamic data
  }));

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Total Customers</h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.customers}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Total Dishes</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats.dishes}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Total Orders</h3>
          <p className="text-3xl font-bold text-purple-600">
            {stats.orders}
          </p>
        </div>
      </div>

      {/* 📊 Monthly Chart */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">
          📊 Orders (This Year Till Now)
        </h3>

        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}