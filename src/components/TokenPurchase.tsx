import React, { useState } from 'react';
import { Coins, CreditCard, X } from 'lucide-react';

interface TokenPurchaseProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (amount: number, paymentMethod: string) => void;
  currentTokens: number;
}

const TokenPurchase: React.FC<TokenPurchaseProps> = ({ 
  isOpen, 
  onClose, 
  onPurchase, 
  currentTokens 
}) => {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const tokenPackages = [
    { tokens: 100, price: 10, bonus: 0, popular: false },
    { tokens: 500, price: 45, bonus: 50, popular: true },
    { tokens: 1000, price: 85, bonus: 150, popular: false },
    { tokens: 2500, price: 200, bonus: 500, popular: false },
  ];

  const handlePurchase = () => {
    if (selectedPackage !== null) {
      const pkg = tokenPackages[selectedPackage];
      onPurchase(pkg.tokens + pkg.bonus, paymentMethod);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Coins className="h-6 w-6 text-gold mr-2" />
              <h2 className="text-2xl font-bold text-charcoal">Buy Tokens</h2>
            </div>
            <button
              onClick={onClose}
              className="text-charcoal/60 hover:text-charcoal transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <div className="bg-cream/50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Coins className="h-5 w-5 text-gold mr-2" />
                <span className="text-lg font-semibold text-charcoal">
                  Current Balance: {currentTokens} tokens
                </span>
              </div>
              <p className="text-sm text-charcoal/70">
                Use tokens to increase your bid priority in auctions
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <h3 className="text-lg font-semibold text-charcoal mb-3">Select Package</h3>
            {tokenPackages.map((pkg, index) => (
              <div
                key={index}
                onClick={() => setSelectedPackage(index)}
                className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedPackage === index
                    ? 'border-burgundy bg-burgundy/5'
                    : 'border-gold/30 hover:border-gold/50'
                } ${pkg.popular ? 'ring-2 ring-gold/30' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-2 left-4 bg-gold text-charcoal px-2 py-1 rounded text-xs font-bold">
                    MOST POPULAR
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-charcoal">
                        {pkg.tokens} tokens
                      </span>
                      {pkg.bonus > 0 && (
                        <span className="ml-2 text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                          +{pkg.bonus} bonus
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-charcoal/60">
                      Total: {pkg.tokens + pkg.bonus} tokens
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-burgundy">${pkg.price}</div>
                    <div className="text-sm text-charcoal/60">
                      ${(pkg.price / (pkg.tokens + pkg.bonus)).toFixed(3)}/token
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-charcoal mb-3">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex items-center p-3 border border-gold/30 rounded-lg cursor-pointer hover:bg-cream/30 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <CreditCard className="h-5 w-5 text-charcoal mr-2" />
                <span className="text-charcoal">Credit/Debit Card</span>
              </label>
              <label className="flex items-center p-3 border border-gold/30 rounded-lg cursor-pointer hover:bg-cream/30 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div className="w-5 h-5 bg-blue-600 rounded mr-2 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <span className="text-charcoal">PayPal</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 border border-charcoal/30 text-charcoal py-3 rounded-lg font-semibold hover:bg-charcoal/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePurchase}
              disabled={selectedPackage === null}
              className="flex-1 bg-burgundy hover:bg-burgundy-dark disabled:bg-charcoal/30 text-cream py-3 rounded-lg font-semibold transition-colors"
            >
              Purchase Tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenPurchase;