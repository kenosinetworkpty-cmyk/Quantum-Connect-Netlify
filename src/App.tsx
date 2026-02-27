import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../components/Home';
import { Terms } from '../components/Terms';
import { Privacy } from '../components/Privacy';
import { AUP } from '../components/AUP';
import { PAIA } from '../components/PAIA';
import { Support } from '../components/Support';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Voip } from '../components/Voip';
import { ConsultationScheduling } from '../components/ConsultationScheduling';
import { AdminDashboard } from '../components/AdminDashboard';
import { Confirmation } from '../components/Confirmation';
import { getPackages, submitLead, PROVIDERS } from '../services/mockApi';
import { Address, AvailabilityResult, Package, Lead, Provider } from '../types';

const App: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [availability, setAvailability] = useState<AvailabilityResult | null>(null);
  const [userAddress, setUserAddress] = useState<Address | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', consent: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const pkgs = await getPackages();
      setPackages(pkgs);
      setProviders(PROVIDERS);
    };
    fetchData();
  }, []);

  const handleAvailabilityCheck = (result: AvailabilityResult, address: Address) => {
    setAvailability(result);
    setUserAddress(address);
    const pricingElement = document.getElementById('pricing');
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAddress || !selectedPackage) {
      console.error('Cannot submit lead without address and selected package.');
      return;
    }
    setIsSubmitting(true);
    try {
      const lead: Lead = {
        packageId: selectedPackage.id,
        name: leadForm.name,
        email: leadForm.email,
        phone: leadForm.phone,
        address: userAddress,
      };
      await submitLead(lead);
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Lead submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home 
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
        />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/aup" element={<AUP />} />
        <Route path="/paia" element={<PAIA />} />
        <Route path="/support" element={<Support />} />
        <Route path="/voip" element={<Voip />} />
        <Route path="/consultation-scheduling" element={<ConsultationScheduling />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
