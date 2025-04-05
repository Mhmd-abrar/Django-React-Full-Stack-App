// File: src/components/MobileNavbar.tsx (or wherever you prefer)
import React from 'react';
import { Home, Search, PlusCircle, Send, User } from 'lucide-react';
import '../styles/MobileNavbar.css'; // Adjust path based on your structure

const MobileNavbar: React.FC = () => {
  return (
    <nav className="mobile-nav">
      <ul className="mobile-nav-list">
        <li>
          <a href="#" className="mobile-nav-link">
            <Home className="mobile-nav-icon" />
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="#" className="mobile-nav-link">
            <Search className="mobile-nav-icon" />
            <span>Search</span>
          </a>
        </li>
        <li>
          <a href="#" className="mobile-nav-link">
            <PlusCircle className="mobile-nav-icon" />
            <span>Add</span>
          </a>
        </li>
        <li>
          <a href="#" className="mobile-nav-link">
            <Send className="mobile-nav-icon" />
            <span>Request</span>
          </a>
        </li>
        <li>
          <a href="#" className="mobile-nav-link">
            <User className="mobile-nav-icon" />
            <span>Profile</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavbar;