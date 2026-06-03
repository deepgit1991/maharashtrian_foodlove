import { useState , useEffect } from "react";
import axios from "axios";
import API_URL from "./api";

export default function Orderlist() {
     const [orders, setOrders] = useState([]);
  const [mobile, setMobile] = useState("");
  const [token, setToken] = useState("");
const fetchOrders = async () => {
  try {
    const params = {};

    if (mobile.trim()) {
      params.mobile = mobile;
    }

    if (token.trim()) {
      params.token = token;
    }

    const res = await axios.get(`${API_URL}/orders`, {
      params,
    });

    setOrders(res.data);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order List</h2>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="text"
          placeholder="Search Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={fetchOrders}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Token</th>
            <th className="border p-2">Mobile</th>
            <th className="border p-2">Items</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border p-2">
                {order.customer?.customerId}
              </td>

              <td className="border p-2">
                {order.customer?.mobileNumber}
              </td>

              <td className="border p-2">
                {order.items?.map((item) => item.name).join(", ")}
              </td>

              <td className="border p-2">
                ₹{order.totalAmount}
              </td>

              <td className="border p-2">
                ₹{order.status}
              </td>

              <td className="border p-2">
                {new Date(order.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}

          {orders.length === 0 && (
            <tr>
              <td
                colSpan="6"
                className="text-center p-4 text-gray-500"
              >
                No Orders Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}