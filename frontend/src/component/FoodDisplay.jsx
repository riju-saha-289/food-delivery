import React, { useContext } from 'react';
import { Context } from '../Context/Context';
import FoodItem from './FoodItem';

export default function FoodDisplay({category}) {
  const { food_list } = useContext(Context);

  return (
    <section className="food-display py-5 bg-light">
      <div className="container">
        {/* Title Section */}
        <h2 className="text-center mb-4" style={{ color: '#2c7a7b' }}>
          Top Dishes Near You
        </h2>

        {/* Responsive Grid */}
        <div className="row g-4">
          {food_list && food_list.length > 0 ? (
            food_list.map((item, index) => {
              if(category==="All"|| category===item.category){
                return(
                  <div
                    key={index}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
                  >
                    <FoodItem
                      key={index }
                      id={item._id}
                      name={item.name}
                      price={item.price}
                      description={item.description}
                      image={item.image}
                    />
                  </div>
                );
              }
                return null
              })
          ) : (
            <p className="text-center text-muted">No dishes available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
