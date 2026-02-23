
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Store } from './components/Store';
import { Webhosting } from './components/Webhosting';
import { Voip } from './components/Voip';
import { StoreCheckout } from './components/StoreCheckout';
import { Checkout } from './components/Checkout';
import { Terms } from './components/Terms';
import { Confirmation } from './components/Confirmation';
import { Footer } from './components/Footer';
import { PowerSolutions } from './components/PowerSolutions';
import { Address, AvailabilityResult, Package, Lead, Provider } from './types';
import { getPackages, submitLead, PROVIDERS } from './services/mockApi';

const App: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [providers] = useState<Provider[]>(PROVIDERS);
  const [availability, setAvailability] = useState<AvailabilityResult | null>(null);
  const [userAddress, setUserAddress] = useState<Address | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', consent: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    getPackages().then(setPackages);
  }, []);

  const handleAvailabilityCheck = (result: AvailabilityResult, address: Address) => {
    setAvailability(result);
    setUserAddress(address);
    if (result.available) {
      setTimeout(() => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setSubmitSuccess(false);
    setLeadForm({ name: '', email: '', phone: '', consent: false });
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage || !userAddress) return;

    setIsSubmitting(true);
    
    const lead: Lead = {
      packageId: selectedPackage.id,
      address: userAddress,
      ...leadForm
    };

    try {
      await submitLead(lead);
      setSubmitSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              packages={packages}
              providers={providers}
              availability={availability}
              userAddress={userAddress}
              selectedPackage={selectedPackage}
              leadForm={leadForm}
              isSubmitting={isSubmitting}
              submitSuccess={submitSuccess}
              onAvailabilityCheck={handleAvailabilityCheck}
              onPackageSelect={handlePackageSelect}
              onLeadSubmit={handleLeadSubmit}
              setLeadForm={setLeadForm}
              setSelectedPackage={setSelectedPackage}
            />
          }
        />
        <Route path="/store" element={<Store />} />
        <Route path="/webhosting" element={<Webhosting />} />
        <Route path="/voip" element={<Voip />} />
        <Route path="/power-solutions" element={<PowerSolutions />} />
        <Route path="/store-checkout/:productId" element={<StoreCheckout />} />
        <Route path="/checkout/:packageName" element={<Checkout />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
