
import React from 'react';
import { ShieldCheck, Truck, MessageCircle } from 'lucide-react';

export const TrustAndSupport: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-blue-900/10 to-green-900/10 border-t border-b border-slate-700 my-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          <div className="flex flex-col items-center p-6 bg-slate-800/50 rounded-xl shadow-lg hover:shadow-green-400/10 transition-shadow duration-300">
            <ShieldCheck size={40} className="text-green-400 mb-4"/>
            <h3 className="text-xl font-bold text-white mb-2">Secure Shopping</h3>
            <p className="text-slate-300">All transactions are encrypted and your information is kept private and secure.</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-slate-800/50 rounded-xl shadow-lg hover:shadow-blue-400/10 transition-shadow duration-300">
            <Truck size={40} className="text-blue-400 mb-4"/>
            <h3 className="text-xl font-bold text-white mb-2">Fast, Reliable Delivery</h3>
            <p className="text-slate-300">We deliver nationwide to your door within 3-5 business days.</p>
          </div>

          <div className="flex flex-col items-center p-6 bg-slate-800/50 rounded-xl shadow-lg hover:shadow-yellow-400/10 transition-shadow duration-300">
            <MessageCircle size={40} className="text-yellow-400 mb-4"/>
            <h3 className="text-xl font-bold text-white mb-2">24/7 Expert Support</h3>
            <p className="text-slate-300">Our team is always here to help you choose the right product and assist with any questions.</p>
          </div>

        </div>
      </div>
    </section>
  );
};
