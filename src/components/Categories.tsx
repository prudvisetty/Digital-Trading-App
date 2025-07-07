import React from 'react';
import { Palette, Clock, Gem, Home, BookOpen, Music, Camera, Shirt } from 'lucide-react';

const Categories: React.FC = () => {
  const categories = [
    { icon: Palette, name: 'Art & Crafts', items: '2,456', color: 'bg-burgundy' },
    { icon: Clock, name: 'Antiques', items: '1,823', color: 'bg-gold' },
    { icon: Gem, name: 'Jewelry', items: '3,901', color: 'bg-burgundy' },
    { icon: Home, name: 'Furniture', items: '1,234', color: 'bg-gold' },
    { icon: BookOpen, name: 'Books', items: '5,672', color: 'bg-burgundy' },
    { icon: Music, name: 'Music', items: '892', color: 'bg-gold' },
    { icon: Camera, name: 'Photography', items: '1,445', color: 'bg-burgundy' },
    { icon: Shirt, name: 'Fashion', items: '2,789', color: 'bg-gold' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-cream to-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-charcoal mb-4">Browse Categories</h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
           Explore our carefully curated categories, featuring quality items from sellers around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gold/20 hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:border-gold/40">
                <div className={`${category.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="h-8 w-8 text-cream" />
                </div>
                <h3 className="text-lg font-semibold text-charcoal text-center mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-charcoal/60 text-center">
                  {category.items} items
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;