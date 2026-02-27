import React from 'react';
import { PhoneCall, DollarSign, Scaling, Laptop } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Voip: React.FC = () => {
  const navigate = useNavigate();

  const offerings = [
    {
      title: 'Business VoIP Solutions',
      description: 'A complete voice solution for your business with enterprise-grade features and HD quality.',
    },
    {
      title: 'Cloud PBX',
      description: 'Migrate your entire phone system to the cloud for ultimate flexibility and scalability.',
    },
    {
      title: 'SIP Trunking',
      description: 'Connect your existing PBX to our network for reliable, cost-effective call routing.',
    },
    {
      title: 'Hosted Telephony',
      description: 'Fully managed and hosted phone system that removes the complexity of on-site hardware.',
    },
  ];

  const advantages = [
    {
      icon: PhoneCall,
      title: 'Crystal-Clear Call Quality',
      description: "Enjoy HD voice that makes conversations feel like you're in the same room.",
    },
    {
      icon: DollarSign,
      title: 'Cost-Effective Communication',
      description: 'Reduce your monthly phone bill with competitive call rates and no secret billing.',
    },
    {
      icon: Scaling,
      title: 'Scalable Solutions',
      description: 'Easily add or remove lines as your business grows without any hardware changes.',
    },
    {
      icon: Laptop,
      title: 'Remote Work Compatibility',
      description: 'Connect your team from anywhere with our flexible, location-independent platform.',
    },
  ];

  const brandBlue = "#0a254e";
  const brandGreen = "#00b87c";

  return (
    <div className="bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <div className="relative bg-gray-800 text-white">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/pw/AP1GczN8BbsR3QHN8GFYrVFRkBFCHUkUoTa78Ey6txcxtRIKsfBRUPW8HSRCtTGoouj1zflSuznOVpPj9bduNDxFR2PbO7ma9Huby5kn1rYRaDHXG2lZaISEJLlul3cdnAhmfzCXjoTQMmkCXwVXmGE5Ousx=w1449-h704-s-no-gm?authuser=2"
            alt="VoIP service background"
          />
          <div className="absolute inset-0 bg-gray-900/70"></div>
        </div>
        <div className="relative container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Next-Generation VoIP for Modern Business
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-slate-300">
            Experience crystal-clear, affordable, and scalable communication solutions designed to future-proof your business operations.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button onClick={() => navigate('/consultation-scheduling')} style={{ backgroundColor: brandBlue }} className="text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:opacity-90 transition">
              Request a Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Offerings Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Our VoIP Offerings</h2>
          <p className="mt-4 text-center text-slate-500 max-w-2xl mx-auto">
            A comprehensive suite of voice solutions to meet every business need.
          </p>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offerings.map((offering) => (
              <div key={offering.title} className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:shadow-2xl transition-shadow duration-300">
                <h3 className="font-bold text-xl">{offering.title}</h3>
                <p className="mt-2 text-slate-500">{offering.description}</p>
                <button onClick={() => navigate('/consultation-scheduling')} style={{ backgroundColor: brandGreen }} className="mt-6 text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition">
                  Request a Consultation
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Advantages Section */}
      <div className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Core Advantages</h2>
          <p className="mt-4 text-center text-slate-500 max-w-2xl mx-auto">
            Why businesses are switching to our next-generation voice network.
          </p>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {advantages.map((advantage) => (
              <div key={advantage.title} className="p-6">
                 <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-blue-600 bg-blue-100 rounded-full">
                  <advantage.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl">{advantage.title}</h3>
                <p className="mt-2 text-slate-500">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
