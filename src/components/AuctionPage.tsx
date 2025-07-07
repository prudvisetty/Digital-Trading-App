import React, { useState, useEffect } from 'react';
import { Gavel, Plus, Coins, Filter } from 'lucide-react';
import AuctionCard from './AuctionCard';
import TokenPurchase from './TokenPurchase';

interface User {
  id: string;
  username: string;
  email: string;
  tokens: number;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  currentPrice: number;
  startingPrice: number;
  image: string;
  auctionEndTime: string;
  seller: {
    username: string;
  };
  category: string;
  isAuction: boolean;
}

const AuctionPage: React.FC = () => {
  const [auctions, setAuctions] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showTokenPurchase, setShowTokenPurchase] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    'all', 'Art & Crafts', 'Antiques', 'Jewelry', 'Furniture', 
    'Books', 'Music', 'Photography', 'Fashion'
  ];

  useEffect(() => {
    fetchAuctions();
    fetchUserProfile();
  }, [selectedCategory]);

  const fetchAuctions = async () => {
    try {
      const categoryParam = selectedCategory !== 'all' ? `&category=${selectedCategory}` : '';
      const response = await fetch(`http://localhost:3001/api/products?isAuction=true${categoryParam}`);
      const data = await response.json();
      setAuctions(data);
    } catch (error) {
      console.error('Error fetching auctions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3001/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleBid = async (productId: string, amount: number, tokensToUse: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to place bids');
        return;
      }

      const response = await fetch(`http://localhost:3001/api/products/${productId}/bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount, tokensToUse })
      });

      const data = await response.json();
      
      if (response.ok) {
        // Update local state
        setAuctions(prev => prev.map(auction => 
          auction._id === productId 
            ? { ...auction, currentPrice: amount }
            : auction
        ));
        
        if (user) {
          setUser({ ...user, tokens: data.newTokenBalance });
        }
        
        alert('Bid placed successfully!');
      } else {
        alert(data.error || 'Failed to place bid');
      }
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid');
    }
  };

  const handleTokenPurchase = async (amount: number, paymentMethod: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to purchase tokens');
        return;
      }

      const response = await fetch('http://localhost:3001/api/tokens/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount, paymentMethod })
      });

      const data = await response.json();
      
      if (response.ok) {
        if (user) {
          setUser({ ...user, tokens: data.newTokenBalance });
        }
        alert(`Successfully purchased ${amount} tokens!`);
      } else {
        alert(data.error || 'Failed to purchase tokens');
      }
    } catch (error) {
      console.error('Error purchasing tokens:', error);
      alert('Failed to purchase tokens');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <Gavel className="h-12 w-12 text-burgundy mx-auto mb-4 animate-pulse" />
          <p className="text-charcoal">Loading auctions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream/95 to-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-charcoal mb-2 flex items-center">
              <Gavel className="h-10 w-10 text-burgundy mr-3" />
              Live Auctions
            </h1>
            <p className="text-xl text-charcoal/70">
              Bid on exclusive items using tokens for priority
            </p>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="bg-white rounded-lg px-4 py-2 shadow-md border border-gold/20">
                <div className="flex items-center">
                  <Coins className="h-5 w-5 text-gold mr-2" />
                  <span className="font-semibold text-charcoal">{user.tokens} tokens</span>
                </div>
              </div>
              <button
                onClick={() => setShowTokenPurchase(true)}
                className="bg-burgundy hover:bg-burgundy-dark text-cream px-6 py-2 rounded-lg font-semibold transition-colors flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Buy Tokens
              </button>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-charcoal mr-2" />
            <span className="font-semibold text-charcoal">Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-burgundy text-cream'
                    : 'bg-white text-charcoal border border-gold/30 hover:border-gold/50'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Auctions Grid */}
        {auctions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {auctions.map((auction) => (
              <AuctionCard
                key={auction._id}
                product={auction}
                onBid={handleBid}
                userTokens={user?.tokens || 0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Gavel className="h-16 w-16 text-charcoal/30 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-charcoal mb-2">No Active Auctions</h3>
            <p className="text-charcoal/60">
              {selectedCategory !== 'all' 
                ? `No auctions found in ${selectedCategory} category`
                : 'Check back later for new auctions'
              }
            </p>
          </div>
        )}

        {/* Token Purchase Modal */}
        <TokenPurchase
          isOpen={showTokenPurchase}
          onClose={() => setShowTokenPurchase(false)}
          onPurchase={handleTokenPurchase}
          currentTokens={user?.tokens || 0}
        />
      </div>
    </div>
  );
};

export default AuctionPage;