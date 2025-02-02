import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder() {
  const { cartTotal, token, food_list, cartItems, url } = useContext(Context);

  const [data, setData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    phone: "",
  });

  // Handle Input Changes
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

   // Handle Payment Process
  const proceedToPayment = async (e) => {
    e.preventDefault();
    let orderItems = [];

    // Prepare Order Items
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    // Order Data
    const orderData = {
      address: data,
      items: orderItems,
      amount: (cartTotal() + 2), // Add delivery fee
    };
    try {
      // Send Order to Backend
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });
  
      // Extract Order Data
      const { order,orderId,userId} = response.data;
      // Get Razorpay Key
      const { data: keyData } = await axios.get(`${url}/api/order/getkey`);
      const { key } = keyData;
      
     
      // Razorpay Options
      const options = {
        key,
        amount: orderData.amount, // Convert amount to paise
        currency: "INR",
        name: "TOMATO",
        description: "Test Transaction",
        order_id: order.id, // Order ID from backend
        callback_url:`${url}/api/order/verify?orderId=${orderId}&userId=${userId}`, // Redirect to verification URL after payment
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#F37254",
        },
      };
  
      // Open Razorpay Payment UI
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("Error in proceedToPayment:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  const navigate=useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(cartTotal()===0){
      navigate('/cart')
    }
  },[token])
  return (
    <div className="container py-5">
      {/* Title */}
      <h1 className="text-center mb-4 text-success fw-bold">Place Your Order</h1>

      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          {/* Form */}
          <form className="p-4 shadow rounded-3 bg-white" onSubmit={proceedToPayment}>
            <h3 className="text-center text-primary fw-bold mb-4">Delivery Information</h3>

            {/* Full Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold text-secondary">
                Full Name
              </label>
              <input
                type="text"
                className="form-control form-control-lg rounded-pill"
                id="name"
                placeholder="Enter your full name"
                required
                name="name"
                onChange={onChangeHandler}
                value={data.name}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold text-secondary">
                Email Address
              </label>
              <input
                type="email"
                className="form-control form-control-lg rounded-pill"
                id="email"
                placeholder="Enter your email address"
                required
                name="email"
                onChange={onChangeHandler}
                value={data.email}
              />
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label htmlFor="phone" className="form-label fw-semibold text-secondary">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control form-control-lg rounded-pill"
                id="phone"
                placeholder="Enter your phone number"
                required
                name="phone"
                onChange={onChangeHandler}
                value={data.phone}
              />
            </div>

            {/* Street Address */}
            <div className="mb-4">
              <label htmlFor="street" className="form-label fw-semibold text-secondary">
                Street Address
              </label>
              <input
                type="text"
                className="form-control form-control-lg rounded-pill"
                id="street"
                placeholder="Enter your street address"
                required
                name="street"
                onChange={onChangeHandler}
                value={data.street}
              />
            </div>

            {/* City */}
            <div className="mb-4">
              <label htmlFor="city" className="form-label fw-semibold text-secondary">
                City
              </label>
              <input
                type="text"
                className="form-control form-control-lg rounded-pill"
                id="city"
                placeholder="Enter your city"
                required
                name="city"
                onChange={onChangeHandler}
                value={data.city}
              />
            </div>

            {/* Cart Total Section */}
            <div className="cart-bottom mt-4">
              <div
                className="cart-total p-4 bg-light rounded shadow-sm"
                style={{ borderRadius: "10px" }}
              >
                <h4 className="text-center text-success mb-4">Cart Total</h4>

                <div className="d-flex justify-content-between mb-3">
                  <p className="mb-0 text-secondary">Subtotal</p>
                  <p className="mb-0">${cartTotal()}</p>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <p className="mb-0 text-secondary">Delivery Fee</p>
                  <p className="mb-0">{cartTotal() > 0 ? "$2" : "$0"}</p>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <b>Total</b>
                  <b>${cartTotal() > 0 ? cartTotal() + 2 : cartTotal()}</b>
                </div>

                {/* Proceed to Payment */}
                {(
                  <button
                    className="btn btn-success w-100 py-2 fw-bold"
                    style={{ borderRadius: "25px" }}
                    type="submit"
                  >
                    PROCEED TO PAYMENT
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
