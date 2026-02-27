
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { Lock, ArrowRight, CheckCircle } from 'lucide-react';

const packageDetails: { [key: string]: { price: number } } = {
  Basic: { price: 39 },
  Standard: { price: 59 },
  Premium: { price: 149 },
};

const ProgressIndicator: React.FC<{ step: number }> = ({ step }) => (
    <div className="w-full mb-12">
      <div className="flex items-center">
        <div className="flex items-center text-blue-600 relative">
          <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 border-2 border-blue-600 flex items-center justify-center">
            {step > 1 ? <CheckCircle size={24} /> : "1"}
          </div>
          <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-blue-600">Your Details</div>
        </div>
        <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step > 1 ? 'border-blue-600' : 'border-gray-300'}`}></div>
        <div className="flex items-center text-gray-500 relative">
          <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 border-2 flex items-center justify-center ${step > 1 ? 'border-blue-600 text-blue-600' : 'border-gray-300'}`}>
            {step > 2 ? <CheckCircle size={24} /> : "2"}
          </div>
          <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${step > 1 ? 'text-blue-600' : 'text-gray-500'}`}>Payment</div>
        </div>
        <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step > 2 ? 'border-blue-600' : 'border-gray-300'}`}></div>
        <div className="flex items-center text-gray-500 relative">
          <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 border-2 flex items-center justify-center ${step > 2 ? 'border-blue-600 text-blue-600' : 'border-gray-300'}`}>
            <CheckCircle size={24} />
          </div>
          <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${step > 2 ? 'text-blue-600' : 'text-gray-500'}`}>Confirmation</div>
        </div>
      </div>
    </div>
  );


export const Checkout: React.FC = () => {
  const { packageName } = useParams<{ packageName: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    contactNumber: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    accountHolder: '',
    accountNumber: '',
    bank: '',
    branchCode: ''
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
    setStep(3);
    console.log('Order submitted!', { packageName, ...formData });
    navigate('/confirmation');
  };

  const price = packageName ? packageDetails[packageName]?.price : 0;

  return (
    <div className="bg-slate-100 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 gap-y-12">
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
          <ProgressIndicator step={step} />
            {step === 1 ? (
              <form onSubmit={handleNextStep}>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Step 1: Your Details</h2>
                <p className="text-slate-600 mb-8">Let's get your contact information.</p>
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
                    Continue Checkout <ArrowRight size={18} />
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleFinalSubmit}>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Step 2: Shipping & Payment</h2>
                 <div className="space-y-10">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900">Shipping Address</h3>
                    <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <InputField label="Street Address" name="address" value={formData.address} onChange={handleInputChange} />
                      </div>
                      <div className="sm:col-span-2"><InputField label="City" name="city" value={formData.city} onChange={handleInputChange} /></div>
                      <div className="sm:col-span-2"><InputField label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleInputChange} /></div>
                      <div className="sm:col-span-2"><InputField label="Country" name="country" value={formData.country} onChange={handleInputChange} /></div>
                    </div>
                  </div>
                  <div className="border-b border-gray-900/10 pb-12">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900">Payment Method</h3>
                    <div className="mt-4 flex gap-x-6">
                        <div className="flex items-center">
                            <input id="card" name="paymentMethod" type="radio" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600" />
                            <label htmlFor="card" className="ml-3 block text-sm font-medium leading-6 text-gray-900">Credit/Debit Card</label>
                        </div>
                        <div className="flex items-center">
                            <input id="debit" name="paymentMethod" type="radio" value="debit" checked={paymentMethod === 'debit'} onChange={() => setPaymentMethod('debit')} className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600" />
                            <label htmlFor="debit" className="ml-3 block text-sm font-medium leading-6 text-gray-900">Debit Order</label>
                        </div>
                    </div>

                    {paymentMethod === 'card' ? (
                        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                               <InputField label="Name on Card" name="cardName" value={formData.cardName} onChange={handleInputChange} />
                            </div>
                            <div className="sm:col-span-4">
                                <InputField label="Card Number" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
                            </div>
                            <div className="sm:col-span-2">
                                <InputField label="Expiry (MM/YY)" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} />
                            </div>
                            <div className="sm:col-span-2">
                                <InputField label="CVC" name="cardCVC" value={formData.cardCVC} onChange={handleInputChange} />
                            </div>
                        </div>
                    ) : (
                        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                             <div className="sm:col-span-4">
                               <InputField label="Account Holder Name" name="accountHolder" value={formData.accountHolder} onChange={handleInputChange} />
                            </div>
                            <div className="sm:col-span-4">
                                <InputField label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} />
                            </div>
                            <div className="sm:col-span-2">
                                <InputField label="Bank" name="bank" value={formData.bank} onChange={handleInputChange} />
                            </div>
                            <div className="sm:col-span-2">
                                <InputField label="Branch Code" name="branchCode" value={formData.branchCode} onChange={handleInputChange} />
                            </div>
                        </div>
                    )}
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
                    Complete Order
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
