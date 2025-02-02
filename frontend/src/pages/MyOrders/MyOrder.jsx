import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";

export default function MyOrder() {
  const { url, token } = useContext(Context); // Get API URL and token from context
  const [orders, setOrders] = useState([]); // State to store the user's orders

  // Fetch user orders
  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setOrders(response.data.data); // Set orders in state
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary fw-bold mb-4">My Orders</h2>
      {orders.length > 0 ? (
        <div className="row">
          {orders.map((order, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div className="card shadow-sm rounded">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <img
                      src={assets.parcel_icon}
                      alt="Parcel Icon"
                      style={{ width: "40px" }}
                    />
                  </div>
                  <p className="card-text mb-1">
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return `${item.name} x ${item.quantity}`;
                      } else {
                        return `${item.name} x ${item.quantity}, `;
                      }
                    })}
                  </p>
                  <p className="card-text mb-1">
                    <strong>${order.amount}.00</strong>
                  </p>
                  <p className="card-text">
                    <strong>Items:</strong> {order.items.length}
                  </p>
                  <p className="card-text">
                    <span>&#x25cf;</span> <b>{order.status}</b>
                  </p>
                  <button className="btn btn-primary w-100">
                    Track Order
                  </button>
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
