
import React, { useState } from 'react';
import { Hero } from './Hero';
import { Benefits } from './Benefits';
import { PricingGrid } from './PricingGrid';
import { TrustSection } from './TrustSection';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Address, AvailabilityResult, Package, Lead, Provider } from '../types';
import { getPackages, submitLead, PROVIDERS } from '../services/mockApi';
import { Check, User, Mail, Phone, Lock, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Reusable InputField component from StoreCheckout
interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', value, onChange, required = true }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        <div className="mt-2">
            <input type={type} name={name} id={name} value={value} onChange={onChange} required={required} className="block w-full rounded-lg border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-shadow duration-200" />
        </div>
    </div>
);


interface HomeProps {
  packages: Package[];
  providers: Provider[];
  availability: AvailabilityResult | null;
  userAddress: Address | null;
  selectedPackage: Package | null;
  leadForm: { name: string; email: string; phone: string; consent: boolean };
  isSubmitting: boolean;
  submitSuccess: boolean;
  onAvailabilityCheck: (result: AvailabilityResult, address: Address) => void;
  onPackageSelect: (pkg: Package) => void;
  onLeadSubmit: (e: React.FormEvent) => Promise<void>;
  setLeadForm: React.Dispatch<React.SetStateAction<{ name: string; email: string; phone: string; consent: boolean }>>;
  setSelectedPackage: React.Dispatch<React.SetStateAction<Package | null>>;
}

export const Home: React.FC<HomeProps> = ({
  packages,
  providers,
  availability,
  userAddress,
  selectedPackage,
  onAvailabilityCheck,
  onPackageSelect,
  setSelectedPackage,
}) => {

  return (
    <>
      <Hero onAvailabilityCheck={onAvailabilityCheck} />
      <Benefits />

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
              onSelectPackage={onPackageSelect}
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

      {selectedPackage && (
        <FibreCheckoutModal 
          selectedPackage={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </>
  );
};


// --- Fibre Checkout Modal ---
interface FibreCheckoutModalProps {
  selectedPackage: Package;
  onClose: () => void;
}

const FibreCheckoutModal: React.FC<FibreCheckoutModalProps> = ({ selectedPackage, onClose }) => {
  const [step, setStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '', surname: '', email: '', contactNumber: '',
    address: '', city: '', postalCode: '', country: 'South Africa',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please accept the Terms and Conditions.');
      return;
    }
    
    console.log('Fibre Order Submitted', { package: selectedPackage.name, ...formData });
    // Here you would call your API, e.g., await submitLead(...);
    setSubmitSuccess(true);
  };

  const handleClose = () => {
    onClose();
    // Reset state after modal closes
    setTimeout(() => {
      setStep(1);
      setSubmitSuccess(false);
    }, 300);
  }

  return (
    <Modal isOpen={true} onClose={handleClose} title={submitSuccess ? 'Order Received!' : `Complete Your Order`}>
      {submitSuccess ? (
        <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600"><Check size={32} /></div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Thank You, {formData.firstName}!</h3>
            <p className="text-slate-600 mb-6">
              We've received your order for <strong>{selectedPackage.name}</strong>.
              One of our agents will contact you at <strong>{formData.contactNumber}</strong> shortly.
            </p>
            <Button onClick={handleClose} className="w-full">Done</Button>
        </div>
      ) : (
      <form onSubmit={step === 1 ? handleNextStep : handleFinalSubmit}>
        <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-slate-100">
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-slate-900">{selectedPackage.name}</span>
            <span className="font-bold text-blue-900 text-lg">R{selectedPackage.price}/mo</span>
          </div>
          <div className="text-xs text-slate-500">
            {selectedPackage.speedDown}Mbps Down / {selectedPackage.speedUp}Mbps Upload
          </div>
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
            <InputField label="Surname" name="surname" value={formData.surname} onChange={handleInputChange} />
            <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            <InputField label="Contact Number" name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleInputChange} />
            <Button type="submit" className="w-full flex justify-center items-center gap-2 mt-4" size="lg">Continue <ArrowRight size={18}/></Button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h4 className="text-md font-semibold text-gray-800 mb-3">Installation Address</h4>
              <div className="space-y-4">
                <InputField label="Street Address" name="address" value={formData.address} onChange={handleInputChange} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="City" name="city" value={formData.city} onChange={handleInputChange} />
                  <InputField label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
                </div>
              </div>
            </div>
            <div>
                <h4 className="text-md font-semibold text-gray-800 mb-3">Terms & Conditions</h4>
                <div className="flex items-start mb-4 p-3 bg-slate-50 rounded-lg">
                    <input id="terms-modal" name="terms-modal" type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                    <label htmlFor="terms-modal" className="ml-3 text-sm leading-6 text-gray-700">
                      I have read and accept the <Link to="/terms" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-500">Terms and Conditions</Link>
                    </label>
                 </div>
            </div>
            <Button type="submit" className="w-full flex justify-center items-center gap-2" size="lg" disabled={!termsAccepted}>
                <Lock size={16} /> Complete Order
            </Button>
          </div>
        )}
      </form>
      )}
    </Modal>
  )
}
