import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

export default function Orders({ url }) {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from the API
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error(error);
    }
  };

  // Handle the status update for an order
  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: e.target.value
      });

      if (response.data.success) {
        // Refresh orders after status update
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

  // UseEffect to fetch orders on component mount
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="container py-5">
      <h3 className="text-center text-primary mb-4">Order Page</h3>

      {orders.length > 0 ? (
        <div className="row">
          {orders.map((order, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={assets.parcel_icon}
                      alt="Parcel Icon"
                      className="img-fluid me-3"
                      style={{ width: '40px', height: '40px' }}
                    />
                    <h5 className="card-title">Order #{order._id}</h5>
                  </div>

                  <p><strong>Items:</strong></p>
                  <p>
                    {order.items.map((item, index) => {
                      return index === order.items.length - 1
                        ? `${item.name} x ${item.quantity}`
                        : `${item.name} x ${item.quantity}, `;
                    })}
                  </p>

                  <div className="mb-3">
                    <strong>Address:</strong>
                    <p>{order.address.name}</p>
                    <p>{order.address.street}, {order.address.city}</p>
                    <p>{order.address.phone}</p>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <p><strong>Items Count:</strong> {order.items.length}</p>
                    <p><strong>Total Amount:</strong> ${order.amount}</p>
                  </div>

                  <div className="mb-3">
                    <strong>Status:</strong>
                    <select
                      className="form-select"
                      onChange={(e) => statusHandler(e, order._id)}
                      value={order.status}
                    >
                      <option value="Food processing">Food processing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <div className="text-center">
                    <button className="btn btn-primary w-100">Track Order</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
          <h4 className="text-muted">No orders found</h4>
        </div>
      )}
    </div>
  );
}
