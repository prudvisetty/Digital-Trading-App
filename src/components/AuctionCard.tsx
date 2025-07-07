import React, { useState, useEffect } from 'react';
import { Clock, Users, Gavel, Coins } from 'lucide-react';

interface Bid {
  _id: string;
  bidder: {
    username: string;
  };
  amount: number;
  tokensUsed: number;
  timestamp: string;
}

interface AuctionCardProps {
  product: {
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
  };
  onBid: (productId: string, amount: number, tokensToUse: number) => void;
  userTokens: number;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ product, onBid, userTokens }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [bidAmount, setBidAmount] = useState(product.currentPrice + 10);
  const [tokensToUse, setTokensToUse] = useState(1);
  const [showBidForm, setShowBidForm] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const endTime = new Date(product.auctionEndTime).getTime();
      const distance = endTime - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft('ENDED');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [product.auctionEndTime]);

  const handleBid = () => {
    if (bidAmount > product.currentPrice && tokensToUse <= userTokens) {
      onBid(product._id, bidAmount, tokensToUse);
      setShowBidForm(false);
    }
  };

  const isAuctionEnded = timeLeft === 'ENDED';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gold/20 hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 bg-burgundy text-cream px-3 py-1 rounded-lg text-sm font-medium flex items-center">
          <Gavel className="h-4 w-4 mr-1" />
          AUCTION
        </div>
        <div className="absolute top-4 right-4 bg-charcoal/80 text-cream px-3 py-1 rounded-lg text-sm">
          {product.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-charcoal mb-2">
          {product.title}
        </h3>
        <p className="text-charcoal/70 mb-4 text-sm line-clamp-2">
          {product.description}
        </p>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-charcoal/60">Current Bid:</span>
            <span className="text-2xl font-bold text-burgundy">${product.currentPrice}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-charcoal/60">Starting Price:</span>
            <span className="text-sm text-charcoal/80">${product.startingPrice}</span>
          </div>
        </div>
        
        <div className="bg-cream/50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-burgundy mr-2" />
              <span className="text-sm font-medium text-charcoal">Time Left:</span>
            </div>
            <span className={`text-sm font-bold ${isAuctionEnded ? 'text-red-600' : 'text-burgundy'}`}>
              {timeLeft}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-charcoal/70">By {product.seller.username}</span>
          <div className="flex items-center">
            <Coins className="h-4 w-4 text-gold mr-1" />
            <span className="text-sm text-charcoal/70">Your tokens: {userTokens}</span>
          </div>
        </div>
        
        {!isAuctionEnded ? (
          <div className="space-y-3">
            {!showBidForm ? (
              <button 
                onClick={() => setShowBidForm(true)}
                className="w-full bg-burgundy hover:bg-burgundy-dark text-cream py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <Gavel className="h-5 w-5 mr-2" />
                Place Bid
              </button>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Bid Amount ($)
                  </label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    min={product.currentPrice + 1}
                    className="w-full px-3 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Tokens to Use
                  </label>
                  <input
                    type="number"
                    value={tokensToUse}
                    onChange={(e) => setTokensToUse(Number(e.target.value))}
                    min={1}
                    max={userTokens}
                    className="w-full px-3 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy"
                  />
                  <p className="text-xs text-charcoal/60 mt-1">
                    Using tokens increases your bid priority
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleBid}
                    disabled={bidAmount <= product.currentPrice || tokensToUse > userTokens}
                    className="flex-1 bg-burgundy hover:bg-burgundy-dark disabled:bg-charcoal/30 text-cream py-2 rounded-lg font-medium transition-colors"
                  >
                    Confirm Bid
                  </button>
                  <button
                    onClick={() => setShowBidForm(false)}
                    className="flex-1 border border-charcoal/30 text-charcoal py-2 rounded-lg font-medium hover:bg-charcoal/5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
            <span className="text-red-600 font-medium">Auction Ended</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionCard;