// File: src/components/SustainableItemForm.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { PlusCircle, Upload } from 'lucide-react';
import './SustainableItemForm.css';

interface FormData {
  name: string;
  description: string;
  quantity: number;
  cost: number;
  image: File | null;
  category: string;
}

const SustainableItemForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    quantity: 1,
    cost: 0,
    image: null,
    category: '',
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' || name === 'cost' ? parseFloat(value) : value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Form Data Submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setTimeout(() => {
        setFormData({
          name: '',
          description: '',
          quantity: 1,
          cost: 0,
          image: null,
          category: '',
        });
        setImagePreview(null);
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { value: '', label: 'Select a category' },
    { value: 'clothing', label: 'Sustainable Clothing' },
    { value: 'home', label: 'Eco-Friendly Home Goods' },
    { value: 'electronics', label: 'Recycled Electronics' },
    { value: 'packaging', label: 'Sustainable Packaging' },
    { value: 'furniture', label: 'Upcycled Furniture' },
    { value: 'accessories', label: 'Green Accessories' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="intro-section">
          <h2 className="intro-title">Join the Circular Economy</h2>
          <p className="intro-text">
            List your sustainable products and contribute to a more circular economy. 
            Every reused or recycled item helps reduce waste and conserve resources.
          </p>
        </div>
      </main>
    <div className="form-container">
      <h2 className="form-title">List Your Sustainable Item</h2>
      
      {submitSuccess && (
        <div className="success-message">
          Item successfully added to the marketplace!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Item Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="form-input"
            placeholder="Recycled Paper Notebook"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Product Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="form-input"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="form-input"
            placeholder="Describe your sustainable item, including materials used, origin, and environmental impact..."
          ></textarea>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="quantity" className="form-label">
              Quantity Available
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              min="1"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cost" className="form-label">
              Cost (INR)
            </label>
            <input
              type="number"
              id="cost"
              name="cost"
              value={formData.cost}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="form-input"
              placeholder="19.99"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">
            Item Image
          </label>
          <div className="image-upload-container">
            {imagePreview ? (
              <div className="image-preview-container">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="image-preview"
                />
                <label 
                  htmlFor="image-upload" 
                  className="change-image-btn"
                >
                  <span>Change image</span>
                  <input 
                    id="image-upload" 
                    name="image" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden-input" 
                  />
                </label>
              </div>
            ) : (
              <div className="upload-placeholder">
                <Upload className="upload-icon" />
                <div className="upload-text">
                  <label
                    htmlFor="image-upload"
                    className="upload-btn"
                  >
                    <span>Upload an image</span>
                    <input
                      id="image-upload"
                      name="image"
                      type="file"
                      accept="image/*"
                      required
                      onChange={handleInputChange}
                      className="hidden-input"
                    />
                  </label>
                  <p className="upload-or">or drag and drop</p>
                </div>
                <p className="upload-info">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="button-container">
          <button
            type="submit"
            disabled={isSubmitting}
            className={isSubmitting ? "submit-button disabled" : "submit-button"}
          >
            <PlusCircle className="button-icon" />
            {isSubmitting ? 'Submitting...' : 'Add to Marketplace'}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default SustainableItemForm;