import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-charcoal to-charcoal/90 text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
           <h3 className="text-2xl font-bold mb-4 text-gold">Narayana</h3>
            <p className="text-cream/80 mb-4 leading-relaxed">
             Connecting global sellers and buyers through elegant design and seamless trading. 
             Experience premium commerce in our worldwide marketplace.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cream/60 hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream/60 hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream/60 hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-cream/80 hover:text-gold transition-colors">Marketplace</a></li>
              <li><a href="#" className="text-cream/80 hover:text-gold transition-colors">Categories</a></li>
              <li><a href="#" className="text-cream/80 hover:text-gold transition-colors">Sellers</a></li>
              <li><a href="#" className="text-cream/80 hover:text-gold transition-colors">Buyers Guide</a></li>
              <li><a href="#" className="text-cream/80 hover:text-gold transition-colors">About Us</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-cream/80 hover:text-gold transition-colors">Help Center</a></li>
              <li><a href="#" className="text-cream/80 hover:text-gold transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="text-cream/80 hover:text-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-cream/80 hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-cream/80 hover:text-gold transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gold mr-3" />
               <span className="text-cream/80">info@narayana.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gold mr-3" />
               <span className="text-cream/80">+1-555-123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gold mr-3" />
               <span className="text-cream/80">Global Headquarters</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-cream/20 mt-12 pt-8 text-center">
          <p className="text-cream/60">
           © 2025 Narayana Global Trading. All rights reserved. | 
           <span className="text-gold ml-1">Connecting the World</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;