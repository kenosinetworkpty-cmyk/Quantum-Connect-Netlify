import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { Lock, ArrowRight, CheckCircle, Eye, EyeOff, CreditCard, Landmark } from 'lucide-react';

// --- MOCK DATA & UTILS ---
const packageDetails: { [key: string]: { price: number, speed: string, installation: number } } = {
  '100Mbps': { price: 599, speed: '100/50 Mbps', installation: 999 },
  '200Mbps': { price: 799, speed: '200/100 Mbps', installation: 999 },
  '500Mbps': { price: 999, speed: '500/250 Mbps', installation: 0 },
};

const banks = ['FNB', 'Absa', 'Standard Bank', 'Nedbank', 'Capitec', 'Investec', 'Discovery Bank'];

// --- UI COMPONENTS ---

const ProgressIndicator: React.FC<{ step: number }> = ({ step }) => (
  <div className="w-full max-w-2xl mx-auto mb-12 px-4">
    <div className="flex items-center justify-center">
      {[1, 2, 3].map((s, i, arr) => (
        <React.Fragment key={s}>
          <div className="flex flex-col items-center">
            <div className={`rounded-full transition duration-300 ease-in-out h-10 w-10 md:h-12 md:w-12 border-2 flex items-center justify-center ${step >= s ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 bg-white text-gray-500'}`}>
              {step > s ? <CheckCircle size={24} /> : s}
            </div>
            <p className={`mt-2 text-xs font-medium uppercase ${step >= s ? 'text-blue-600' : 'text-gray-500'}`}>
              {['Details', 'Payment', 'Confirmation'][i]}
            </p>
          </div>
          {i < arr.length - 1 && (
            <div className={`flex-auto border-t-2 transition duration-300 ease-in-out mx-2 md:mx-4 ${step > s ? 'border-blue-600' : 'border-gray-300'}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const OrderSummary: React.FC<{ packageName: string | undefined }> = ({ packageName }) => {
    const details = packageName ? packageDetails[packageName] : null;
    if (!details) return null;

    const { price, speed, installation } = details;

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg lg:sticky lg:top-24">
            <h3 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-4 mb-6">Order Summary</h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center text-slate-600">
                    <span>Fibre Package</span>
                    <span className="font-semibold text-slate-800">{packageName}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                    <span>Speed</span>
                    <span className="font-semibold text-slate-800">{speed}</span>
                </div>
                 <div className="flex justify-between items-center text-slate-600">
                    <span>Router</span>
                    <span className="font-semibold text-slate-800">Included</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                    <span>Installation Fee</span>
                    <span className="font-semibold text-slate-800">{installation > 0 ? `R${installation}`: 'Free'}</span>
                </div>
                <div className="border-t border-slate-200 pt-4 mt-4 space-y-2">
                    <div className="flex justify-between font-semibold text-slate-700 text-lg">
                        <span>Total Due Today</span>
                        <span>R{installation.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-blue-600 text-xl">
                        <span>Recurring Monthly</span>
                        <span>R{price.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label: string;
  name: string;
  as?: 'select';
  children?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, as = 'input', children, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-800">
      {label}
    </label>
    <div className="mt-2">
      {as === 'select' ? (
        <select id={name} name={name} {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)} className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3.5">
          {children}
        </select>
      ) : (
        <input id={name} name={name} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3.5" />
      )}
    </div>
  </div>
);

// --- MAIN CHECKOUT COMPONENT ---

export const FibreCheckout: React.FC = () => {
  const { packageName } = useParams<{ packageName: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState(2);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [formData, setFormData] = useState({
    billingAddress: '123 Quantum St, Cyberspace',
    installationAddress: '123 Quantum St, Cyberspace',
    useBillingAsInstallation: true,
    companyName: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    accountHolder: '',
    accountNumber: '',
    bank: '',
    branchCode: '',
    accountType: 'Cheque'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
         ...prev,
        [name]: isCheckbox ? checked : value,
        ...((name === 'useBillingAsInstallation' && checked) && { installationAddress: prev.billingAddress }),
    }));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please accept the Terms and Conditions to complete your purchase.');
      return;
    }
    console.log('Order submitted!', { packageName, ...formData });
    // Smooth transition logic can be handled with a state update and CSS animations
    // For now, we navigate directly.
    navigate('/fibre-confirmation');
  };

  useEffect(() => {
    // If billing address changes, and checkbox is ticked, update installation address
    if (formData.useBillingAsInstallation) {
        setFormData(prev => ({ ...prev, installationAddress: prev.billingAddress }));
    }
  }, [formData.billingAddress, formData.useBillingAsInstallation]);


  return (
    <div className="bg-slate-50 py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ProgressIndicator step={step} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-12">
          
          {/* --- LEFT SIDE: FORM --- */}
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <form onSubmit={handleFinalSubmit}>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Billing & Payment</h2>
                
                <div className="space-y-10">
                  {/* Billing & Installation Address */}
                  <div className="border-b border-gray-200 pb-10">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900">Billing & Installation Details</h3>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <InputField label="Billing Address" name="billingAddress" value={formData.billingAddress} onChange={handleInputChange} />
                        </div>
                         <div className="sm:col-span-6 flex items-center">
                            <input id="useBillingAsInstallation" name="useBillingAsInstallation" type="checkbox" checked={formData.useBillingAsInstallation} onChange={handleInputChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"/>
                            <label htmlFor="useBillingAsInstallation" className="ml-3 block text-sm text-gray-800">Installation address is the same as billing</label>
                        </div>
                        {!formData.useBillingAsInstallation && (
                            <div className="sm:col-span-6">
                                <InputField label="Installation Address" name="installationAddress" value={formData.installationAddress} onChange={handleInputChange} />
                            </div>
                        )}
                         <div className="sm:col-span-4">
                            <InputField label="Company Name (Optional)" name="companyName" value={formData.companyName} onChange={handleInputChange} required={false} />
                        </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="border-b border-gray-200 pb-10">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900">Payment Method</h3>
                    {/* Payment Method Toggle */}
                    <div className="mt-4 grid grid-cols-2 gap-4 max-w-md">
                        <div onClick={() => setPaymentMethod('card')} className={`cursor-pointer flex items-center justify-center gap-3 p-4 border-2 rounded-lg transition-all ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                            <CreditCard className={`${paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-500'}`} />
                            <span className="font-medium">Credit Card</span>
                        </div>
                        <div onClick={() => setPaymentMethod('debit')} className={`cursor-pointer flex items-center justify-center gap-3 p-4 border-2 rounded-lg transition-all ${paymentMethod === 'debit' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                            <Landmark className={`${paymentMethod === 'debit' ? 'text-blue-600' : 'text-gray-500'}`} />
                            <span className="font-medium">Debit Order</span>
                        </div>
                    </div>
                    
                    {/* Dynamic Payment Fields */}
                    <div className="mt-6">
                      {paymentMethod === 'card' ? (
                          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-4">
                              <div className="sm:col-span-4"><InputField label="Cardholder Name" name="cardName" value={formData.cardName} onChange={handleInputChange} /></div>
                              <div className="sm:col-span-4"><InputField label="Card Number" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="•••• •••• •••• ••••" /></div>
                              <div className="sm:col-span-2"><InputField label="Expiry Date (MM/YY)" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} placeholder="MM/YY" /></div>
                              <div className="sm:col-span-2"><InputField label="CVV" name="cardCVC" value={formData.cardCVC} onChange={handleInputChange} placeholder="•••" /></div>
                          </div>
                      ) : (
                          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                              <div className="sm:col-span-6"><InputField label="Account Holder Name" name="accountHolder" value={formData.accountHolder} onChange={handleInputChange} /></div>
                              <div className="sm:col-span-4"><InputField label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} /></div>
                              <div className="sm:col-span-2"><InputField label="Branch Code" name="branchCode" value={formData.branchCode} onChange={handleInputChange} /></div>
                              <div className="sm:col-span-3">
                                <InputField label="Bank Name" name="bank" as="select" value={formData.bank} onChange={handleInputChange}>
                                    <option value="" disabled>Select your bank</option>
                                    {banks.map(b => <option key={b} value={b}>{b}</option>)}
                                </InputField>
                              </div>
                               <div className="sm:col-span-3">
                                <InputField label="Account Type" name="accountType" as="select" value={formData.accountType} onChange={handleInputChange}>
                                    <option>Cheque</option>
                                    <option>Savings</option>
                                    <option>Transmission</option>
                                </InputField>
                              </div>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* --- SUBMISSION AREA --- */}
                <div className="pt-8">
                  <div className="flex items-start mb-6">
                    <input id="terms" name="terms" type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                    <label htmlFor="terms" className="ml-3 text-sm leading-6 text-gray-700">
                      I accept the <Link to="/terms" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-500 underline">Terms and Conditions</Link>
                    </label>
                  </div>
                  <Button type="submit" className="w-full flex items-center justify-center gap-2 transition-all duration-300" size="lg" disabled={!termsAccepted}>
                    <Lock size={16} />
                    Complete Secure Purchase
                  </Button>
                </div>
              </form>
          </div>

          {/* --- RIGHT SIDE: ORDER SUMMARY --- */}
          <div className="lg:col-span-1">
            <OrderSummary packageName={packageName} />
          </div>
        </div>
      </div>
    </div>
  );
};