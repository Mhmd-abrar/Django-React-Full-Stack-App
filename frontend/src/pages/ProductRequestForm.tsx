import React, { useState } from 'react';
import { ProductRequest } from '../types/productTypes';
import { Send } from 'lucide-react';

import '../styles/ProductRequestForm.css';

const ProductRequestForm: React.FC = () => {
  const initialFormState: ProductRequest = {
    requestName: '',
    description: '',
    category: '',
    condition: 'Good',
    maxPrice: 0,
    location: '',
    urgency: 'Medium'
  };

  const [formData, setFormData] = useState<ProductRequest>(initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product Request Submitted:', formData);
    setFormData(initialFormState);
  };

  return (
    <div className="product-request-form-container">
      <h2 className="form-title">Create Product Request</h2>
      <form onSubmit={handleSubmit} className="product-request-form-body">
        <div className="form-fields">
          <div className="form-group">
            <label htmlFor="requestName">Product Name</label>
            <input
              type="text"
              id="requestName"
              name="requestName"
              value={formData.requestName}
              onChange={handleChange}
              required
              placeholder="e.g., Reusable Water Bottle"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe the product you want..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Home">Home</option>
              <option value="Fashion">Fashion</option>
              <option value="Electronics">Electronics</option>
              <option value="Outdoor">Outdoor</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="condition">Preferred Condition</label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="maxPrice">Maximum Price (₹)</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={formData.maxPrice}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g.,Chennai , Trichy"
            />
          </div>

          <div className="form-group">
            <label htmlFor="urgency">Urgency</label>
            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-button">
          <Send size={16} /> Submit Request
        </button>
      </form>
    </div>
  );
};

export default ProductRequestForm;
