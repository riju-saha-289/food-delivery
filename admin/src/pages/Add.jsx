import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Add({ url }) {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "salad"
  });

  const handleClick = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const newData = { ...data };
    newData[key] = value;
    setData(newData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);

    // calling API
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "salad"
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <div className="container-fluid px-4">
      <div className="card shadow-lg p-4">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4 text-primary">Add Product</h2>

          {/* Upload Image Section */}
          <div className="mb-4 text-center">
            <p className="form-label fw-bold">Upload Image</p>
            <label htmlFor="image" className="d-block mx-auto">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload"
                className="img-thumbnail"
                style={{ maxWidth: '200px', cursor: 'pointer' }}
              />
            </label>
            <input
              type="file"
              id="image"
              className="form-control d-none"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          {/* Product Name Section */}
          <div className="mb-4">
            <p className="form-label fw-bold">Product Name</p>
            <input
              type="text"
              name="name"
              className="form-control form-control-lg"
              placeholder="Type product name here"
              onChange={handleClick}
              value={data.name}
              required
            />
          </div>

          {/* Product Description Section */}
          <div className="mb-4">
            <p className="form-label fw-bold">Product Description</p>
            <textarea
              name="description"
              className="form-control form-control-lg"
              placeholder="Write product description here"
              rows="5"
              onChange={handleClick}
              value={data.description}
              required
            ></textarea>
          </div>

          {/* Product Category and Price */}
          <div className="row mb-4">
            <div className="col-12 col-md-6 mb-3 mb-md-0">
              <p className="form-label fw-bold">Product Category</p>
              <select
                name="category"
                className="form-select form-select-lg"
                onChange={handleClick}
                value={data.category}
                required
              >
                <option value="">Select category</option>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="col-12 col-md-6">
              <p className="form-label fw-bold">Product Price</p>
              <input
                type="number"
                name="price"
                className="form-control form-control-lg"
                placeholder="Enter product price"
                onChange={handleClick}
                value={data.price}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary px-5 py-2">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
