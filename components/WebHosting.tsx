
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { Check } from 'lucide-react';

export const WebHosting: React.FC = () => {
  const navigate = useNavigate();

  const handleOrder = (packageName: string) => {
    navigate(`/checkout/${packageName}`);
  };

  return (
    <div className="bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative w-full bg-slate-900 overflow-hidden pt-40 pb-20 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Web Hosting"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 max-w-3xl mx-auto">
            Web Hosting Packages
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 font-light">
            WEB HOSTING MADE IN SOUTH AFRICA. POWERFUL. FAST. SECURE.
          </p>
          <Button
            size="lg"
            variant="primary"
            className="rounded-full px-10 py-4 text-base font-bold tracking-wide shadow-lg animate-pulse"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Hosting Packages Section */}
      <section id="hosting-packages" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <div className="bg-white rounded-lg shadow-md border border-slate-200 p-8 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Basic Package</h3>
              <p className="text-slate-500 mb-6">Superior and secure hosting for personal sites.</p>
              <p className="text-4xl font-black mb-6">R39<span className="text-lg font-medium text-slate-500">/mo</span></p>
              <Button variant="outline" className="mb-8" onClick={() => handleOrder('Basic')}>Order</Button>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />Superior and secure hosting</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />Initial assessment and strategic IT roadmap</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />Easy-to-use control panel</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />Lightning-fast loading speed</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />Free website migration</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />Offsite backup</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />2 GB NVMe Storage</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />30 GB traffic</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />1 MySQL database</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />5 email accounts</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />1 website</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />3 domain aliases</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />SSL certificate</li>
              </ul>
            </div>

            {/* Standard Package (Highlighted) */}
            <div className="bg-blue-900 text-white rounded-lg shadow-xl border-4 border-blue-700 p-8 flex flex-col relative">
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blue-700 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider">
                CUSTOMER FAVORITE
              </div>
              <h3 className="text-2xl font-bold mb-2">Standard Package</h3>
              <p className="text-blue-200 mb-6">Perfect for growing businesses with more traffic.</p>
              <p className="text-4xl font-black mb-6">R59<span className="text-lg font-medium text-blue-300">/mo</span></p>
              <Button variant="light" className="mb-8" onClick={() => handleOrder('Standard')}>Order</Button>
              <ul className="space-y-4 text-blue-100">
                <li className="flex items-center"><Check size={18} className="text-green-400 mr-3" />Superior and secure hosting</li>
                <li className="flex items-center"><Check size={18} className="text-green-400 mr-3" />Detailed assessment and ongoing advisory</li>
                <li className="flex items-center"><Check size={18} className="text-green-400 mr-3" />Easy-to-use control panel</li>
                <li className="flex items-center"><Check size={18} className="text-green-400 mr-3" />Lightning-fast loading speed</li>
                <li className="flex items-center"><Check size={18} className="text-green-400 mr-3" />Free website migration</li>
                <li className="flex items-center"><Check size={18} className="text-green-400 mr-3" />Offsite backup</li>
                <li className="flex items-center"><Check size={18} className="text-green-400 mr-3" />5 GB NVMe storage</li>
                <li className="flex items-center"><Check size={18} className="text-green-400 mr-3" />Unlimited traffic</li>
                <li className="flex items-center"><Check size={18} className="text-green-400 mr-3" />3 MySQL databases</li>
                <li className="flex items-center"><Check size={18} className="text-green-400 mr-3" />30 email accounts</li>
                <li className="flex items-center"><Check size={18} className="text-green-400 mr-3" />5 websites</li>
                <li className="flex items-center"><Check size={18} className="text-green-400 mr-3" />5 domain aliases</li>
                <li className="flex items-center"><Check size={18} className="text-green-400 mr-3" />SSL certificate</li>
              </ul>
            </div>

            {/* Premium Package */}
            <div className="bg-white rounded-lg shadow-md border border-slate-200 p-8 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Premium Package</h3>
              <p className="text-slate-500 mb-6">Advanced performance for e-commerce.</p>
              <p className="text-4xl font-black mb-6">R149<span className="text-lg font-medium text-slate-500">/mo</span></p>
              <Button variant="outline" className="mb-8" onClick={() => handleOrder('Premium')}>Order</Button>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />Superior and secure hosting</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />Comprehensive assessment and ongoing advisory</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />Easy-to-use control panel</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />Lightning-fast loading speed</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />Free website migration</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />Offsite backup</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />30 GB NVMe storage</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />Unlimited traffic</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />5 MySQL databases</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />15 websites</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />15 domain aliases</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />SSL certificate</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" />90 email accounts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
