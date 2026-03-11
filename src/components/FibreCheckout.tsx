import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { Button } from './ui/Button';
import { PageLayout } from './ui/PageLayout';
import { InputField } from './ui/InputField';
import { Package } from '../types';
import { StepIndicator } from './ui/StepIndicator';
import { Checkbox } from './ui/Checkbox';
import { Label } from './ui/Label';
import { saveUserPlan } from '../firebase/firestore';

interface FibreCheckoutProps {
  packages: Package[];
}

export const FibreCheckout: React.FC<FibreCheckoutProps> = ({ packages }) => {
  const { packageName } = useParams<{ packageName: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const planType = queryParams.get('planType');
  const selectedPackage: Package | undefined = packages.find(p => p.name === packageName);
  const methods = useForm();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const onSubmit = async (formData: any) => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await sendEmailVerification(userCredential.user);

      const planData = {
        planType: planType,
        fibreType: packageName,
        installationType: formData.installationType,
        speed: `${selectedPackage?.speedDown}Mbps Down / ${selectedPackage?.speedUp}Mbps Up`,
        price: selectedPackage?.price,
        createdAt: new Date(),
      };

      await saveUserPlan(userCredential.user.uid, planData);

      navigate('/confirmation');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email address is already in use. Please go to the client zone to sign in.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <PageLayout
        title="Fibre Checkout"
        subtitle={`Complete your order for ${packageName}`}>
          <StepIndicator currentStep={2} steps={['Select', 'Checkout', 'Confirm']} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2">
            <form className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100" onSubmit={methods.handleSubmit(onSubmit)}>
              {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Your Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField name="fullName" label="Full Name" />
                <InputField name="email" label="Email Address" type="email" />
                <InputField name="password" label="Password" type="password" />
                <InputField name="confirmPassword" label="Confirm Password" type="password" />
                <InputField name="contactNumber" label="Contact Number" />
                <InputField name="idNumber" label="SA ID or Passport Number" />
              </div>
              <hr className="my-8 border-slate-100" />
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Installation Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Installation Type</Label>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center">
                      <Checkbox name="installationType" value="new" id="new-installation" />
                      <Label htmlFor="new-installation" className="ml-2">New Installation</Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox name="installationType" value="existing" id="existing-installation" />
                      <Label htmlFor="existing-installation" className="ml-2">Existing Installation</Label>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-8 border-slate-100" />
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Installation Address</h3>
              <div className="grid grid-cols-1 gap-6">
                <InputField name="streetAddress" label="Street Address" />
                <InputField name="suburb" label="Suburb" />
                <div className="grid grid-cols-2 gap-6">
                  <InputField name="city" label="City" />
                  <InputField name="postalCode" label="Postal Code" />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Button variant="primary" size="lg" type="submit">Submit Order</Button>
              </div>
            </form>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 h-fit-content">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Order Summary</h3>
            {selectedPackage ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-600">Package:</span>
                  <span className="font-bold text-slate-800">{selectedPackage.name}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-600">Plan Type:</span>
                  <span className="font-bold text-slate-800 capitalize">{planType}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-600">Speed:</span>
                  <span className="font-bold text-slate-800">
                    {selectedPackage.speedDown}Mbps Down / {selectedPackage.speedUp}Mbps Up
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <span className="text-lg font-bold text-slate-800">Total Due Today:</span>
                  <span className="text-2xl font-black text-blue-900">R{selectedPackage.price}</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">Billed monthly</p>
              </div>
            ) : (
              <p className="text-slate-600">Package not found.</p>
            )}
          </div>
        </div>
      </PageLayout>
    </FormProvider>
  );
};
