import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup';
import { Checkbox } from '../ui/Checkbox';
import { ShopProduct } from '../../types';
import { Label } from '../ui/Label';
import { StepIndicator } from '../ui/StepIndicator';

const checkoutSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  contactNumber: z.string().min(1, 'Contact number is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  paymentMethod: z.enum(['card', 'debit_order']),
  billingSameAsDelivery: z.boolean(),
  billingAddress: z.string().optional(),
  billingCity: z.string().optional(),
  billingPostalCode: z.string().optional(),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCVC: z.string().optional(),
  debitAccountHolder: z.string().optional(),
  debitBank: z.string().optional(),
  debitAccountType: z.string().optional(),
  debitAccountNumber: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface ShopCheckoutProps {
  cart: { [id: string]: number };
  products: ShopProduct[];
  onCheckout: (data: CheckoutFormValues) => void;
}

export const ShopCheckout = ({ cart, products, onCheckout }: ShopCheckoutProps) => {
  const methods = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'card',
      billingSameAsDelivery: true,
      termsAccepted: false,
    },
  });

  const { handleSubmit, watch } = methods;
  const watchPaymentMethod = watch('paymentMethod');
  const watchBillingSame = watch('billingSameAsDelivery');

  const cartItems = Object.keys(cart)
    .map(id => {
      const product = products.find(p => p.id === id);
      if (!product) return null;
      return { ...product, quantity: cart[id] };
    })
    .filter((item): item is ShopProduct & { quantity: number } => item !== null);

  const onSubmit = (data: CheckoutFormValues) => {
    onCheckout(data);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const vat = subtotal * 0.15;
  const total = subtotal + vat;

  return (
    <FormProvider {...methods}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-6">
                <StepIndicator currentStep={2} steps={['Review', 'Payment', 'Confirm']} />
              <h1 className="text-3xl font-bold text-gray-900 text-center">Checkout</h1>
            </div>
          </header>

          <main className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <FormSection title="1. Customer Information">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor='fullName'>Full Name</Label>
                        <Input name="fullName" />
                      </div>
                      <div>
                        <Label htmlFor='contactNumber'>Contact Number</Label>
                        <Input name="contactNumber" />
                      </div>
                    </div>
                    <div>
                        <Label htmlFor='address'>Delivery Address</Label>
                        <Input name="address" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor='city'>City</Label>
                            <Input name="city" />
                        </div>
                        <div>
                            <Label htmlFor='postalCode'>Postal Code</Label>
                            <Input name="postalCode" />
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6 mt-4">
                        <div>
                            <Label htmlFor='email'>Email Address</Label>
                            <Input name="email" type="email" />
                        </div>
                        <div>
                            <Label htmlFor='password'>Password</Label>
                            <Input name="password" type="password" />
                        </div>
                    </div>
                  </FormSection>
                  <FormSection title="2. Payment Method">
                    <RadioGroup name="paymentMethod">
                        <div className="flex items-center">
                            <RadioGroupItem value="card" id='card' />
                            <Label htmlFor='card' className="ml-2">Credit/Debit Card</Label>
                        </div>
                        <div className="flex items-center">
                            <RadioGroupItem value="debit_order" id='debit_order' />
                            <Label htmlFor='debit_order' className="ml-2">Debit Order</Label>
                        </div>
                    </RadioGroup>
                    {watchPaymentMethod === 'card' && <CardPayment />} 
                    {watchPaymentMethod === 'debit_order' && <DebitOrderPayment />}
                  </FormSection>
                  <FormSection title="3. Billing Address">
                    <div className="flex items-center">
                        <Checkbox name="billingSameAsDelivery" id='billingSameAsDelivery' />
                        <Label htmlFor='billingSameAsDelivery' className="ml-2">My billing and delivery address are the same</Label>
                    </div>
                    {!watchBillingSame && (
                        <div className="mt-6 space-y-6">
                            <div>
                                <Label htmlFor='billingAddress'>Billing Address</Label>
                                <Input name="billingAddress" />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor='billingCity'>City</Label>
                                    <Input name="billingCity" />
                                </div>
                                <div>
                                    <Label htmlFor='billingPostalCode'>Postal Code</Label>
                                    <Input name="billingPostalCode" />
                                </div>
                            </div>
                        </div>
                    )}
                  </FormSection>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <Checkbox name="termsAccepted" id='termsAccepted' />
                        <Label htmlFor='termsAccepted' className="ml-2">I have read and agree to the Terms and Conditions and Privacy Policy</Label>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" size="lg">Place Order</Button>
                  </div>
                </form>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                  <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-4 flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2 text-gray-500"/>
                    Your Cart
                  </h2>
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between items-start">
                        <div className="flex items-start">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover mr-4"/>
                          <div>
                            <p className="font-semibold text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500">R {item.price.toFixed(2)} x {item.quantity}</p>
                          </div>
                        </div>
                         <p className="font-semibold text-gray-800">R {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>R {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VAT (15%)</span>
                      <span>R {vat.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 mt-2">
                      <span>Total</span>
                      <span>R {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
    </FormProvider>
  );
};

const FormSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">{title}</h2>
        <div className="space-y-6">{children}</div>
    </div>
);

const CardPayment = () => (
    <div className="mt-6 space-y-6">
        <div>
            <Label htmlFor='cardName'>Name on Card</Label>
            <Input name="cardName" />
        </div>
        <div>
            <Label htmlFor='cardNumber'>Card Number</Label>
            <Input name="cardNumber" />
        </div>
        <div className="grid grid-cols-2 gap-6">
            <div>
                <Label htmlFor='cardExpiry'>Expiry Date (MM/YY)</Label>
                <Input name="cardExpiry" />
            </div>
            <div>
                <Label htmlFor='cardCVC'>CVC</Label>
                <Input name="cardCVC" />
            </div>
        </div>
    </div>
);

const DebitOrderPayment = () => (
     <div className="mt-6 space-y-6">
        <div>
            <Label htmlFor='debitAccountHolder'>Account Holder Name</Label>
            <Input name="debitAccountHolder" />
        </div>
        <div>
            <Label htmlFor='debitBank'>Bank</Label>
            <Input name="debitBank" />
        </div>
         <div className="grid grid-cols-2 gap-6">
            <div>
                <Label htmlFor='debitAccountNumber'>Account Number</Label>
                <Input name="debitAccountNumber" />
            </div>
             <RadioGroup name="debitAccountType">
                <div className="flex items-center">
                    <RadioGroupItem value="cheque" id='cheque' />
                    <Label htmlFor='cheque' className="ml-2">Cheque</Label>
                </div>
                <div className="flex items-center">
                    <RadioGroupItem value="savings" id='savings' />
                    <Label htmlFor='savings' className="ml-2">Savings</Label>
                </div>
            </RadioGroup>
        </div>
    </div>
);
