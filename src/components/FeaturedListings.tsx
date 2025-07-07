import React from 'react';
import { Heart, Star, Eye } from 'lucide-react';

const FeaturedListings: React.FC = () => {
  const listings = [
    {
      id: 1,
      title: 'Vintage Katana Display',
     price: '$1,200',
      image: 'https://images.pexels.com/photos/8961337/pexels-photo-8961337.jpeg?auto=compress&cs=tinysrgb&w=400',
     seller: 'Alex Chen',
      rating: 4.9,
      views: 1234,
      category: 'Antiques'
    },
    {
      id: 2,
      title: 'Traditional Calligraphy Set',
     price: '$450',
      image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=400',
     seller: 'Maria Santos',
      rating: 4.8,
      views: 892,
      category: 'Art & Crafts'
    },
    {
      id: 3,
      title: 'Silk Kimono Collection',
     price: '$850',
      image: 'https://images.pexels.com/photos/7013617/pexels-photo-7013617.jpeg?auto=compress&cs=tinysrgb&w=400',
     seller: 'Emma Johnson',
      rating: 5.0,
      views: 2156,
      category: 'Fashion'
    },
    {
      id: 4,
      title: 'Ceramic Tea Set',
     price: '$320',
      image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=400',
     seller: 'David Kim',
      rating: 4.7,
      views: 567,
      category: 'Home'
    },
    {
      id: 5,
      title: 'Handmade Wooden Furniture',
     price: '$950',
      image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400',
     seller: 'Sophie Miller',
      rating: 4.9,
      views: 1789,
      category: 'Furniture'
    },
    {
      id: 6,
      title: 'Traditional Lacquerware',
     price: '$670',
      image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=400',
     seller: 'James Wilson',
      rating: 4.8,
      views: 923,
      category: 'Art & Crafts'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-cream/80 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-charcoal mb-4">Featured Listings</h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
           Discover exceptional items from our most trusted sellers worldwide, each piece telling a unique story.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gold/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="relative">
                <img 
                  src={listing.image} 
                  alt={listing.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-burgundy text-cream px-2 py-1 rounded-lg text-xs font-medium">
                  {listing.category}
                </div>
                <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white text-burgundy p-2 rounded-full transition-colors">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-charcoal mb-2 group-hover:text-burgundy transition-colors">
                  {listing.title}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-burgundy">{listing.price}</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-gold fill-current" />
                      <span className="text-sm text-charcoal/70 ml-1">{listing.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 text-charcoal/50" />
                      <span className="text-sm text-charcoal/70 ml-1">{listing.views}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-charcoal/70">By {listing.seller}</span>
                  <button className="bg-gold hover:bg-gold/90 text-charcoal px-4 py-2 rounded-lg font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-burgundy hover:bg-burgundy-dark text-cream px-8 py-4 rounded-lg font-semibold transition-colors">
            View All Listings
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;