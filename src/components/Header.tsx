import React, { useState } from 'react';
import { Search, Menu, X, User, ShoppingBag, Bell, Gavel, Coins, LogOut } from 'lucide-react';

interface HeaderProps {
  user: any;
  onPageChange: (page: string) => void;
  onAuthClick: () => void;
  onLogout: () => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  onPageChange, 
  onAuthClick, 
  onLogout, 
  currentPage 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-gradient-to-r from-burgundy to-burgundy-dark shadow-lg border-b-4 border-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 
              className="text-2xl font-bold text-cream tracking-wide cursor-pointer"
              onClick={() => onPageChange('home')}
            >
             <span className="text-gold">Narayana</span>
            </h1>
           <p className="text-xs text-cream/80 -mt-1">Global Trading Platform</p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onPageChange('home')}
              className={`hover:text-gold transition-colors duration-200 font-medium ${
                currentPage === 'home' ? 'text-gold' : 'text-cream'
              }`}
            >
              Marketplace
            </button>
            <button 
              onClick={() => onPageChange('auctions')}
              className={`hover:text-gold transition-colors duration-200 font-medium flex items-center ${
                currentPage === 'auctions' ? 'text-gold' : 'text-cream'
              }`}
            >
              <Gavel className="h-4 w-4 mr-1" />
              Auctions
            </button>
            <button className="text-cream hover:text-gold transition-colors duration-200 font-medium">
              Categories
            </button>
            <button className="text-cream hover:text-gold transition-colors duration-200 font-medium">
              Sellers
            </button>
            <button className="text-cream hover:text-gold transition-colors duration-200 font-medium">
              About
            </button>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for items..."
                className="w-full px-4 py-2 bg-cream/10 border border-cream/20 rounded-lg text-cream placeholder-cream/60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-cream/60" />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center bg-cream/10 rounded-lg px-3 py-1">
                  <Coins className="h-4 w-4 text-gold mr-1" />
                  <span className="text-cream text-sm font-medium">{user.tokens}</span>
                </div>
                <button className="text-cream hover:text-gold transition-colors duration-200 relative">
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-gold text-charcoal text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </button>
                <button className="text-cream hover:text-gold transition-colors duration-200">
                  <ShoppingBag className="h-6 w-6" />
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="text-cream hover:text-gold transition-colors duration-200 flex items-center"
                  >
                    <User className="h-6 w-6" />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gold/20 py-2 w-48 z-50">
                      <div className="px-4 py-2 border-b border-gold/20">
                        <p className="font-medium text-charcoal">{user.username}</p>
                        <p className="text-sm text-charcoal/60">{user.email}</p>
                      </div>
                      <button 
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-charcoal hover:bg-cream/50 transition-colors flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button 
                onClick={onAuthClick}
                className="bg-gold hover:bg-gold/90 text-charcoal px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-cream hover:text-gold transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-burgundy-dark border-t border-cream/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => onPageChange('home')}
              className="block w-full text-left px-3 py-2 text-cream hover:text-gold transition-colors duration-200"
            >
              Marketplace
            </button>
            <button 
              onClick={() => onPageChange('auctions')}
              className="block w-full text-left px-3 py-2 text-cream hover:text-gold transition-colors duration-200 flex items-center"
            >
              <Gavel className="h-4 w-4 mr-2" />
              Auctions
            </button>
            <button className="block w-full text-left px-3 py-2 text-cream hover:text-gold transition-colors duration-200">
              Categories
            </button>
            <button className="block w-full text-left px-3 py-2 text-cream hover:text-gold transition-colors duration-200">
              Sellers
            </button>
            <button className="block w-full text-left px-3 py-2 text-cream hover:text-gold transition-colors duration-200">
              About
            </button>
          </div>
          <div className="px-4 py-3 border-t border-cream/20">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for items..."
                className="w-full px-4 py-2 bg-cream/10 border border-cream/20 rounded-lg text-cream placeholder-cream/60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-cream/60" />
            </div>
          </div>
          {user && (
            <div className="px-4 py-3 border-t border-cream/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Coins className="h-4 w-4 text-gold mr-2" />
                  <span className="text-cream">{user.tokens} tokens</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-cream hover:text-gold transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;