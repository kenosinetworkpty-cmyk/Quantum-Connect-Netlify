import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { PageLayout } from './ui/PageLayout';
import { InputField } from './ui/InputField';
import { Lock, ArrowLeft, CreditCard, Landmark } from 'lucide-react';
import { AnyPackage } from '../src/types'; // Import the unified package type

interface CheckoutProps {
  packages: AnyPackage[];
}

// Helper to check if a package is a FibrePackage
const isFibrePackage = (pkg: AnyPackage): pkg is Extract<AnyPackage, { type: 'fibre' }> => {
  return pkg.type === 'fibre';
};

export const FibreCheckout: React.FC<CheckoutProps> = ({ packages }) => {
  const { packageName } = useParams<{ packageName: string }>();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<AnyPackage | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [billingSameAsInstallation, setBillingSameAsInstallation] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [formData, setFormData] = useState({
    // Step 1
    firstName: '', surname: '', email: '', contactNumber: '', password: '',
    // Step 2
    address: '', city: '', postalCode: '', country: 'South Africa',
    billingAddress: '', billingCity: '', billingPostalCode: '', billingCountry: 'South Africa',
    // Step 3
    cardNumber: '', cardExpiry: '', cardCVC: '',
    accountHolder: '', bankName: '', accountNumber: '', branchCode: '',
  });

  useEffect(() => {
    if (packages && packageName) {
      const foundPackage = packages.find(p => p.name === packageName);
      setSelectedPackage(foundPackage || null);
    }
  }, [packages, packageName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please accept the Terms and Conditions.');
      return;
    }
    console.log('Order Submitted', { 
        package: selectedPackage?.name, 
        ...formData 
    });
    navigate('/fibre-confirmation', { state: { formData, selectedPackage } });
  };
  
  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  if (!selectedPackage) {
    return (
      <PageLayout title="Loading...">
        <div className="text-center py-20">
          <p>Loading package details...</p>
        </div>
      </PageLayout>
    );
  }

  const renderOrderSummary = () => {
    if (!selectedPackage) return null;

    const isFibre = isFibrePackage(selectedPackage);
    const priceString = isFibre ? `R${selectedPackage.price}` : selectedPackage.price;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-4">Order Summary</h3>
            <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-slate-900">{selectedPackage.name}</span>
                        <span className="font-bold text-blue-900 text-xl">{priceString}/mo</span>
                    </div>
                    {isFibre && (
                        <div className="text-xs text-slate-500">
                            {selectedPackage.speedDown}Mbps Down / {selectedPackage.speedUp}Mbps Upload
                        </div>
                    )}
                </div>
                <div className="text-sm text-slate-600 space-y-3 pt-4 border-t">
                   {isFibre ? (
                     <>
                        <p className="flex justify-between"><span>Setup Fee</span> <span className="font-medium text-green-600">FREE</span></p>
                        <p className="flex justify-between"><span>Router</span> <span className="font-medium text-green-600">FREE</span></p>
                        <p className="flex justify-between"><span>Contract</span> <span className="font-medium text-slate-800">Month-to-month</span></p>
                     </>
                   ) : (
                     <p className="text-center text-slate-500">Additional details will be confirmed via email.</p>
                   )}
                </div>
                <div className="text-lg font-bold text-slate-900 pt-4 border-t mt-4 flex justify-between items-baseline">
                    <span>Total Due Today</span>
                    <span>R0.00</span>
                </div>
            </div>
        </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">1. Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} autoComplete="given-name" />
                <InputField label="Surname" name="surname" value={formData.surname} onChange={handleInputChange} autoComplete="family-name" />
                <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} autoComplete="email" />
                <InputField label="Contact Number" name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleInputChange} autoComplete="tel" />
                 <InputField label="Create Password" name="password" type="password" value={formData.password} onChange={handleInputChange} />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">2. Address Details</h3>
            <div className="space-y-6">
                <fieldset className="space-y-6 rounded-lg border p-6">
                  <legend className="-ml-1 px-1 text-base font-semibold text-gray-700">Installation Address</legend>
                  <InputField label="Street Address" name="address" value={formData.address} onChange={handleInputChange} autoComplete="street-address" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <InputField label="City" name="city" value={formData.city} onChange={handleInputChange} autoComplete="address-level2" />
                      <InputField label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleInputChange} autoComplete="postal-code" />
                  </div>
                  <InputField label="Country" name="country" value={formData.country} onChange={handleInputChange} autoComplete="country-name" />
                </fieldset>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="flex items-start">
                        <input id="billingSame" name="billingSame" type="checkbox" checked={billingSameAsInstallation} onChange={(e) => setBillingSameAsInstallation(e.target.checked)} className="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                        <label htmlFor="billingSame" className="ml-3 text-sm leading-6 text-gray-700">My billing address is the same as my installation address.</label>
                    </div>
                </div>

                {!billingSameAsInstallation && (
                  <fieldset className="space-y-6 rounded-lg border p-6">
                    <legend className="-ml-1 px-1 text-base font-semibold text-gray-700">Billing Address</legend>
                    <InputField label="Billing Street Address" name="billingAddress" value={formData.billingAddress} onChange={handleInputChange} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputField label="Billing City" name="billingCity" value={formData.billingCity} onChange={handleInputChange} />
                        <InputField label="Billing Postal Code" name="billingPostalCode" value={formData.billingPostalCode} onChange={handleInputChange} />
                    </div>
                    <InputField label="Billing Country" name="billingCountry" value={formData.billingCountry} onChange={handleInputChange} />
                  </fieldset>
                )}
            </div>
          </div>
        );
      case 3:
        return (
           <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">3. Payment Method</h3>
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                  <div className={`rounded-lg border p-4 cursor-pointer ${paymentMethod === 'card' ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500' : 'border-gray-300 bg-white hover:border-gray-400'}`} onClick={() => setPaymentMethod('card')}>
                      <div className="flex items-center">
                          <CreditCard className={`mr-3 h-6 w-6 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-500'}`} />
                          <span className="font-semibold text-gray-800">Credit/Debit Card</span>
                      </div>
                  </div>
                  <div className={`rounded-lg border p-4 cursor-pointer ${paymentMethod === 'debit' ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500' : 'border-gray-300 bg-white hover:border-gray-400'}`} onClick={() => setPaymentMethod('debit')}>
                       <div className="flex items-center">
                          <Landmark className={`mr-3 h-6 w-6 ${paymentMethod === 'debit' ? 'text-blue-600' : 'text-gray-500'}`} />
                          <span className="font-semibold text-gray-800">Debit Order</span>
                      </div>
                  </div>
              </div>

              {paymentMethod === 'card' && (
                <fieldset className="space-y-6 rounded-lg border p-6">
                    <legend className="-ml-1 px-1 text-base font-semibold text-gray-700">Card Details</legend>
                    <InputField label="Card Number" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputField label="Expiry Date (MM/YY)" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} />
                        <InputField label="CVC" name="cardCVC" value={formData.cardCVC} onChange={handleInputChange} />
                    </div>
                </fieldset>
              )}

              {paymentMethod === 'debit' && (
                 <fieldset className="space-y-6 rounded-lg border p-6">
                    <legend className="-ml-1 px-1 text-base font-semibold text-gray-700">Bank Account Details</legend>
                     <InputField label="Account Holder Name" name="accountHolder" value={formData.accountHolder} onChange={handleInputChange} />
                     <InputField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleInputChange} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputField label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} />
                        <InputField label="Branch Code" name="branchCode" value={formData.branchCode} onChange={handleInputChange} />
                    </div>
                </fieldset>
              )}
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">4. Final Confirmation</h3>
                 <div className="flex items-start mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <input id="terms" name="terms" type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                    <label htmlFor="terms" className="ml-3 text-sm leading-6 text-gray-700">
                    I have read and accept the <Link to="/terms" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-500">Terms and Conditions</Link> and our <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-500">Privacy Policy</Link>.
                    </label>
                </div>
            </div>
           </div>
        );
      default:
        return null;
    }
  };

  const renderButtons = () => {
    return (
      <div className="border-t border-gray-200 pt-6 flex items-center justify-between">
        <Button variant="outline" onClick={step === 1 ? () => navigate(-1) : prevStep}>
            <ArrowLeft size={16} className="mr-2" />
            Back
        </Button>
        
        {step < 3 ? (
            <Button onClick={nextStep} size="lg">
                Next Step
            </Button>
        ) : (
            <Button type="submit" size="lg" disabled={!termsAccepted}>
                <Lock size={16} className="mr-2" /> 
                Complete Order Securely
            </Button>
        )}
      </div>
    );
  }

  return (
    <PageLayout 
      title="Complete Your Order" 
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'Checkout', href: `/checkout/${packageName}` }
      ]}
    >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <form onSubmit={handleFinalSubmit} className="space-y-8">
                {renderStep()}
                {renderButtons()}
              </form>
            </div>

            <div className="lg:col-span-1">
                 {renderOrderSummary()}
            </div>
        </div>
    </PageLayout>
  );
};
