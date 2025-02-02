import React, { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import { Navigate, useNavigate } from "react-router-dom";
export default function Cart() {
  const { url,food_list, cartItems, removeFromCart,cartTotal} = useContext(Context);
  const navigate=useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  // If discount is applied, subtract it from the total
  if (discountApplied) {
    total *= 0.9; // 10% discount as an example
  }

  const handleApplyPromoCode = () => {
    // Simple promo code validation
    if (promoCode === "DISCOUNT10") {
      setDiscountApplied(true);
    } else {
      alert("Invalid Promo Code");
      setDiscountApplied(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center mb-4">Shopping Cart</h1>

      {/* Desktop View: Table Layout */}
      <div className="d-none d-md-block">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark text-center">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {food_list.map((item, index) => {
                if (cartItems && cartItems[item._id] > 0) {
                  return (
                    <tr key={item._id} className="align-middle text-center">
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img
                          src={`${url}/images/${item.image}`}
                          alt={item.name}
                          className="img-fluid rounded"
                          style={{ maxWidth: "80px", height: "auto" }}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{cartItems[item._id]}</td>
                      <td>${(item.price * cartItems[item._id]).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removeFromCart(item._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View: Card Layout */}
      <div className="d-block d-md-none">
        <div className="row gy-4">
          {food_list.map((item) => {
            if (cartItems && cartItems[item._id] > 0) {
              return (
                <div key={item._id} className="col-12">
                  <div className="card shadow-sm border-0" style={{ borderRadius: "15px", overflow: "hidden" }}>
                    <div className="row g-0">
                      <div className="col-4 bg-light d-flex align-items-center justify-content-center">
                        <img
                          src={`${url}/images/${item.image}`}
                          
                          alt={item.name}
                          className="img-fluid"
                          style={{
                            maxHeight: "120px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                      </div>

                      <div className="col-8">
                        <div className="card-body p-3">
                          <h5 className="card-title text-truncate mb-2" title={item.name}>
                            {item.name}
                          </h5>
                          <p className="card-text text-muted small mb-1">
                            <strong>Price:</strong> ${item.price.toFixed(2)}
                          </p>
                          <p className="card-text text-muted small mb-1">
                            <strong>Quantity:</strong> {cartItems[item._id]}
                          </p>
                          <p className="card-text text-success mb-2">
                            <strong>Total:</strong> ${(item.price * cartItems[item._id]).toFixed(2)}
                          </p>

                          <div className="d-flex justify-content-between align-items-center">
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => removeFromCart(item._id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Cart Bottom Section */}
      <div className="cart-bottom mt-4">
        <div className="cart-total p-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
          <h3 className="text-center mb-4">Cart Total</h3>
          <div className="d-flex justify-content-between mb-3">
            <p>Subtotal</p>
            <p>${cartTotal()}</p>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <p>Delivery Fee</p>
            <p>{cartTotal()>0 ? '$2': '$ 0'}</p>
          </div>
          <hr />

          <div className="d-flex justify-content-between mb-4">
            <b>Total</b>
            <b>${cartTotal()>0 ? cartTotal()+2 : cartTotal()}</b><b>${cartTotal() > 0 ? cartTotal() + 2 : cartTotal()}</b>

          </div>

          {/* Promo Code Section */}
          <div className="mb-3">
            <label htmlFor="promoCode" className="form-label">If you have a promocode, enter it below:</label>
            <div className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                id="promoCode"
                placeholder="Enter Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={handleApplyPromoCode}
              >
                Apply
              </button>
            </div>
          </div>
          {/* proceed to checkout */}
          <button className="btn btn-success w-100 py-2"
           onClick={()=>navigate('/order')} 
           style={{ borderRadius: "25px", fontWeight: "bold" } }>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
