
import React from 'react';
import { ShieldCheck, ThumbsUp, Truck, Phone } from 'lucide-react';

export const TrustAndSupport: React.FC = () => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mt-8">
      <h3 className="text-xl font-semibold text-slate-900 mb-4">Trust & Support</h3>
      <ul className="space-y-4 text-slate-600">
        <li className="flex items-center">
          <ThumbsUp size={20} className="text-blue-500 mr-3" />
          <span>Reliable backup power for fibre internet</span>
        </li>
        <li className="flex items-center">
          <ShieldCheck size={20} className="text-blue-500 mr-3" />
          <span>Warranty support</span>
        </li>
        <li className="flex items-center">
          <Truck size={20} className="text-blue-500 mr-3" />
          <span>Fast delivery</span>
        </li>
        <li className="flex items-center">
          <Phone size={20} className="text-blue-500 mr-3" />
          <span>Customer support availability</span>
        </li>
      </ul>
    </div>
  );
};
