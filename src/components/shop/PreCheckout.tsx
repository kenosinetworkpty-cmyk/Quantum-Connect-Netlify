
import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { ShopProduct } from '../../types';

interface PreCheckoutProps {
  cart: { [id: string]: number };
  products: ShopProduct[];
  onUpdateCartQuantity: (productId: string, quantity: number) => void;
  onProceedToCheckout: () => void;
}

export const PreCheckout: React.FC<PreCheckoutProps> = ({ cart, products, onUpdateCartQuantity, onProceedToCheckout }) => {
  const cartItems = Object.keys(cart)
    .map(id => {
      const product = products.find(p => p.id === id);
      if (!product) return null;
      return { ...product, quantity: cart[id] };
    })
    .filter((item): item is ShopProduct & { quantity: number } => item !== null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const vat = subtotal * 0.15;
  const total = subtotal + vat;

  const handleQuantityChange = (productId: string, quantity: number) => {
    const numQuantity = Number(quantity);
    if (isNaN(numQuantity) || numQuantity < 1) {
      onUpdateCartQuantity(productId, 1);
      return;
    }
    onUpdateCartQuantity(productId, numQuantity);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Review Your Order</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Right Column: Delivery Info, Reassurance, CTA */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
              {/* Delivery Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Delivery Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="deliveryAddress">Delivery Address</Label>
                    <Input id="deliveryAddress" name="deliveryAddress" placeholder="Enter your address" />
                  </div>
                  <p className="text-sm text-gray-600">Estimated delivery: <span className="font-semibold">2-3 business days</span></p>
                </div>
              </div>
              
              {/* Reassurance Messaging */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Guarantee</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">✔ Reliability & Warranty Support</li>
                  <li className="flex items-center">✔ Fast Delivery</li>
                  <li className="flex items-center">✔ Customer Support Availability</li>
                </ul>
              </div>

               {/* Secure Payments */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure Payments</h3>
                <div className="flex items-center space-x-4 text-gray-600">
                    {/* Placeholder for payment icons */}
                    <span>Ozow</span>
                    <span>Credit Card</span>
                    <span>Debit Order</span>
                </div>
              </div>

            </div>
             {/* Payment CTA */}
            <div className="mt-6">
                <Button onClick={onProceedToCheckout} variant="primary" size="lg" className="w-full transition-transform transform hover:scale-105">
                Proceed to Secure Checkout
                </Button>
            </div>
          </div>
          
          {/* Left Column: Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-4">Cart Summary</h2>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">R {item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="px-2 py-1 border rounded-md">-</button>
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                            className="w-12 text-center border-t border-b"
                        />
                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="px-2 py-1 border rounded-md">+</button>
                      </div>
                    </div>
                    <p className="font-semibold">R {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t space-y-2">
                  <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>R {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                      <span>VAT (15%)</span>
                      <span>R {vat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 mt-2">
                      <span>Total</span>
                      <span>R {total.toFixed(2)}</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
