import { useEffect, useState } from "react";
import api from "../api/axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-xl font-semibold mb-4">🧾 Orders</h2>

      <div className="space-y-3">
        {orders.map(order => (
          <div
            key={order._id}
            className="flex justify-between items-center border rounded-lg p-3"
          >
            <div>
              <p className="font-medium">{order.orderNumber}</p>
              <p className="text-sm text-gray-500">
                Table {order.tableNumber || "-"}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded text-sm text-white ${
                order.status === "Pending"
                  ? "bg-yellow-500"
                  : order.status === "Delivered"
                  ? "bg-green-600"
                  : "bg-blue-500"
              }`}
            >
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
