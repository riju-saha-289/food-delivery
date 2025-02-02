import React, { useContext, useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { Context } from '../Context/Context';
export default function FoodItem({id, name, price, description, image }) {

  const {url,cartItems,addToCart,removeFromCart}=useContext(Context);

  return (
    <div className="card food-item shadow-sm mb-4 " style={{ width: '18rem', borderRadius: '10px' }}>
      {/* Image Section with position-relative */}
      <div className="position-relative">
        <img
          src={`${url}/images/${image}`}
          className="card-img-top"
          alt={name}
          style={{ height: '150px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
        />
        
        {/* Add Icon - Positioned 15px from bottom and right */}
        {!cartItems[id] ? (
          <img
            className="position-absolute bottom-0 end-0 mb-3 me-3 cursor-pointer"
            src={assets.add_icon_white}
            alt="Add"
            onClick={() =>addToCart(id)}
            style={{ width: '35px', borderRadius:"50%"}}
          />
        ) : (
          <div className="position-absolute bottom-0 end-0 mb-3 me-3 d-flex align-items-center  bg-white" 
          style={{ gap: "10px", padding:"6px",borderRadius:"50px" }}

          >
            <img
              src={assets.remove_icon_red}
              alt="Remove"
              onClick={() => removeFromCart(id)}
              style={{ width: '30px', cursor: 'pointer' }}
            />
            <p className='mt-2'>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              alt="Add"
              onClick={() =>addToCart(id)}
              style={{ width: '30px', cursor: 'pointer' }}
            />
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          {/* Food Name */}
          <h5 className="card-title mb-0" style={{ fontWeight: 'bold', color: '#2c7a7b' }}>
            {name}
          </h5>
          {/* Rating Stars */}
          <img src={assets.rating_starts} alt="Rating" style={{ height: '20px', width: 'auto' }} />
        </div>

        {/* Description */}
        <p className="card-text text-muted small mb-3" style={{ fontSize: '0.9rem' }}>
          {description}
        </p>

        {/* Price */}
        <div className="d-flex justify-content-between align-items-center">
          <p className="text-primary fw-bold mb-0" style={{ fontSize: '1rem' }}>
            ${price}
          </p>
          
        </div>
      </div>
    </div>
  );
}
 