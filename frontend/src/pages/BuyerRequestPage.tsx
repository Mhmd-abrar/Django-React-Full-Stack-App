import React from 'react';
import ProductRequestForm from '../components/ProductRequestForm.tsx';
import '../styles/BuyerRequestPage.css'; // Adjusted path

const BuyerRequestPage: React.FC = () => {
  return (
    <div className="buyer-request-page">
      <h1>Thrive in a Sustainable Cycle</h1>
      <p>Unlock the potential of pre-loved goods through our eco-conscious network</p>
      <ProductRequestForm />
    </div>
  );
};

export default BuyerRequestPage;