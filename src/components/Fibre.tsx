import React, { useRef } from 'react';
import { Check, Zap, Wifi, Users, Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Package } from '../types';

interface FibreProps {
  packages: Package[];
}

export const Fibre: React.FC<FibreProps> = ({ packages }) => {
    const navigate = useNavigate();
    const fibrePackagesRef = useRef<HTMLDivElement>(null);

    const handleOrderClick = (packageName: string) => {
        navigate(`/checkout/${packageName}`);
    };

    const handleScrollToPackages = () => {
        fibrePackagesRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    };
  const perks = [
    {
        icon: Zap,
        title: 'Blazing-Fast Speeds',
        description: 'Experience the internet like never before with speeds up to 100Mbps. Perfect for streaming, gaming, and working from home.',
    },
    {
        icon: Wifi,
        title: 'Free Router & Installation',
        description: 'Get a free, top-of-the-line router and professional installation when you sign up. No hidden fees, no hassle.',
    },
    {
        icon: Users,
        title: 'Connect Your Whole Family',
        description: 'Our fibre packages are designed to support multiple devices simultaneously. Everyone can enjoy a fast, reliable connection.',
    },
    {
        icon: Film,
        title: 'Uncapped, Unshaped, Unthrottled',
        description: 'Enjoy unlimited data with no restrictions. Stream, download, and browse as much as you want, whenever you want.',
    }
];


  const brandBlue = "#0a254e";

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
         <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-20"
            src="https://lh3.googleusercontent.com/pw/AP1GczMOgmcU3u-Ehnfc5tNVTSguBaEJCNr-1TisLEyma2kLSgFDy7jURtVYR1vjMWg3_MwzxtEAgepA4NRrXK4-dhuat98RmQG5875PaGdy9n2SdXBp3Ii4b05qYHdNZJATisdgEuSBBihD9k4fZhVWHacH=w1055-h704-s-no-gm?authuser=2"
            alt="Fibre background"
          />
          <div className="absolute inset-0 bg-gray-900/50"></div>
        </div>
        <div className="relative container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl md:text-5xl font-black">Fibre Packages</h1>
          <p className="mt-4 text-lg text-slate-300">FIBRE INTERNET MADE IN SOUTH AFRICA. POWERFUL. FAST. SECURE.</p>
          <button onClick={handleScrollToPackages} style={{ backgroundColor: brandBlue }} className="mt-8 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:opacity-90 transition">
            Get Started
          </button>
        </div>
      </div>

      {/* Pricing Section */}
      <div ref={fibrePackagesRef} className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl p-8 border shadow-lg transition-all duration-300 bg-white text-slate-900`}
              >
                <h3 className="text-2xl font-bold">{pkg.name}</h3>
                <div className="my-6">
                  <span className={`text-5xl font-black text-slate-900`}>R{pkg.price}</span>
                  <span className={`ml-1 text-slate-500`}>/mo</span>
                </div>
                <button 
                    onClick={() => handleOrderClick(pkg.name)} 
                    className={`w-full font-bold py-3 rounded-lg border transition-colors bg-transparent border-slate-300 hover:bg-slate-50`}>
                  Order
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

       {/* Perks Section */}
       <div className="py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Perks of Fibre with Quantum Connect</h2>
              <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
                  We've packed our fibre with features to give you the best experience.
              </p>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                  {perks.map((perk, index) => (
                      <div key={index} className="text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 text-blue-600 rounded-full">
                              <perk.icon className="w-8 h-8" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{perk.title}</h3>
                          <p className="text-slate-500">{perk.description}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};
