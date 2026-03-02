
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ChevronLeft, ShieldCheck, Truck, MessageCircle, Lock, CreditCard, Minus, Plus } from 'lucide-react';
import { shopProducts } from './products';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { RadioGroup } from '../ui/RadioGroup';
import { RadioGroupItem } from '../ui/RadioGroupItem';
import { Checkbox } from '../ui/Checkbox';
import { ShopProduct } from '../../types';

const deliverySchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  address: z.string().min(1, 'Delivery address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  contactNumber: z.string().min(1, 'Contact number is required'),
  password: z.string().min(1, 'Password is required'),
});

const paymentSchema = z.object({
  billingSameAsDelivery: z.boolean().default(true).optional(),
  billingAddress: z.string().optional(),
  billingCity: z.string().optional(),
  billingPostalCode: z.string().optional(),
  paymentMethod: z.enum(['card', 'debit_order']),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
  debitAccountHolder: z.string().optional(),
  debitBank: z.string().optional(),
  debitAccountNumber: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
});

const checkoutSchema = deliverySchema.merge(paymentSchema);

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

type ShopCheckoutProps = {
  cart: { [key: string]: number };
  onBack: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onProceedToPayment: () => void; // This will now be the final submission
};

const CheckoutProgress: React.FC<{ step: 'delivery' | 'payment' }> = ({ step }) => (
  <div className="flex items-center w-full mb-8">
    <div className="flex flex-col items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'delivery' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'}`}>1</div>
      <p className={`mt-2 text-sm ${step === 'delivery' ? 'text-white' : 'text-slate-400'}`}>Delivery</p>
    </div>
    <div className="flex-1 h-px bg-slate-600 mx-4"></div>
    <div className="flex flex-col items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'}`}>2</div>
      <p className={`mt-2 text-sm ${step === 'payment' ? 'text-white' : 'text-slate-400'}`}>Payment</p>
    </div>
  </div>
);

export const ShopCheckout: React.FC<ShopCheckoutProps> = ({ cart, onBack, onUpdateQuantity, onProceedToPayment }) => {
  const [checkoutStep, setCheckoutStep] = useState<'delivery' | 'payment'>('delivery');
  const methods = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      billingSameAsDelivery: true,
      paymentMethod: 'card',
      termsAccepted: false,
    }
  });

  const { handleSubmit, trigger, watch, formState: { errors } } = methods;
  const paymentMethod = watch('paymentMethod');
  const billingSameAsDelivery = watch('billingSameAsDelivery');

  const cartItems = Object.entries(cart).map(([productId, quantity]) => {
    const product = shopProducts.find(p => p.id === productId);
    return { product, quantity };
  }).filter((item): item is { product: ShopProduct; quantity: number } => !!item.product);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = 150;
  const total = subtotal + deliveryFee;

  const handleProceedToPaymentStep = async () => {
    const isValid = await trigger(['fullName', 'address', 'city', 'postalCode', 'contactNumber', 'password']);
    if (isValid) {
      setCheckoutStep('payment');
      window.scrollTo(0, 0);
    }
  };

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('Checkout data:', data);
    onProceedToPayment(); // Navigate to confirmation
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <Button onClick={onBack}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <section className="bg-slate-900 text-white min-h-screen animate-in fade-in">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="mb-8">
            <a href="#" onClick={(e) => { e.preventDefault(); checkoutStep === 'payment' ? setCheckoutStep('delivery') : onBack(); }} className="inline-flex items-center text-slate-300 hover:text-white transition-colors">
              <ChevronLeft size={20} className="mr-2" />
              {checkoutStep === 'payment' ? 'Back to Delivery' : 'Back to Product'}
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column: Order Summary */}
            <div>
              <h1 className="text-3xl font-black tracking-tighter mb-6">Order Summary</h1>
              <div className="space-y-4 bg-slate-800/50 p-6 rounded-2xl shadow-lg sticky top-20">
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg mr-4"/>
                      <div>
                        <h3 className="font-bold text-lg">{product.name}</h3>
                        <p className="text-slate-400">{product.currency} {product.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center bg-slate-700 rounded-full">
                      <Button size="icon" variant="ghost" onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))} className="rounded-full h-8 w-8"><Minus size={16}/></Button>
                      <span className="font-bold w-8 text-center">{quantity}</span>
                      <Button size="icon" variant="ghost" onClick={() => onUpdateQuantity(product.id, quantity + 1)} className="rounded-full h-8 w-8"><Plus size={16}/></Button>
                    </div>
                  </div>
                ))}
                <div className="border-t border-slate-700 pt-4">
                  <div className="flex justify-between text-slate-300"><p>Subtotal</p><p>{subtotal.toLocaleString(undefined, { style: 'currency', currency: 'ZAR' })}</p></div>
                  <div className="flex justify-between text-slate-300"><p>Delivery Fee</p><p>{deliveryFee.toLocaleString(undefined, { style: 'currency', currency: 'ZAR' })}</p></div>
                  <div className="flex justify-between font-bold text-xl mt-2"><p>Total</p><p>{total.toLocaleString(undefined, { style: 'currency', currency: 'ZAR' })}</p></div>
                </div>
              </div>
            </div>

            {/* Right Column: Forms */}
            <div>
              <CheckoutProgress step={checkoutStep} />
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {checkoutStep === 'delivery' && (
                  <div className="animate-in fade-in">
                    <h2 className="text-3xl font-black tracking-tighter mb-6">Delivery Information</h2>
                    <div className="space-y-4">
                      <Input placeholder="Full Name" {...methods.register('fullName')} className="bg-slate-800" />
                      {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                      <Input placeholder="Delivery Address" {...methods.register('address')} className="bg-slate-800" />
                      {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="City" {...methods.register('city')} className="bg-slate-800" />
                        <Input placeholder="Postal Code" {...methods.register('postalCode')} className="bg-slate-800" />
                      </div>
                      {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                      {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}
                      <Input type="tel" placeholder="Contact Number" {...methods.register('contactNumber')} className="bg-slate-800" />
                      {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>}
                       <Input type="password" placeholder="Create Password" {...methods.register('password')} className="bg-slate-800" />
                      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <Button size="lg" onClick={handleProceedToPaymentStep} className="w-full mt-8 bg-green-600 hover:bg-green-700">Proceed to Secure Checkout</Button>
                    <p className="text-center text-slate-400 text-sm mt-4 flex items-center justify-center"><Lock size={14} className="mr-2"/> SSL Encrypted & Secure</p>
                  </div>
                )}

                {checkoutStep === 'payment' && (
                  <div className="animate-in fade-in">
                    <h2 className="text-3xl font-black tracking-tighter mb-6">Payment Details</h2>
                    
                    {/* Billing Address */}
                    <div className="bg-slate-800/50 p-6 rounded-lg">
                      <h3 className="font-bold mb-4">Billing Address</h3>
                      <div className="flex items-.center space-x-2">
                         <Checkbox id="billingSameAsDelivery" {...methods.register('billingSameAsDelivery')} />
                         <label htmlFor="billingSameAsDelivery" className="text-sm font-medium text-slate-300">Same as delivery address</label>
                      </div>
                      {!billingSameAsDelivery && (
                        <div className="space-y-4 mt-4 animate-in fade-in">
                          <Input placeholder="Billing Address" {...methods.register('billingAddress')} className="bg-slate-800" />
                          <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="City" {...methods.register('billingCity')} className="bg-slate-800" />
                            <Input placeholder="Postal Code" {...methods.register('billingPostalCode')} className="bg-slate-800" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Payment Method */}
                    <div className="bg-slate-800/50 p-6 rounded-lg mt-6">
                       <h3 className="font-bold mb-4">Payment Method</h3>
                       <RadioGroup name="paymentMethod" className="space-y-2">
                          <div className="flex items-center space-x-2">
                             <RadioGroupItem value="card" id="card" />
                             <label htmlFor="card">Credit/Debit Card</label>
                          </div>
                          <div className="flex items-center space-x-2">
                             <RadioGroupItem value="debit_order" id="debit_order" />
                             <label htmlFor="debit_order">Debit Order</label>
                          </div>
                       </RadioGroup>

                      {paymentMethod === 'card' && (
                        <div className="space-y-4 mt-4 animate-in fade-in">
                          <Input placeholder="Name on Card" {...methods.register('cardName')} className="bg-slate-800" />
                          <Input placeholder="Card Number" {...methods.register('cardNumber')} className="bg-slate-800" />
                          <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="MM/YY" {...methods.register('cardExpiry')} className="bg-slate-800" />
                            <Input placeholder="CVV" {...methods.register('cardCvv')} className="bg-slate-800" />
                          </div>
                        </div>
                      )}
                       {paymentMethod === 'debit_order' && (
                        <div className="space-y-4 mt-4 animate-in fade-in">
                          <Input placeholder="Account Holder Name" {...methods.register('debitAccountHolder')} className="bg-slate-800" />
                           <Input placeholder="Bank Name" {...methods.register('debitBank')} className="bg-slate-800" />
                          <Input placeholder="Account Number" {...methods.register('debitAccountNumber')} className="bg-slate-800" />
                        </div>
                      )}
                    </div>

                    {/* T&Cs and Final Button */}
                    <div className="mt-8">
                       <div className="flex items-start space-x-2">
                          <Checkbox id="termsAccepted" {...methods.register('termsAccepted')} className="mt-1" />
                          <label htmlFor="termsAccepted" className="text-sm text-slate-400">
                            I have read and agree to the <a href="/terms" target="_blank" className="underline hover:text-white">Terms & Conditions</a> and <a href="/privacy" target="_blank" className="underline hover:text-white">Privacy Policy</a>.
                          </label>
                       </div>
                       {errors.termsAccepted && <p className="text-red-500 text-sm mt-2">{errors.termsAccepted.message}</p>}

                      <Button type="submit" size="lg" className="w-full mt-6 bg-green-600 hover:bg-green-700">Complete Order</Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </FormProvider>
  );
};
