
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Button } from './ui/Button';
import { Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { InputField } from './ui/InputField';
import { Checkbox } from './ui/Checkbox';

const products = {
  p1: { name: 'Compact Power Station', price: 3499 },
  p2: { name: 'Home Essentials Backup', price: 8999 },
  p3: { name: 'Total Home Powerhouse', price: 19999 },
};

type ProductId = keyof typeof products;

interface StoreCheckoutForm {
  firstName: string;
  surname: string;
  email: string;
  contactNumber: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  accountHolder: string;
  accountNumber: string;
  bank: string;
  branchCode: string;
  terms: boolean;
}

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


export const StoreCheckout: React.FC = () => {
  const { productId } = useParams<{ productId: ProductId }>();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const methods = useForm<StoreCheckoutForm>({
    defaultValues: {
      country: 'South Africa',
      terms: false,
    },
    mode: 'onTouched',
  });

  const { handleSubmit, trigger, watch } = methods;
  const termsAccepted = watch('terms');

  const product = productId ? products[productId] : null;

  const handleNextStep = async () => {
    const isValid = await trigger(['firstName', 'surname', 'email', 'contactNumber']);
    if (isValid) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const onFinalSubmit: SubmitHandler<StoreCheckoutForm> = (data) => {
    if (!data.terms) {
      alert('Please accept the Terms and Conditions to complete your purchase.');
      return;
    }
    console.log('Store Order submitted!', { productId, ...data });
    navigate('/confirmation');
  };

  if (!product) {
    return <div className="py-24 text-center">Product not found.</div>;
  }

  return (
    <FormProvider {...methods}>
      <div className="bg-slate-100 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 gap-y-12">
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
              <ProgressIndicator step={step} />
              <form onSubmit={handleSubmit(onFinalSubmit)}>
                {step === 1 && (
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Step 1: Your Details</h2>
                    <p className="text-slate-600 mb-8">Let's get your contact information.</p>
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                      <InputField label="First Name" name="firstName" required />
                      <InputField label="Surname" name="surname" required />
                      <div className="sm:col-span-2">
                        <InputField label="Email Address" name="email" type="email" required />
                      </div>
                      <div className="sm:col-span-2">
                        <InputField label="Contact Number" name="contactNumber" type="tel" required />
                      </div>
                    </div>
                    <div className="pt-10">
                      <Button type="button" onClick={handleNextStep} className="w-full flex items-center justify-center gap-2" size="lg">
                        Continue Checkout <ArrowRight size={18} />
                      </Button>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Step 2: Shipping & Payment</h2>
                    <div className="space-y-10">
                      <div className="border-b border-gray-900/10 pb-12">
                        <h3 className="text-lg font-semibold leading-7 text-gray-900">Shipping Address</h3>
                        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                          <div className="sm:col-span-6">
                            <InputField label="Street Address" name="address" required />
                          </div>
                          <div className="sm:col-span-2"><InputField label="City" name="city" required /></div>
                          <div className="sm:col-span-2"><InputField label="Postal Code" name="postalCode" required /></div>
                          <div className="sm:col-span-2"><InputField label="Country" name="country" required /></div>
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
                                   <InputField label="Name on Card" name="cardName" required />
                                </div>
                                <div className="sm:col-span-4">
                                    <InputField label="Card Number" name="cardNumber" required />
                                </div>
                                <div className="sm:col-span-2">
                                    <InputField label="Expiry (MM/YY)" name="cardExpiry" required />
                                </div>
                                <div className="sm:col-span-2">
                                    <InputField label="CVC" name="cardCVC" required />
                                </div>
                            </div>
                        ) : (
                            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                                 <div className="sm:col-span-4">
                                   <InputField label="Account Holder Name" name="accountHolder" required />
                                </div>
                                <div className="sm:col-span-4">
                                    <InputField label="Account Number" name="accountNumber" required />
                                </div>
                                <div className="sm:col-span-2">
                                    <InputField label="Bank" name="bank" required />
                                </div>
                                <div className="sm:col-span-2">
                                    <InputField label="Branch Code" name="branchCode" required />
                                </div>
                            </div>
                        )}
                      </div>
                    </div>
                    <div className="pt-10">
                      <div className="flex items-start mb-6">
                        <Checkbox name="terms" id="terms" />
                        <label htmlFor="terms" className="ml-3 text-sm leading-6 text-gray-700">
                          I accept the <Link to="/terms" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-500">Terms and Conditions</Link>
                        </label>
                      </div>
                      <Button type="submit" className="w-full flex items-center justify-center gap-2" size="lg" disabled={!termsAccepted}>
                        <Lock size={16} />
                        Complete Order
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
                <h3 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">{product.name}</span>
                    <span className="font-semibold text-lg">R{product.price.toLocaleString('en-ZA')}</span>
                  </div>
                  <div className="border-t pt-4 mt-4 flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>R{product.price.toLocaleString('en-ZA')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
