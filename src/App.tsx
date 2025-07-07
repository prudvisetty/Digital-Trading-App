import React from 'react';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedListings from './components/FeaturedListings';
import AuctionPage from './components/AuctionPage';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      localStorage.removeItem('token');
    }
  };

  const handleAuth = (token: string, userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header 
        user={user}
        onPageChange={setCurrentPage}
        onAuthClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        currentPage={currentPage}
      />
      
      {currentPage === 'home' && (
        <>
          <Hero />
          <Categories />
          <FeaturedListings />
        </>
      )}
      
      {currentPage === 'auctions' && <AuctionPage />}
      
      <Footer />
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
      />
    </div>
  );
}

export default App;