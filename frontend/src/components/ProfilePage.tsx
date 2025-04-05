import React, { useState, useEffect, ChangeEvent } from 'react';
import { User, Edit2, Save, Home, Search, PlusCircle, Send, Camera, X, Bell, BellOff } from 'lucide-react';
import '../styles/ProfilePage.css';

// Define the shape of user data expected from the backend
interface UserProfile {
  name: string;
  productsBought: number;
  productsSold: number;
}

// Extended interface for green interests with additional fields
interface GreenInterest {
  category: string;
  productDescription: string;
  organization?: string;
  costPerUnit?: number;
  notificationsEnabled: boolean;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [greenInterests, setGreenInterests] = useState<GreenInterest[]>([]);
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [isAddingInterest, setIsAddingInterest] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // New state for the form fields
  const [newInterest, setNewInterest] = useState<GreenInterest>({
    category: 'Sustainable Clothing',
    productDescription: '',
    organization: '',
    costPerUnit: undefined,
    notificationsEnabled: true
  });

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/userProfile.json', {
          headers: { 'Authorization': 'Bearer YOUR_TOKEN' }, // Add auth if needed
        });
        const data: UserProfile = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle profile photo upload
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result as string); // Set the image as a data URL
      };
      reader.readAsDataURL(file);
    }
  };

  // Available green interest options
  const greenInterestOptions = [
    'Sustainable Clothing',
    'Eco-Friendly Home Goods',
    'Recycled Electronics',
    'Sustainable Packaging',
    'Upcycled Furniture',
    'Green Accessories',
    'Other',
  ];

  const handleNewInterestChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement; // Type assertion
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setNewInterest({
        ...newInterest,
        [name]: checked
      });
    } else {
      setNewInterest({
        ...newInterest,
        [name]: name === 'costPerUnit' ? (value ? parseFloat(value) : undefined) : value
      });
    }
  };

  const addNewInterest = () => {
    if (newInterest.productDescription.trim() === '') {
      alert('Please describe what product you are looking for');
      return;
    }
    
    setGreenInterests([...greenInterests, newInterest]);
    setNewInterest({
      category: 'Sustainable Clothing',
      productDescription: '',
      organization: '',
      costPerUnit: undefined,
      notificationsEnabled: true
    });
    setIsAddingInterest(false);
  };

  const removeInterest = (index: number) => {
    const updatedInterests = [...greenInterests];
    updatedInterests.splice(index, 1);
    setGreenInterests(updatedInterests);
  };

  const toggleNotification = (index: number) => {
    const updatedInterests = [...greenInterests];
    updatedInterests[index].notificationsEnabled = !updatedInterests[index].notificationsEnabled;
    setGreenInterests(updatedInterests);
  };

  const saveInterests = async () => {
    setIsSaving(true);
    try {
      // Here you would typically send the data to your backend
      console.log('Saving interests:', greenInterests);
      setIsEditingInterests(false);
    } catch (error) {
      console.error('Failed to update interests:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="profile-container">Loading...</div>;
  }

  if (!user) {
    return <div className="profile-container">Failed to load user profile</div>;
  }

  return (
    <div className="profile-container">
      <main className="profile-content">
        <div className="profile-header">
          <div className="profile-photo-container">
            <label htmlFor="photo-upload" className="photo-upload-label">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={user.name}
                  className="profile-photo"
                />
              ) : (
                <User className="profile-photo-placeholder" />
              )}
              <div className="camera-overlay">
                <Camera className="camera-icon" />
              </div>
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="photo-upload-input"
            />
          </div>
          <h1 className="profile-name">{user.name}</h1>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">{user.productsBought}</span>
            <span className="stat-label">Products Bought</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{user.productsSold}</span>
            <span className="stat-label">Products Sold</span>
          </div>
        </div>

        <div className="green-interests-section">
          <div className="interests-header">
            <h2 className="interests-title">Product Notification Preferences</h2>
            <button
              className="edit-button"
              onClick={() => setIsEditingInterests(!isEditingInterests)}
              disabled={isSaving || isAddingInterest}
            >
              {isEditingInterests ? (
                <Save className="edit-icon" onClick={saveInterests} />
              ) : (
                <Edit2 className="edit-icon" />
              )}
            </button>
          </div>

          {isEditingInterests && !isAddingInterest && (
            <button 
              className="add-interest-button"
              onClick={() => setIsAddingInterest(true)}
            >
              <PlusCircle className="add-icon" />
              <span>Add Product Alert</span>
            </button>
          )}

          {isAddingInterest && (
            <div className="add-interest-form">
              <h3>Get notified when these green products are posted</h3>
              
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={newInterest.category}
                  onChange={handleNewInterestChange}
                  className="form-select"
                >
                  {greenInterestOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="productDescription">What product are you looking for? *</label>
                <textarea
                  id="productDescription"
                  name="productDescription"
                  value={newInterest.productDescription}
                  onChange={handleNewInterestChange}
                  className="form-textarea"
                  placeholder="Describe the specific product you want notifications for"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="organization">Preferred Organization/Brand (optional):</label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={newInterest.organization}
                  onChange={handleNewInterestChange}
                  className="form-input"
                  placeholder="e.g., Patagonia, ThredUp, etc."
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="costPerUnit">Maximum Price (optional):</label>
                <input
                  type="number"
                  id="costPerUnit"
                  name="costPerUnit"
                  value={newInterest.costPerUnit || ''}
                  onChange={handleNewInterestChange}
                  className="form-input"
                  placeholder="Only notify me if price is below this amount"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div className="form-group">
                <div className="notification-toggle">
                  <label htmlFor="notificationsEnabled">Enable notifications:</label>
                  <label className="notification-toggle-switch">
                    <input
                      type="checkbox"
                      id="notificationsEnabled"
                      name="notificationsEnabled"
                      checked={newInterest.notificationsEnabled}
                      onChange={handleNewInterestChange}
                    />
                    <span className="notification-toggle-slider"></span>
                  </label>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setIsAddingInterest(false)}
                >
                  Cancel
                </button>
                <button 
                  className="save-button"
                  onClick={addNewInterest}
                >
                  Add Alert
                </button>
              </div>
            </div>
          )}

          {!isAddingInterest && (
            <div className="interests-list">
              {greenInterests.length > 0 ? (
                greenInterests.map((interest, index) => (
                  <div key={index} className="interest-card">
                    <div className="interest-card-header">
                      <h3 className="interest-category">
                        {interest.notificationsEnabled ? (
                          <Bell className="notification-bell" />
                        ) : (
                          <BellOff className="notification-bell" style={{ color: '#ccc' }} />
                        )}
                        {interest.category}
                      </h3>
                      {isEditingInterests && (
                        <button 
                          className="remove-interest-button"
                          onClick={() => removeInterest(index)}
                        >
                          <X className="remove-icon" />
                        </button>
                      )}
                    </div>
                    <div className="interest-details">
                      <p><strong>Looking for:</strong> {interest.productDescription}</p>
                      {interest.organization && (
                        <p><strong>From:</strong> {interest.organization}</p>
                      )}
                      {interest.costPerUnit && (
                        <p><strong>Max Price:</strong> ${interest.costPerUnit.toFixed(2)}</p>
                      )}
                      
                      {isEditingInterests && (
                        <div className="notification-preferences">
                          <div className="notification-toggle">
                            <span>Notifications:</span>
                            <label className="notification-toggle-switch">
                              <input
                                type="checkbox"
                                checked={interest.notificationsEnabled}
                                onChange={() => toggleNotification(index)}
                              />
                              <span className="notification-toggle-slider"></span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-interests">
                  <p>No product alerts set up yet.</p>
                  {isEditingInterests && (
                    <p>Click the button above to get notified when specific green products are posted.</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Navbar */}
     
    </div>
  );
};

export default ProfilePage;