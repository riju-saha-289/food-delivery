import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function List({url}) {
 
  const [foodList, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
   
    if (response.data.success) {
      setFoodList(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  const handleDelete = async (itemid) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: itemid });
    await fetchFoodList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("ERROR");
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  return (
    <div className="container my-5">
      <p className="text-center fs-3 fw-bold text-primary">All Food List</p>
      <div className="table-responsive">
        <div className="table table-striped">
          <div className="row fw-bold border-bottom pb-2 mb-3">
            <div className="col-2">Image</div>
            <div className="col-2">Name</div>
            <div className="col-2">Category</div>
            <div className="col-2">Price</div>
            <div className="col-4">Action</div>
          </div>
          {foodList.map((item, index) => {
            return (
              <div
                key={index}
                className="row align-items-center mb-3 border-bottom pb-2"
              >
                <div className="col-2">
                  <img
                    src={`${url}/images/${item.image}`}
                    alt=""
                    className="img-fluid rounded"
                    style={{ maxHeight: "80px" }}
                  />
                </div>
                <div className="col-2 text-secondary">{item.name}</div>
                <div className="col-2 text-secondary">{item.category}</div>
                <div className="col-2 text-secondary">${item.price}</div>
                <div className="col-4"
                onClick={()=>handleDelete(item._id)}
                >
                  <button
                    className="btn btn-danger btn-sm"
                    
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
