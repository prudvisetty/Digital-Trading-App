import React from 'react';
import { ArrowRight, TrendingUp, Users, Star } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-cream via-cream/95 to-gold/20 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl lg:text-6xl font-bold text-charcoal mb-6 leading-tight">
             Global
             <span className="text-burgundy block">Marketplace</span>
             <span className="text-gold">Connected</span>
            </h2>
            <p className="text-xl text-charcoal/80 mb-8 leading-relaxed">
             Welcome to Narayana - where global trading meets elegant design. 
             Connect with sellers and buyers worldwide in our premium marketplace experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-burgundy hover:bg-burgundy-dark text-cream px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center group">
                Start Trading
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-cream px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                Learn More
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-burgundy" />
                </div>
                <div className="text-2xl font-bold text-charcoal">50K+</div>
                <div className="text-sm text-charcoal/60">Active Listings</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-burgundy" />
                </div>
                <div className="text-2xl font-bold text-charcoal">25K+</div>
                <div className="text-sm text-charcoal/60">Trusted Sellers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-8 w-8 text-burgundy" />
                </div>
                <div className="text-2xl font-bold text-charcoal">4.9</div>
                <div className="text-sm text-charcoal/60">Rating</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gold/20">
              <h3 className="text-2xl font-bold text-charcoal mb-6">Featured Item</h3>
              <div className="bg-gradient-to-br from-burgundy/10 to-gold/20 rounded-lg p-6 mb-6">
                <img 
                  src="https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Traditional Japanese Item" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h4 className="text-xl font-semibold text-charcoal mb-2">Vintage Ceramic Set</h4>
               <p className="text-charcoal/70 mb-4">Beautiful vintage ceramic tea set, carefully preserved</p>
                <div className="flex justify-between items-center">
                 <span className="text-2xl font-bold text-burgundy">$250</span>
                  <button className="bg-gold hover:bg-gold/90 text-charcoal px-4 py-2 rounded-lg font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-gold/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-burgundy/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;