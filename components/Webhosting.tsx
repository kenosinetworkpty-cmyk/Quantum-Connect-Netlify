
import React from 'react';
import { Check } from 'lucide-react';

export const Webhosting: React.FC = () => {
  const packages = [
    {
      name: 'Basic Package',
      price: 'R39',
      description: 'Superior and secure hosting for personal sites.',
      features: [
        'Superior and secure hosting',
        'Initial assessment and strategic IT roadmap',
        'Easy-to-use control panel',
        'Lightning-fast loading speed',
        'Free website migration',
        'Offsite backup',
        '2 GB NVMe Storage',
        '30 GB traffic',
        '1 MySQL database',
        '5 email accounts',
        '1 website',
        '3 domain aliases',
        'SSL certificate',
      ],
    },
    {
      name: 'Standard Package',
      price: 'R59',
      description: 'Perfect for growing businesses with more traffic.',
      isFavorite: true,
      features: [
        'Superior and secure hosting',
        'Detailed assessment and ongoing advisory',
        'Easy-to-use control panel',
        'Lightning-fast loading speed',
        'Free website migration',
        'Offsite backup',
        '5 GB NVMe storage',
        'Unlimited traffic',
        '3 MySQL databases',
        '30 email accounts',
        '5 websites',
        '5 domain aliases',
        'SSL certificate',
      ],
    },
    {
      name: 'Premium Package',
      price: 'R149',
      description: 'Advanced performance for e-commerce.',
      features: [
        'Superior and secure hosting',
        'Comprehensive assessment and ongoing advisory',
        'Easy-to-use control panel',
        'Lightning-fast loading speed',
        'Free website migration',
        'Offsite backup',
        '30 GB NVMe storage',
        'Unlimited traffic',
        '5 MySQL databases',
        '15 websites',
        '15 domain aliases',
        'SSL certificate',
        '90 email accounts',
      ],
    },
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
            alt="Webserver background"
          />
          <div className="absolute inset-0 bg-gray-900/50"></div>
        </div>
        <div className="relative container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl md:text-5xl font-black">Web Hosting Packages</h1>
          <p className="mt-4 text-lg text-slate-300">WEB HOSTING MADE IN SOUTH AFRICA. POWERFUL. FAST. SECURE.</p>
          <button style={{ backgroundColor: brandBlue }} className="mt-8 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:opacity-90 transition">
            Get Started
          </button>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl p-8 border shadow-lg transition-all duration-300 ${pkg.isFavorite ? 'bg-blue-900 text-white scale-105' : 'bg-white text-slate-900'}`}
              >
                 {pkg.isFavorite && (
                  <span className="block text-center mb-4 font-bold bg-blue-500 text-white text-sm py-1 px-3 rounded-full w-fit mx-auto">CUSTOMER FAVORITE</span>
                )}
                <h3 className="text-2xl font-bold">{pkg.name}</h3>
                <p className={`mt-2 ${pkg.isFavorite ? 'text-blue-200' : 'text-slate-500'}`}>{pkg.description}</p>
                <div className="my-6">
                  <span className={`text-5xl font-black ${pkg.isFavorite ? 'text-white' : 'text-slate-900'}`}>{pkg.price}</span>
                  <span className={`ml-1 ${pkg.isFavorite ? 'text-blue-200' : 'text-slate-500'}`}>/mo</span>
                </div>
                <button className={`w-full font-bold py-3 rounded-lg border transition-colors ${pkg.isFavorite ? 'bg-white text-blue-900 hover:bg-blue-50' : 'bg-transparent border-slate-300 hover:bg-slate-50'}`}>
                  Order
                </button>
                <ul className="mt-8 space-y-4">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className={`w-5 h-5 ${pkg.isFavorite ? 'text-green-400' : 'text-green-500'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
