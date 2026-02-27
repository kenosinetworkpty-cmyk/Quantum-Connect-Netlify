
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Store } from './components/Store';
import { Webhosting } from './components/Webhosting';
import { Voip } from './components/Voip';
import { StoreCheckout } from './components/StoreCheckout';
import { Terms } from './components/Terms';
import { FibreCheckout } from './components/FibreCheckout';
import { FibreConfirmation } from './components/FibreConfirmation';
import { Footer } from './components/Footer';
import { PowerSolutions } from './components/PowerSolutions';
import { PAIA } from './components/PAIA';
import { Support } from './components/Support';
import { Privacy } from './components/Privacy';
import { ConsultationScheduling } from './components/ConsultationScheduling';
import { Address, AvailabilityResult, Package, Lead, Provider } from './types';
import { getPackages, submitLead, PROVIDERS } from './services/mockApi';

const App: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [providers] = useState<Provider[]>(PROVIDERS);
  const [availability, setAvailability] = useState<AvailabilityResult | null>(null);
  const [userAddress, setUserAddress] = useState<Address | null>(null);

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
              onAvailabilityCheck={handleAvailabilityCheck}
            />
          }
        />
        <Route path="/store" element={<Store />} />
        <Route path="/webhosting" element={<Webhosting />} />
        <Route path="/voip" element={<Voip />} />
        <Route path="/power-solutions" element={<PowerSolutions />} />
        <Route path="/store-checkout/:productId" element={<StoreCheckout />} />
        <Route path="/checkout/:packageName" element={<FibreCheckout packages={packages} />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/fibre-confirmation" element={<FibreConfirmation />} />
        <Route path="/PAIA" element={<PAIA />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/consultation-scheduling" element={<ConsultationScheduling />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
