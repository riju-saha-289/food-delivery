import React from 'react';
import { menu_list } from '../assets/frontend_assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <section className="explore-menu py-5 bg-light" id='explore-menu'>
      <div className="container">
        <h2 className="text-center mb-4" style={{ color: '#2c7a7b' }}>
          Explore Our Menu
        </h2>
        <div
          className="d-flex justify-content-start align-items-center gap-3 my-4"
          style={{
            flexWrap: 'nowrap', // Prevent items from wrapping
            overflowX: 'auto', // Enable horizontal scrolling
            WebkitOverflowScrolling: 'touch', // For smoother scrolling on mobile
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
            msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
          }}
        >
          {menu_list.map((item, index) => (
            <div
              key={index}
              className="menu-item text-center"
              onClick={() => {
                setCategory(item.menu_name);
              }}
              style={{
                width: '150px', // Maintain a fixed width for menu items
                flexShrink: 0, // Prevent shrinking on smaller screens
              }}
            >
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  overflow: 'hidden',
                  margin: '0 auto',
                }}
              >
                <img
                  src={item.menu_image}
                  alt={item.menu_name}
                  className={
                    category === item.menu_name
                      ? 'border border-danger rounded-circle border-4 p-2'
                      : ''
                  }
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <h5 className="fw-bold">{item.menu_name}</h5>
            </div>
          ))}
        </div>
        <hr />
      </div>
    </section>
  );
};

export default ExploreMenu;
