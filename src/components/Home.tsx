
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from './Hero';
import { Benefits } from './Benefits';
import { PricingGrid } from './PricingGrid';
import { TrustSection } from './TrustSection';
import { Button } from './ui/Button';
import { Address, AvailabilityResult, Package, Provider } from '../types';
import { Check, MapPin } from 'lucide-react';
import { PackageBuilder } from './PackageBuilder';

interface HomeProps {
  packages: Package[];
  providers: Provider[];
  availability: AvailabilityResult | null;
  userAddress: Address | null;
  onAvailabilityCheck: (result: AvailabilityResult, address: Address) => void;
}

export const Home: React.FC<HomeProps> = ({
  packages,
  providers,
  availability,
  userAddress,
  onAvailabilityCheck,
}) => {
  const navigate = useNavigate();

  const handlePackageSelect = (pkg: Package) => {
    navigate(`/checkout/${pkg.name}`);
  };

  return (
    <>
      <Hero onAvailabilityCheck={onAvailabilityCheck} />
      <Benefits />
      <PackageBuilder />

      {availability ? (
        availability.available ? (
          <div className="animate-in fade-in duration-700 scroll-mt-20" id="pricing">
            <div className="bg-green-50 border-y border-green-100 py-6">
              <div className="container mx-auto px-4 text-center">
                <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full text-green-800 font-bold mb-2">
                  <Check size={18} className="mr-2" />
                  Coverage Confirmed
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                  Good news! Fibre is live in your area.
                </h3>
                <p className="text-slate-600 mt-1">
                  Showing packages available for <strong>{userAddress?.street}, {userAddress?.suburb}</strong>
                </p>
              </div>
            </div>

            <PricingGrid
              providers={providers}
              packages={packages}
              onSelectPackage={handlePackageSelect}
              filteredProviders={availability.providers}
            />
          </div>
        ) : (
           <div className="py-24 bg-white text-center border-t border-slate-100" id="pricing">
            <div className="container mx-auto px-4 max-w-2xl">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <MapPin size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Not yet available in your area</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We couldn't detect active fibre coverage at <strong>{userAddress?.street}</strong>.
                However, our network is expanding daily.
              </p>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-4">Get notified when we arrive</h4>
                <form className="flex flex-col gap-4">
                  <input type="email" placeholder="Enter your email address" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 outline-none" />
                  <Button variant="primary" className="w-full">Register Interest</Button>
                </form>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="opacity-50 hover:opacity-100 transition-opacity duration-500">
          <PricingGrid
            providers={providers}
            packages={packages}
            onSelectPackage={(pkg) => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}
      
      <TrustSection />
    </>
  );
};
