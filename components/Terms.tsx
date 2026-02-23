
import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Terms and Conditions</h1>
          <p className="mt-6 text-xl leading-8 text-gray-700">
            Please read these terms and conditions carefully before using Our Service.
          </p>

          <div className="mt-16 text-gray-600 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">1. Introduction</h2>
              <p>
                Welcome to Your ISP ('Company', 'we', 'our', 'us')! These Terms and Conditions ('Terms') govern your use of our website located at [Your Website URL] (together or individually 'Service') operated by Your ISP.
              </p>
              <p>
                Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages. Your agreement with us includes these Terms and our Privacy Policy ('Agreements'). You acknowledge that you have read and understood Agreements, and agree to be bound of them.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">2. Services</h2>
              <p>
                We provide web hosting, domain registration, and other related services as described on our website. We reserve the right to modify or discontinue any of our services at any time without prior notice. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Service.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">3. User Accounts</h2>
              <p>
                When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">4. Payments and Refunds</h2>
              <p>
                All fees are due in advance and are non-refundable. A valid payment method is required for processing the payment for your order. By submitting such payment information, you automatically authorize the Company to charge all subscription fees incurred through your account to any such payment instruments.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">5. Limitation of Liability</h2>
              <p>
                In no event shall Your ISP, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">6. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
