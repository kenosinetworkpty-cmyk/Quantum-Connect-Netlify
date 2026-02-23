
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { BatteryCharging, Zap, Shield, Check, Info } from 'lucide-react';

const products = [
  {
    id: 'p1',
    name: 'Compact Power Station',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1626078335346-7a7eda865f37?q=80&w=870&auto=format&fit=crop',
    specs: [
      '512Wh Capacity',
      '600W Pure Sine Wave AC',
      'LiFePO4 Battery',
      'Powers a router & laptop for 6-8 hours',
    ],
    bestFor: 'Remote workers & small apartments',
  },
  {
    id: 'p2',
    name: 'Home Essentials Backup',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1588628003923-35b865a947a8?q=80&w=870&auto=format&fit=crop',
    specs: [
      '1280Wh Capacity',
      '1800W Pure Sine Wave AC',
      'Expandable up to 3kWh',
      'Powers router, TV, lights & more for 4-6 hours',
    ],
    bestFor: 'Townhouses and essential home backup',
    featured: true,
  },
  {
    id: 'p3',
    name: 'Total Home Powerhouse',
    price: 19999,
    image: 'https://images.unsplash.com/photo-1627823812261-27e1f4817042?q=80&w=870&auto=format&fit=crop',
    specs: [
      '2048Wh Capacity',
      '2400W Pure Sine Wave AC',
      'Solar Input up to 1100W',
      'Seamless UPS function (20ms switch)',
    ],
    bestFor: 'Full home backup during loadshedding',
  },
];

export const Store: React.FC = () => {
  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center text-white py-32 px-4"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1603520557493-df1b2120a995?q=80&w=1932&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-slate-900/70"></div>
        <div className="relative container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Stay Connected, Always.
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-slate-200">
            Reliable backup power solutions to keep your internet, and your life, running smoothly during loadshedding.
          </p>
          <div className="mt-8">
            <a href="#products">
              <Button size="lg" variant='primary'>Shop Backup Solutions</Button>
            </a>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900">Our Loadshedding Solutions</h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4">Hand-picked for reliability and performance. Keep your essentials powered on.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col ${product.featured ? 'border-4 border-blue-600' : ''}`}>
                {product.featured && (
                  <div className="bg-blue-600 text-white text-center py-1 font-bold text-sm">
                    Most Popular
                  </div>
                )}
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-slate-500 text-sm mb-4">{product.bestFor}</p>
                  
                  <ul className="space-y-2 mb-6 text-sm text-slate-600 flex-grow">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex items-start">
                        <Check size={16} className="text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-3xl font-extrabold text-slate-900 mb-6">
                    R{product.price.toLocaleString('en-ZA')}
                  </div>

                  <Link to={`/store-checkout/${product.id}`} className="mt-auto">
                    <Button size="lg" className="w-full font-bold">Order Now</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900">Built for Uninterrupted Power</h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4">Don't settle for less. Our solutions offer peace of mind when you need it most.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
             {/* Feature Items */}
          </div>
        </div>
      </div>

    </div>
  );
};
