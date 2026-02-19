import React from 'react';
import { Check, Server } from 'lucide-react';
import { Button } from './ui/Button';

interface HostingPackage {
  name: string;
  price: number;
  description: string;
  features: string[];
  highlight?: boolean;
}

const PACKAGES: HostingPackage[] = [
  {
    name: 'Basic Package',
    price: 39,
    description: 'Superior and secure hosting for personal sites.',
    features: [
      'Superior and secure hosting',
      'Initial assessment and strategic IT roadmap',
      'Easy-to-use control panel',
      'Lightning-fast loading speed',
      'Free website migration',
      'Offsite backup',
      '2 GB NVMe storage',
      '30 GB traffic',
      '1 MySQL database',
      '5 email accounts',
      '1 website',
      '3 domain aliases',
      'SSL certificate'
    ]
  },
  {
    name: 'Standard Package',
    price: 59,
    description: 'Perfect for growing businesses with more traffic.',
    highlight: true,
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
      'SSL certificate'
    ]
  },
  {
    name: 'Premium Package',
    price: 149,
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
      '90 email accounts'
    ]
  }
];

export const WebHosting: React.FC = () => {
  return (
    <section id="webhosting" className="py-24 bg-slate-50 relative border-t border-slate-200 scroll-mt-20">
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white to-transparent opacity-50 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
           <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl text-blue-800 mb-6 shadow-sm">
              <Server size={24} />
           </div>
           <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
             Web Hosting Packages
           </h2>
           <p className="text-slate-500 font-medium max-w-2xl mx-auto uppercase tracking-wide text-sm">
             Web hosting made in South Africa. Powerful. Fast. Secure.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
          {PACKAGES.map((pkg, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border flex flex-col h-full ${
                pkg.highlight 
                  ? 'border-blue-900 shadow-2xl scale-105 z-10 ring-4 ring-blue-500/10' 
                  : 'border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {pkg.highlight && (
                <div className="bg-blue-900 text-white text-center text-xs font-bold uppercase tracking-widest py-2">
                  Customer Favorite
                </div>
              )}
              
              <div className="p-8 text-center border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                <div className="flex justify-center items-baseline mb-4">
                  <span className="text-base font-semibold text-slate-400 align-top mt-2">R</span>
                  <span className="text-5xl font-black text-slate-900 tracking-tight">{pkg.price}</span>
                  <span className="text-sm font-medium text-slate-400 ml-1">/mo</span>
                </div>
                <p className="text-sm text-slate-500 mb-6 min-h-[40px] flex items-center justify-center">{pkg.description}</p>
                <Button 
                   variant={pkg.highlight ? 'primary' : 'outline'} 
                   className="w-full"
                >
                  Order
                </Button>
              </div>

              <div className="p-8 bg-slate-50/30 flex-grow">
                 <ul className="space-y-3">
                   {pkg.features.map((feature, fIdx) => (
                     <li key={fIdx} className="flex items-start text-sm text-slate-600">
                       <Check size={16} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" strokeWidth={3} />
                       <span className="leading-snug">{feature}</span>
                     </li>
                   ))}
                 </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
