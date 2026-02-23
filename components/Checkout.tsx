
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { Lock } from 'lucide-react';

const packageDetails: { [key: string]: { price: number } } = {
  Basic: { price: 39 },
  Standard: { price: 59 },
  Premium: { price: 149 },
};

export const Checkout: React.FC = () => {
  const { packageName } = useParams<{ packageName: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    contactNumber: '',
    companyName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please accept the Terms and Conditions to complete your purchase.');
      return;
    }
    console.log('Order submitted!', formData);
    navigate('/confirmation');
  };

  const price = packageName ? packageDetails[packageName]?.price : 0;

  return (
    <div className="bg-slate-100 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ProgressIndicator currentStep={step} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 gap-y-12 mt-12">
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
            {step === 1 ? (
              <form onSubmit={handleNextStep}>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Secure Your Hosting Package</h2>
                <p className="text-slate-600 mb-8">Complete your details below to get started.</p>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                  <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} autoComplete="given-name" />
                  <InputField label="Surname" name="surname" value={formData.surname} onChange={handleInputChange} autoComplete="family-name" />
                  <div className="sm:col-span-2">
                    <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} autoComplete="email" />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField label="Contact Number" name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleInputChange} autoComplete="tel" />
                  </div>
                </div>
                <div className="pt-10">
                  <Button type="submit" className="w-full flex items-center justify-center gap-2" size="lg">
                    <Lock size={16} />
                    Continue to Secure Checkout
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleFinalSubmit}>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Billing & Payment</h2>
                <div className="space-y-10">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900">Billing Information</h3>
                    <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <InputField label="Address" name="address" value={formData.address} onChange={handleInputChange} autoComplete="street-address" />
                      </div>
                      <div className="sm:col-span-6">
                        <InputField label="Company Name (Optional)" name="companyName" value={formData.companyName} onChange={handleInputChange} />
                      </div>
                      <div className="sm:col-span-2">
                        <InputField label="City" name="city" value={formData.city} onChange={handleInputChange} autoComplete="address-level2" />
                      </div>
                      <div className="sm:col-span-2">
                        <InputField label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleInputChange} autoComplete="postal-code" />
                      </div>
                      <div className="sm:col-span-2">
                        <InputField label="Country" name="country" value={formData.country} onChange={handleInputChange} autoComplete="country-name" />
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900">Payment Details</h3>
                    <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <InputField label="Name on Card" name="cardName" value={formData.cardName} onChange={handleInputChange} />
                      </div>
                      <div className="sm:col-span-4">
                        <InputField label="Card Number" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
                      </div>
                      <div className="sm:col-span-2">
                        <InputField label="Expiry Date" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} placeholder="MM/YY" />
                      </div>
                      <div className="sm:col-span-2">
                        <InputField label="CVC" name="cardCVC" value={formData.cardCVC} onChange={handleInputChange} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-10">
                  <div className="flex items-start mb-6">
                    <input id="terms" name="terms" type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                    <label htmlFor="terms" className="ml-3 text-sm leading-6 text-gray-700">
                      I accept the <Link to="/terms" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-500">Terms and Conditions</Link>
                    </label>
                  </div>
                  <Button type="submit" className="w-full flex items-center justify-center gap-2" size="lg" disabled={!termsAccepted}>
                    <Lock size={16} />
                    Complete Secure Purchase
                  </Button>
                </div>
              </form>
            )}
          </div>

          <div className="lg:col-span-1">
            <OrderSummary packageName={packageName} price={price} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => (
  <div className="w-full">
    <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500">
      <li className={`flex md:w-full items-center ${currentStep >= 1 ? 'text-blue-600' : ''} after:content-[''] after:w-full after:h-1 after:border-b ${currentStep > 1 ? 'after:border-blue-600' : 'after:border-gray-200'} after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}>
        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
          {currentStep > 1 ? <CheckCircle /> : <span className="mr-2">1</span>}Contact
        </span>
      </li>
      <li className={`flex md:w-full items-center ${currentStep >= 2 ? 'text-blue-600' : ''} after:content-[''] after:w-full after:h-1 after:border-b ${currentStep > 2 ? 'after:border-blue-600' : 'after:border-gray-200'} after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}>
        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
          {currentStep > 2 ? <CheckCircle /> : <span className="mr-2">2</span>}Payment
        </span>
      </li>
      <li className={`flex items-center ${currentStep === 3 ? 'text-blue-600' : ''}`}>
        <span className="mr-2">3</span>Confirmation
      </li>
    </ol>
  </div>
);

const CheckCircle = () => (
  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const OrderSummary: React.FC<{ packageName: string | undefined, price: number }> = ({ packageName, price }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg sticky top-24">
    <h3 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">Order Summary</h3>
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-slate-600">{packageName} Package</span>
        <span className="font-semibold text-lg">R{price}/mo</span>
      </div>
      <div className="border-t pt-4 mt-4 flex justify-between font-bold text-xl">
        <span>Total Due Today</span>
        <span>R{price.toFixed(2)}</span>
      </div>
    </div>
  </div>
);

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', value, onChange, autoComplete, placeholder, required = true }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="block w-full rounded-lg border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-shadow duration-200"
        required={required}
      />
    </div>
  </div>
);
