import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { Button } from './ui/Button';
import { PageLayout } from './ui/PageLayout';
import { InputField } from './ui/InputField';
import { WebhostingPackage } from '../types';
import { StepIndicator } from './ui/StepIndicator';

interface WebhostingCheckoutProps {
  packages: WebhostingPackage[];
}

export const WebhostingCheckout: React.FC<WebhostingCheckoutProps> = ({ packages }) => {
  const { packageName } = useParams<{ packageName: string }>();
  const selectedPackage = packages.find(p => p.name === packageName);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await sendEmailVerification(userCredential.user);
      
      // TODO: Process order
      console.log('Order data:', formData);

      navigate('/webhosting-confirmation');
    } catch (error: any) {
       if (error.code === 'auth/email-already-in-use') {
        setError('This email address is already in use. Please go to the client zone to sign in.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  if (!selectedPackage) {
    return <div>Package not found</div>;
  }

  return (
    <PageLayout
      title="Webhosting Checkout"
      subtitle={`Complete your order for ${selectedPackage.name}`}>
        <StepIndicator currentStep={2} steps={['Select', 'Checkout', 'Confirm']} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2">
          <form className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Your Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField name="fullName" label="Full Name" value={formData.fullName} onChange={handleInputChange} />
              <InputField name="email" label="Email Address" type="email" value={formData.email} onChange={handleInputChange} />
              <InputField name="password" label="Password" type="password" value={formData.password} onChange={handleInputChange} />
              <InputField name="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleInputChange} />
              <InputField name="contactNumber" label="Contact Number" value={formData.contactNumber} onChange={handleInputChange} />
            </div>
            <div className="mt-8 flex justify-end">
              <Button variant="primary" size="lg" type="submit">Submit Order</Button>
            </div>
          </form>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 h-fit-content">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Order Summary</h3>
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-600">Package:</span>
              <span className="font-bold text-slate-800">{selectedPackage.name}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <span className="text-lg font-bold text-slate-800">Total Due Today:</span>
              <span className="text-2xl font-black text-blue-900">{selectedPackage.price}</span>
            </div>
            <p className="text-sm text-slate-500 mt-2">Billed monthly</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
