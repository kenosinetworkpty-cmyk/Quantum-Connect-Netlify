
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { PowerSolutions } from './PowerSolutions';

export const Store: React.FC = () => {
  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center text-white py-40 px-4"
        style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/pw/AP1GczP8oSlxvUmfnLJSoD9eIJy3eRQMCPF-3wvETQTJ0TS3Y2cFxxPhYTRD7kbReuzL-d_mw3rx9-Xcj5GRWuCVDB6XzMg4rSW7wAbRRXV6KD5plfYOfaSB21iDeqY3mtS73WRE3g6aj-zhTCkvPI6Ttpo=w1238-h825-s-no-gm?authuser=2)' }}
      >
        <div className="absolute inset-0 bg-slate-900/70"></div>
        <div className="relative container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Power Through Loadshedding
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-slate-200">
            Explore our range of backup power solutions. From keeping your WiFi on to powering your entire home, we've got you covered.
          </p>
          <div className="mt-8">
            <Link to="/power-solutions">
              <Button size="lg" variant='primary'>Shop Backup Solutions</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Our Load Shedding Solutions Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900">Our Loadshedding Solutions</h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4">Hand-picked for reliability and performance. Keep your essentials powered on.</p>
          </div>
          <PowerSolutions />
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
