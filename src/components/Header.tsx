import React, { useState } from 'react';
import { Search, Menu, X, User, ShoppingBag, Bell } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-burgundy to-burgundy-dark shadow-lg border-b-4 border-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-cream tracking-wide">
             <span className="text-gold">Narayana</span>
            </h1>
           <p className="text-xs text-cream/80 -mt-1">Global Trading Platform</p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-cream hover:text-gold transition-colors duration-200 font-medium">
              Marketplace
            </a>
            <a href="#" className="text-cream hover:text-gold transition-colors duration-200 font-medium">
              Categories
            </a>
            <a href="#" className="text-cream hover:text-gold transition-colors duration-200 font-medium">
              Sellers
            </a>
            <a href="#" className="text-cream hover:text-gold transition-colors duration-200 font-medium">
              About
            </a>
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
            <button className="text-cream hover:text-gold transition-colors duration-200 relative">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-gold text-charcoal text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
            <button className="text-cream hover:text-gold transition-colors duration-200">
              <ShoppingBag className="h-6 w-6" />
            </button>
            <button className="text-cream hover:text-gold transition-colors duration-200">
              <User className="h-6 w-6" />
            </button>
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
            <a href="#" className="block px-3 py-2 text-cream hover:text-gold transition-colors duration-200">
              Marketplace
            </a>
            <a href="#" className="block px-3 py-2 text-cream hover:text-gold transition-colors duration-200">
              Categories
            </a>
            <a href="#" className="block px-3 py-2 text-cream hover:text-gold transition-colors duration-200">
              Sellers
            </a>
            <a href="#" className="block px-3 py-2 text-cream hover:text-gold transition-colors duration-200">
              About
            </a>
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
        </div>
      )}
    </header>
  );
};

export default Header;