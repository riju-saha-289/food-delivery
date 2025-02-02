import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Orders({ url }) {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the backend
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error(error);
    }
  };

  // Handle status update
  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: e.target.value,
      });

      if (response.data.success) {
        fetchAllOrders();
        toast.success("Order status updated.");
      } else {
        toast.error("Failed to update order status.");
      }
    } catch (error) {
      toast.error("Error updating status");
      console.error(error);
    }
  };

  // Fetch orders on mount
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="container py-4">
      <h3 className="text-center text-primary mb-4">Orders</h3>

      {orders.length > 0 ? (
        <>
          {/* Desktop Table View (Screens > 992px) */}
          <div className="d-none d-lg-block table-responsive">
            <table className="table table-bordered table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Track</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order._id}</td>
                    <td>
                      {order.items.map((item, idx) => (
                        <div key={idx}>
                          {item.name} x {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td>
                      {order.address.name} <br />
                      {order.address.street}, {order.address.city}
                    </td>
                    <td>{order.address.phone}</td>
                    <td>₹{order.amount}</td>
                    <td>
                      <select
                        className="form-select"
                        onChange={(e) => statusHandler(e, order._id)}
                        value={order.status}
                      >
                        <option value="Food processing">Food processing</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td>
                      <button className="btn btn-primary btn-sm">Track</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tablet View (Screens 700px - 992px) */}
          <div className="d-none d-md-block d-lg-none">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="border p-3 mb-3 rounded"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-between">
                  <strong className="text-primary">Order #{index + 1}</strong>
                  <strong className="text-success">₹{order.amount}</strong>
                </div>
                <div className="row mt-2">
                  <div className="col-6">
                    <p className="mb-1"><strong>Items:</strong></p>
                    {order.items.map((item, idx) => (
                      <p key={idx} className="mb-1">
                        {item.name} x {item.quantity}
                      </p>
                    ))}
                  </div>
                  <div className="col-6">
                    <p className="mb-1"><strong>Address:</strong></p>
                    <p className="mb-1">{order.address.name}</p>
                    <p className="mb-1">{order.address.street}, {order.address.city}</p>
                    <p className="mb-1"><strong>Phone:</strong> {order.address.phone}</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <select
                    className="form-select w-50"
                    onChange={(e) => statusHandler(e, order._id)}
                    value={order.status}
                  >
                    <option value="Food processing">Processing</option>
                    <option value="Out for delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <button className="btn btn-primary btn-sm">Track</button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View (Screens < 700px) */}
          <div className="d-md-none">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="border p-3 mb-3 rounded"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-between">
                  <span className="text-primary"><strong>Order #{index + 1}</strong></span>
                  <span className="text-success"><strong>₹{order.amount}</strong></span>
                </div>

                <div className="mt-2">
                  <p className="mb-1"><strong>Items:</strong></p>
                  {order.items.map((item, idx) => (
                    <p key={idx} className="mb-1">
                      {item.name} x {item.quantity}
                    </p>
                  ))}
                </div>

                <p className="mb-1"><strong>Address:</strong> {order.address.street}, {order.address.city}</p>
                <p className="mb-1"><strong>Phone:</strong> {order.address.phone}</p>

                <div className="mt-2">
                  <select
                    className="form-select"
                    onChange={(e) => statusHandler(e, order._id)}
                    value={order.status}
                  >
                    <option value="Food processing">Processing</option>
                    <option value="Out for delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                <div className="text-end mt-2">
                  <button className="btn btn-primary btn-sm">Track</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center mt-5">
          <h4 className="text-muted">No orders found</h4>
        </div>
      )}
    </div>
  );
}
