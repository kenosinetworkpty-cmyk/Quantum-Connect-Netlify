
import React from 'react';
import { Button } from './ui/Button';
import { CheckCircle, Shield, Phone, Wifi, BatteryCharging, Cloud, Server, Zap } from 'lucide-react';

const voipServices = [
  {
    name: 'Business VoIP Solutions',
    description: 'A complete voice solution for your business with enterprise-grade features and HD quality.',
    cta: 'Request Quote',
  },
  {
    name: 'Cloud PBX',
    description: 'Migrate your entire phone system to the cloud for ultimate flexibility and scalability.',
    cta: 'Learn More',
  },
  {
    name: 'SIP Trunking',
    description: 'Connect your existing PBX to our network for reliable, cost-effective call routing.',
    cta: 'Get Rates',
  },
  {
    name: 'Hosted Telephony',
    description: 'Fully managed and hosted phone systems that remove the complexity of on-site hardware.',
    cta: 'Explore Plans',
  },
];

const features = [
    {
        icon: <Phone className="h-8 w-8 text-blue-600" />,
        title: 'Crystal-Clear Call Quality',
        description: 'Enjoy HD voice that makes conversations feel like you’re in the same room.',
    },
    {
        icon: <Zap className="h-8 w-8 text-blue-600" />,
        title: 'Cost-Effective Communication',
        description: 'Reduce your monthly phone bill with competitive call rates and per-second billing.',
    },
    {
        icon: <Cloud className="h-8 w-8 text-blue-600" />,
        title: 'Scalable Solutions',
        description: 'Easily add or remove lines as your business grows without any hardware changes.',
    },
    {
        icon: <Server className="h-8 w-8 text-blue-600" />,
        title: 'Remote Work Compatibility',
        description: 'Connect your team from anywhere with our flexible, location-independent platform.',
    },
];

export const Voip: React.FC = () => {
  return (
    <div className="bg-white text-slate-800">
      {/* 1. Hero Section */}
      <div 
        className="relative bg-cover bg-center text-white min-h-[500px] md:min-h-[600px] flex items-center px-4"
        style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/pw/AP1GczN8BbsR3QHN8GFYrVFRkBFCHUkUoTa78Ey6txcxtRIKsfBRUPW8HSRCtTGoouj1zflSuznOVpPj9bduNDxFR2PbO7ma9Huby5kn1rYRaDHXG2lZaISEJLlul3cdnAhmfzCXjoTQMmkCXwVXmGE5Ousx=w1234-h599-s-no-gm?authuser=2)' }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto">
            <div className="max-w-xl text-white">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Next-Generation VoIP for Modern Business
              </h1>
              <p className="mt-6 text-lg md:text-xl text-slate-200">
                Experience crystal-clear, affordable, and scalable communication solutions designed to future-proof your business operations.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant='primary'>Request a Consultation</Button>
                <Button size="lg" variant='secondary'>View VoIP Plans</Button>
              </div>
            </div>
        </div>
      </div>

      {/* 2. VoIP Services Section */}
      <div className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900">Our VoIP Offerings</h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4">A comprehensive suite of voice solutions to meet every business need.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {voipServices.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>
                <Button variant="secondary" className="w-full">{service.cta}</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 3. Features & Benefits Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
           <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900">Core Advantages</h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4">Why businesses are switching to our next-generation voice network.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                    <p className="text-slate-500 mt-2">{feature.description}</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* 4. Consultation / Quote Section */}
      <div className="bg-slate-100 py-24">
        <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-12 rounded-2xl shadow-2xl">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Get a Free Consultation</h2>
                    <p className="text-slate-600 mt-4">Let our experts assess your needs and tailor a VoIP solution that fits your business perfectly. No obligations, just expert advice.</p>
                </div>
                <form className="space-y-4">
                    <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" />
                    <input type="text" placeholder="Company Name" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" />
                    <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" />
                    <input type="tel" placeholder="Contact Number" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" />
                    <Button size="lg" className="w-full" type="submit">Request a Free Consultation</Button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};
