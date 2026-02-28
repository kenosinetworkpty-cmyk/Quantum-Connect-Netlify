
import React, { useState } from 'react';
import { PageLayout } from '../ui/PageLayout';
import { Button } from '../ui/Button';
import { InputField } from '../ui/InputField';
import { CreditCard, Lock, Hash, MapPin, User, Mail } from 'lucide-react';

const mockCart = [
  { id: 'mini-dc-ups', name: 'Mini DC UPS', price: 999, quantity: 1, image: 'https://lh3.googleusercontent.com/pw/AP1GczO_x4p3k9K4x7g-Y4f7v9q5f8g3g2hJ6j8hJ3bB-Z2wZ_6yX_5jQJ6sS_wB_xG-L3eA-A_fF_b_V5cZ_xS-J_g=w600-h400-s-no-gm?authuser=2' },
  { id: 'power-bank-20000', name: '20000mAh Power Bank', price: 699, quantity: 2, image: 'https://lh3.googleusercontent.com/pw/AP1GczM_V5f2wR_yK_xG-fB_wL_b_V5cZ_xS-J_g_k-Z2wZ_6yX_5jQJ6sS_wB_xG-L3eA-A_fF_b_V5cZ_xS-J_g=w600-h400-s-no-gm?authuser=2' },
];

export const ShopCheckout: React.FC = () => {
  const [cart, setCart] = useState(mockCart);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 150;
  const total = subtotal + deliveryFee;

  return (
    <PageLayout title="Secure Checkout">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side: Delivery and Payment */}
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-6">Delivery Information</h2>
            <form className="space-y-4">
              <InputField label="Full Name" icon={<User size={18} />} placeholder="John Doe" />
              <InputField label="Email Address" icon={<Mail size={18} />} type="email" placeholder="john.doe@email.com" />
              <InputField label="Delivery Address" icon={<MapPin size={18} />} placeholder="123 Fibre Lane, Sandton" />
              <InputField label="Contact Number" icon={<User size={18} />} placeholder="082 123 4567" />
            </form>

            <h2 className="text-3xl font-bold text-white mt-10 mb-6">Payment Details</h2>
            <form className="space-y-4">
              <InputField label="Card Number" icon={<CreditCard size={18} />} placeholder="**** **** **** 1234" />
              <div className="flex gap-4">
                <InputField label="Expiry Date" icon={<Hash size={18} />} placeholder="MM / YY" className="w-1/2"/>
                <InputField label="CVV" icon={<Lock size={18} />} placeholder="123" className="w-1/2"/>
              </div>
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 self-start">
            <h2 className="text-3xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-slate-700"/>
                    <div>
                      <p className="text-white font-semibold">{item.name}</p>
                      <p className="text-slate-400 text-sm">R {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <input 
                        type="number" 
                        value={item.quantity} 
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-16 bg-slate-700 border border-slate-600 rounded-md p-1.5 text-center text-white focus:ring-2 focus:ring-green-500 outline-none"
                      />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-700 pt-6 space-y-3">
              <div className="flex justify-between text-slate-300"><p>Subtotal:</p> <p className="font-medium">R {subtotal.toLocaleString()}</p></div>
              <div className="flex justify-between text-slate-300"><p>Delivery Fee:</p> <p className="font-medium">R {deliveryFee.toLocaleString()}</p></div>
              <div className="flex justify-between text-white text-xl font-bold"><p>Total:</p> <p>R {total.toLocaleString()}</p></div>
            </div>

            <Button size="lg" className="w-full mt-8 rounded-full py-4 text-lg font-bold tracking-wide shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transform active:scale-95 transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-600">Confirm & Pay</Button>
          </div>

        </div>
      </div>
    </PageLayout>
  );
};
